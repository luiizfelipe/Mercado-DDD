using Domain.Enums;
using System;

namespace Domain.Exceptions.Products;

public class ProductNotFoundException : DomainException
{
    public ProductNotFoundException(Guid id)
        : base($"Produto com ID '{id}' não encontrado.", DomainStatus.NotFound)
    {
    }
}

public class ProductAlreadyExistsException : DomainException
{
    public ProductAlreadyExistsException() : base("Produto já existe.", DomainStatus.Conflict) { }

    public ProductAlreadyExistsException(string message)
        : base(message, DomainStatus.Conflict) { }

}