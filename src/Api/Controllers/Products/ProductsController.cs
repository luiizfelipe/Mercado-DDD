using Domain.Entities;
using Domain.Interfaces.Services.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductsService productsService) : ControllerBase
    {
        private readonly IProductsService _productsService = productsService;

        [HttpGet(Name = "Find Product by Id")]
        public async Task<ActionResult<ProductEntity>> FindProductById(Guid id)
        {
            ProductEntity product = await _productsService.Get(id);
            return Ok(product);

        }

        [HttpPost(Name = "Create Products")]
        public async Task<ActionResult<List<ProductEntity>>> CreateProducts([FromBody] List<ProductEntity> products) {
            return await _productsService.Post(products); ;
        }

        [HttpPut(Name = "Update Product by Id")]
        public async Task<ActionResult<ProductEntity>> UpdateProductById(Guid id, ProductEntity product)
        {
            ProductEntity product = await _productsService.(id);
            return Ok(product);

        }


    }
}
