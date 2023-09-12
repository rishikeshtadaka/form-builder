using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private CsOnboardContext _csOnboardContext;
        //private ContainerContext _containerContext;
        private DbSet<T> _dbSet;
        public Repository(CsOnboardContext csOnboardContext)//,ContainerContext containerContext)
        {
            this._csOnboardContext = csOnboardContext;
            this._dbSet = this._csOnboardContext.Set<T>();
            //this._containerContext = containerContext;
            //this._dbSet = this._containerContext.Set<T>();
        }
        //public Repository(ContainerContext contContext)
        //{
            
        //}

        public async Task AddAsync(T entity)
        {
           _dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            this._dbSet.Remove(entity);
        }

        public async Task<List<T>> Get()
        {
            return await this._dbSet.ToListAsync<T>();
        }

       
        public Task<T> Get(Predicate<T> predicate)
        {
            throw new NotImplementedException();
        }

        //public async Task<List<T>> Get(Predicate<T> predicate)
        //{
        //    return await this._dbSet.FirstOrDefault(T).ToListAsync<T>();
        //}

        public async Task Insert(T entity)
        {
            await this._dbSet.AddAsync(entity);
        }

        public async Task<bool> SaveChangeAsync()
        {
            await this._csOnboardContext.SaveChangesAsync();
            return true;
        }


    }
}
