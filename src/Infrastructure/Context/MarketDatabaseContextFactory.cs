using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace Infrastructure.Context;

public class MarketDatabaseContextFactory : IDesignTimeDbContextFactory<MarketDatabaseContext>
{
    public MarketDatabaseContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MarketDatabaseContext>();

        var connectionString = "connection string";

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Connection string 'DefaultConnection' not found or is empty.");
        }

        optionsBuilder.UseNpgsql(connectionString).EnableDetailedErrors();

        return new MarketDatabaseContext(optionsBuilder.Options);
    }

    internal object CreateDbContext()
    {
        throw new Exception("Design time factory not implemented");
    }
}
