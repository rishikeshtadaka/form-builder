using CharlesStanley.Onboarding.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Service.Service
{
    public abstract class Service<T> : IService<T> where T : class
    {
        private readonly IRepository<T> _repository;
        public Service(IRepository<T> repository) => this._repository = repository;

        public void Delete(T entity)
        {
            this._repository.Delete(entity);
        }

        public async Task<List<T>> Get()
        {
            return await this._repository.Get();
        }
        public Task<T> Get(Predicate<T> predicate)
        {
            return this._repository.Get(predicate);
        }

        public void Insert(T entity)
        {
            this._repository.AddAsync(entity);   
        }

        public async Task<bool> SaveChange()
        {
          return await this._repository.SaveChangeAsync();
        }

        void IService<T>.SaveChange()
        {
            throw new NotImplementedException();
        }
    }
}
