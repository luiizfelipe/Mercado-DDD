using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services.Products
{
    public interface IProductsService
    {
        Task<List<Product>> Get();
        Task<Product> Get(Guid id);
        Task<Product> Post(Product product);
        Task<List<Product>> Post(List<Product> product);
        Task<Product> Update(Guid id, Product product);

    }
}


