using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public abstract class DomainException : Exception
    {
        public DomainStatus StatusCode { get; }

        protected DomainException(string message, DomainStatus statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
    }

}
