using System.ComponentModel.DataAnnotations.Schema;

namespace OrdersManagement.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal (18,2)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal (18,2)")]
        public decimal Total  => Quantity * Price;
    }
}
