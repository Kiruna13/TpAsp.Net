namespace Restaurant.Models
{
    public class RestaurantItem
    {
        public long Id { get; set; }
        public string? isComplete { get; set; }
        public string? Entree { get; set; }
        public string? Plat { get; set; }
        public string? Dessert { get; set; }
        public string? Boisson { get; set; }
    }
}