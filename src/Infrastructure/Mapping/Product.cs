using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Mapping;

public class ProductMap : IEntityTypeConfiguration<ProductEntity>
{
    public void Configure(EntityTypeBuilder<ProductEntity> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.CreatedAt);
        builder.Property(e => e.Name);
        builder.Property(e => e.Price);
        builder.Property(e => e.Description);
        builder.Property(e => e.Category);
        builder.Property(e => e.UpdatedAt);
        builder.Property(e => e.DeletedAt);

    }
    
}

