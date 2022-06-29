using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Restaurant.Models
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> options)
            : base(options)
        {
        }

        public DbSet<RestaurantItem> RestaurantItems { get; set; } = null!;
    }
}