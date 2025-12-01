using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using Utils.Tools;

namespace Infrastructure.Context;

public class MarketDatabaseContextFactory : IDesignTimeDbContextFactory<MarketDatabaseContext>
{
    public MarketDatabaseContext CreateDbContext(string[] args)
    {
        IConfiguration configuration = Configuration.BuildConfiguration();

        var optionsBuilder = new DbContextOptionsBuilder<MarketDatabaseContext>();

        var connectionString = configuration.GetConnectionString("PostgresConnection");

        Console.WriteLine("aaa");
        if (string.IsNullOrEmpty(connectionString))
        {
            Console.WriteLine("Erro");
            throw new Exception("Connection string 'DefaultConnection' not found or is empty.");
        }

        optionsBuilder.UseNpgsql(connectionString).EnableDetailedErrors();
        Console.WriteLine("Success");

        return new MarketDatabaseContext(optionsBuilder.Options);
    }

    internal object CreateDbContext()
    {
        throw new Exception("Design time factory not implemented");
    }

    
}
