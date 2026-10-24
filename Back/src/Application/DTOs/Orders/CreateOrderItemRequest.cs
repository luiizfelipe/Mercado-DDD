using System;

namespace Application.DTOs.Orders;

public record CreateOrderItemRequest(
    Guid ProductId,
    int Quantity
);