using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Repository
{
    public interface IRepository<T> where T:class
    {
        Task AddAsync(T entity);
        void Delete(T entity);
        Task<List<T>> Get();
        Task<T> Get(Predicate<T> predicate);
        Task<bool> SaveChangeAsync();
    }
}
