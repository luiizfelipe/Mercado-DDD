using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Context;


namespace CrossCutting.DependencyInjection;

public class RepositoryInjection
{
    public static void Register(IServiceCollection services)
    {

        services.AddSingleton<MarketDatabaseContextFactory>();
        
    }
}