using Api.Domain.Interfaces;
using Domain.Entities;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly MarketDatabaseContext _context;

        public BaseRepository(MarketDatabaseContext context)
        {
            _context = context;
        }

        public virtual async Task<TEntity?> GetByIdAsync(Guid id)
        {
           return await _context.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public virtual async Task AddAsync(TEntity entity)
        {
                await _context.AddAsync(entity);
        }

        public virtual void Update(TEntity entity)
        {
            _context.Update(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            _context.Remove(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
