using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Order
{
    public class OrderItem : BaseEntity
    {
        public Guid OrderId { get; set; } = Guid.Empty;
        public Guid ProductId { get; set; } = Guid.Empty;
        public int Quantity { get; set; } = 0;
        public decimal UnitPrice { get; set; } = 0;
        public Order Order { get; set; } = null!;

    }
}
