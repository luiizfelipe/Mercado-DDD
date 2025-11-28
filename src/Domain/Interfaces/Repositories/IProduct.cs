using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    internal interface IProduct
    {
        string Name { get; set; }
        string Description { get; set; }
        string Price { get; set; }
        int Amount { get; set; }
    }
}
