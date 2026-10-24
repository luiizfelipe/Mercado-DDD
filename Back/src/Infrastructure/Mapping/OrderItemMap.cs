using Domain.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Mapping;

public class OrderItemMap : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItems");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.OrderId)
            .IsRequired();

        builder.Property(e => e.ProductId)
            .IsRequired();

        builder.Property(e => e.Quantity)
            .IsRequired();

        builder.Property(e => e.UnitPrice)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.HasIndex(e => e.OrderId);

        builder.HasIndex(e => e.ProductId);
    }
}