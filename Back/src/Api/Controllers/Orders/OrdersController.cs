using Application.DTOs.Orders;
using Application.Interfaces.Services;
using Application.Services.Products;
using Domain.Entities;
using Domain.Entities.Order;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers.Orders
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(IOrdersService ordersService)
    : ControllerBase
    {
        private readonly IOrdersService _ordersService = ordersService;

        [HttpGet("{id}", Name = "Find Order by Id")]

        public async Task<ActionResult<Order>> FindOrderById(Guid id)
        {
            Order order = await _ordersService.Get(id);
            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(
            [FromBody] CreateOrderRequest request)
        {
            var order = await _ordersService.CreateOrder(request);

            return CreatedAtAction(
                nameof(FindOrderById),
                new { id = order.Id },
                order
            );
        }
    }
}
