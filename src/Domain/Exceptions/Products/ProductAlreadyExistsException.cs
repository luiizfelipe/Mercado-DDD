using Domain.Enums;

namespace Domain.Exceptions.Products
{
    public class ProductAlreadyExistsException : DomainException
    {
        public ProductAlreadyExistsException() : base("Produto já existe.", DomainStatus.Conflict) { }

        public ProductAlreadyExistsException(string message)
            : base(message, DomainStatus.Conflict) { }

    }
}
