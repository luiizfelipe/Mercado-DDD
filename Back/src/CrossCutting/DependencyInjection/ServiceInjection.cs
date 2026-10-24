using Application.Interfaces.Services;
using Application.Services.Orders;
using Application.Services.Products;
using Infrastructure.Messaging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CrossCutting.DependencyInjection;

public class ServiceInjection
{
    public static void Register(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IProductsService, ProductsService>();
        services.AddScoped<IOrdersService, OrdersService>();
        services.AddRouting(options =>
        {
            options.LowercaseUrls = true;
        });

        services.AddSingleton<RabbitMqPublisher>(
            sp => RabbitMqPublisher.CreateAsync(
                sp.GetRequiredService<IConfiguration>()
        ).GetAwaiter().GetResult());
    }
}