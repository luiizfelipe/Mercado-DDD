using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services.Products
{
    public interface IProductsService
    {
        Task<ProductEntity> Get(Guid id);

        Task<List<ProductEntity>> Post(List<ProductEntity> product);

    }
}


