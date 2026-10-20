using Application.Services.Products;
using Domain.Interfaces.Services.Products;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CrossCutting.DependencyInjection;

public class ServiceInjection
{
    public static void Register(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IProductsService, ProductsService>();
        services.AddRouting(options =>
        {
            options.LowercaseUrls = true;
        });
    }
}