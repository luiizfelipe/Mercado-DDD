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

        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> Get()
        {
            List<ProductEntity> products = await _productsService.Get();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "Find Product by Id")]

        public async Task<ActionResult<ProductEntity>> FindProductById(Guid id)
        {
            ProductEntity product = await _productsService.Get(id);
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductEntity>> CreateProduct(
            [FromBody] ProductEntity product)
        {
            var created = await _productsService.Post(product);

            return CreatedAtAction(
                nameof(FindProductById),
                new { id = created.Id },
                created);
        }

        [HttpPost("bulk")]
        public async Task<ActionResult<List<ProductEntity>>> CreateProducts(
            [FromBody] List<ProductEntity> products)
        {
            var created = await _productsService.Post(products);

            return Ok(created);
        }

        [HttpPut("{id}", Name = "Update Product by Id")]
        public async Task<ActionResult<ProductEntity>> UpdateProductById(Guid id, ProductEntity product)
        {
            var updatedProduct = await _productsService.Update(id, product);

            return Ok(updatedProduct);
        }
    }
}
