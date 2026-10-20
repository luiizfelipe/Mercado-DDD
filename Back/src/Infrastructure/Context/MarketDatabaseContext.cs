using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Context

{
    public class  MarketDatabaseContext(DbContextOptions<MarketDatabaseContext> options): DbContext(options)
    {
        public DbSet<ProductEntity> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MarketDatabaseContext).Assembly);
        }


    }
}
