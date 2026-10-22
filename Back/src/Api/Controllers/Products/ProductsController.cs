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
        public async Task<ActionResult<List<Product>>> Get()
        {
            List<Product> products = await _productsService.Get();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "Find Product by Id")]

        public async Task<ActionResult<Product>> FindProductById(Guid id)
        {
            Product product = await _productsService.Get(id);
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(
            [FromBody] Product product)
        {
            var created = await _productsService.Post(product);

            return CreatedAtAction(
                nameof(FindProductById),
                new { id = created.Id },
                created);
        }

        [HttpPost("bulk")]
        public async Task<ActionResult<List<Product>>> CreateProducts(
            [FromBody] List<Product> products)
        {
            var created = await _productsService.Post(products);

            return Ok(created);
        }

        [HttpPut("{id}", Name = "Update Product by Id")]
        public async Task<ActionResult<Product>> UpdateProductById(Guid id, Product product)
        {
            var updatedProduct = await _productsService.Update(id, product);

            return Ok(updatedProduct);
        }
    }
}
