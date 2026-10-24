
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Infrastructure.Messaging;

public sealed class RabbitMqPublisher : IAsyncDisposable
{
    private readonly IConnection _connection;
    private readonly IChannel _channel;

    private RabbitMqPublisher(
        IConnection connection,
        IChannel channel)
    {
        _connection = connection;
        _channel = channel;
    }

    public static async Task<RabbitMqPublisher> CreateAsync(
        IConfiguration configuration)
    {
        var settings = configuration.GetSection("RabbitMQ");

        var factory = new ConnectionFactory
        {
            HostName = settings["Host"] ?? "localhost",
            Port = int.Parse(settings["Port"] ?? "5672"),
            UserName = settings["Username"] ?? "user",
            Password = settings["Password"] ?? "password"
        };

        var connection = await factory.CreateConnectionAsync();
        var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: "payment.requested",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        return new RabbitMqPublisher(connection, channel);
    }

    public async Task PublishAsync<T>(
        T message,
        string queue,
        CancellationToken cancellationToken = default)
    {
        var body = JsonSerializer.SerializeToUtf8Bytes(message);

        var properties = new BasicProperties
        {
            Persistent = true
        };

        await _channel.BasicPublishAsync(
            exchange: string.Empty,
            routingKey: queue,
            mandatory: false,
            basicProperties: properties,
            body: body,
            cancellationToken: cancellationToken);
    }

    public async ValueTask DisposeAsync()
    {
        await _channel.DisposeAsync();
        await _connection.DisposeAsync();
    }
}
