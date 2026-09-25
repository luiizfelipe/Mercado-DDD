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


        public async Task<List<ProductEntity>> Get() {
            IEnumerable<ProductEntity>? products = await _baseRepository.GetAllAsync();

            if(products == null)
                throw new Exception("Erro ao buscar produto");

            return products.ToList();
        }

        public async Task<ProductEntity> Get(Guid id)
        {
            ProductEntity? product = await _baseRepository.GetByIdAsync(id);

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

        public async Task<ProductEntity> Post(ProductEntity product)
        {
            try
            {
                await _baseRepository.AddAsync(product);
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
