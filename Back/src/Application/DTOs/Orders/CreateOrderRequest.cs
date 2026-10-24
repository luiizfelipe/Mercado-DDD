using System.Collections.Generic;

namespace Application.DTOs.Orders;

public record CreateOrderRequest(
    List<CreateOrderItemRequest> Items
);