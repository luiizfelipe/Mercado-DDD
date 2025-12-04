using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace Infrastructure.Context;

public class MarketDatabaseContextFactory : IDesignTimeDbContextFactory<MarketDatabaseContext>
{
    public MarketDatabaseContext CreateDbContext(string[] args)
    {

        var optionsBuilder = new DbContextOptionsBuilder<MarketDatabaseContext>();

        var connectionString = "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=market-ddd;";

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
