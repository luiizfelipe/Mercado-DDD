namespace Domain.Entities
{
    public class ProductEntity : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}