using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharlesStanley.Onboarding.Service.Service
{
    public interface IService<T> where T : class
    {
        void Insert(T entity);
        void Delete(T entity);
        Task<List<T>> Get();
        void SaveChange();
    }
}
