using Application.DTOs.Orders;
using Application.Interfaces.Services;
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

        [HttpPost]
        public async Task<ActionResult> CreateOrder(
            [FromBody] CreateOrderRequest request)
        {
            var order = await _ordersService.CreateOrder(request);

            return CreatedAtAction(
                nameof(GetOrderById),
                new { id = order.Id },
                order
            );
        }
    }
}
