using Api.Domain.Interfaces;
using Domain.Entities;
using Domain.Exceptions.Products;
using Domain.Interfaces.Services.Products;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Products
{
    public class ProductsService(IBaseRepository<ProductEntity> baseRepository) : IProductsService
    {

        private readonly IBaseRepository<ProductEntity> _baseRepository = baseRepository;

        public async Task<ProductEntity> Get(Guid id)
        {
            ProductEntity? product = await _baseRepository.GetByIdAsync(id);

            if (product == null)
                throw new Exception("Produto não encontrado");

            return product;
        }

        public async Task<List<ProductEntity>> Post(List<ProductEntity> product)
        {
            try
            {
                await _baseRepository.AddAsync(product[0]);
                await _baseRepository.SaveChangesAsync();

                return product;
            }
            catch (DbUpdateException db)
            {
                throw new ProductAlreadyExistsException();
            }
        }

    }
}
