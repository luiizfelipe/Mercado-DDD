using Domain.Entities;
using Domain.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Context

{
    public class  MarketDatabaseContext(DbContextOptions<MarketDatabaseContext> options): DbContext(options)
    {
        public DbSet<Product> Products => Set<Product>();

        public DbSet<Order> Orders => Set<Order>();

        public DbSet<OrderItem> OrderItems => Set<OrderItem>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MarketDatabaseContext).Assembly);
        }


    }
}
