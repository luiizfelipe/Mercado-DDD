using Api.Domain.Interfaces;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Exceptions.Products;
using Domain.Interfaces.Services.Products;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Products
{
    public class ProductsService(IBaseRepository<Product> baseRepository) : IProductsService
    {

        private readonly IBaseRepository<Product> _baseRepository = baseRepository;


        public async Task<List<Product>> Get() {
            IEnumerable<Product>? products = await _baseRepository.GetAllAsync();

            if(products == null)
                throw new Exception("Erro ao buscar produto");

            return products.ToList();
        }

        public async Task<Product> Get(Guid id)
        {
            Product? product = await _baseRepository.GetByIdAsync(id);

            return product;
        }

        public async Task<List<Product>> Post(List<Product> product)
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

        public async Task<Product> Post(Product product)
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

        public async Task<Product> Update(Guid id, Product product)
        {
            try
            {
                var productToUpdate = await _baseRepository.GetByIdAsync(id);

                if (productToUpdate is null)
                    throw new ProductNotFoundException(id);

                productToUpdate.Name = product.Name;
                productToUpdate.Description = product.Description;
                productToUpdate.Price = product.Price;
                productToUpdate.Stock = product.Stock;
                productToUpdate.Active = product.Active;
                productToUpdate.Category = product.Category;

                _baseRepository.Update(productToUpdate);
                await _baseRepository.SaveChangesAsync();

                return productToUpdate;
            }
            catch (DbUpdateException db)
            {
                throw new ProductAlreadyExistsException();

            }
            
        }

    }
}
