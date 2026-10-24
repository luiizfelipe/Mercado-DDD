using Application.DTOs.Orders;
using Application.Interfaces.Services;
using Domain.Entities.Order;
using Domain.Interfaces.Repositories;
using System.Threading.Tasks;

namespace Application.Services.Orders
{
    public class OrdersService(IBaseRepository<Order> baseRepository) : IOrdersService
    {
        private readonly IBaseRepository<Order> _baseRepository = baseRepository;

        public async Task<Order> CreateOrder(CreateOrderRequest order)
        {
            Order orders = new Order();

            await _baseRepository.AddAsync(orders);
            await _baseRepository.SaveChangesAsync();

            return orders;

        }
    }
}