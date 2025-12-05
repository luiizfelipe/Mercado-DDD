using Api.Domain.Interfaces;
using Application.Services.Products;
using Domain.Interfaces.Services.Products;
using Infrastructure.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace CrossCutting.DependencyInjection;

public class ServiceInjection
{
    public static void Register(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IProductsService, ProductsService>();
    }
}