using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context

{
    public class  MarketDatabaseContext(DbContextOptions<MarketDatabaseContext> options): DbContext(options)
    {
        public DbSet<ProductEntity> Product { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductEntity>();
            
        }
    }
}
