using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace CrossCutting.DependencyInjection;

public class RepositoryInjection
{
    public static void Register(IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<MarketDatabaseContext>( options => 
               options.UseNpgsql(configuration.GetConnectionString("PostgresConnection"))
);

    }
}