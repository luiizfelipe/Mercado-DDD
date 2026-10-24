using Domain.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace CrossCutting.DependencyInjection;

public class RepositoryInjection
{
    public static void Register(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>)) ;

        services.AddDbContext<MarketDatabaseContext>( options => 
               options.UseNpgsql(configuration.GetConnectionString("PostgresConnection"))
);

    }
}