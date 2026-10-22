using System;
using System.Collections.Generic;

namespace Domain.Entities.Order
{
    public class Order : BaseEntity
    {
        public OrderStatus Status;

        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public enum OrderStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
}
