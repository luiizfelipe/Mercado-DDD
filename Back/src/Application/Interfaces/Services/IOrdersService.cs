using Application.DTOs.Orders;
using Domain.Entities.Order;
using System;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IOrdersService
    {
        Task<Order> CreateOrder(CreateOrderRequest order);
        Task<Order> Get(Guid id);
    }
}
