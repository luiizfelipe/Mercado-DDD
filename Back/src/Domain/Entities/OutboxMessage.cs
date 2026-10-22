using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OutboxMessage : BaseEntity
    {
        public string Type { get; set; } = "";

        public string Payload { get; set; } = "";

        public DateTime? ProcessedAt { get; set; }
    }
}
