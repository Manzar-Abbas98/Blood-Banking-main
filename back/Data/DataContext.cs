using back.Entities;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<AppUser> Users { get; set; }
        public DbSet<BloodRequest> Request { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BloodRequest>()
              .HasKey(k => new {k.SourceUserId, k.TargetUserId});

            builder.Entity<BloodRequest>()
              .HasOne(S => S.SourceUser)
              .WithMany(L => L.BloodRequest)
              .HasForeignKey(s => s.SourceUserId)
              .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<BloodRequest>()
              .HasOne(S => S.TargetUser)
              .WithMany(L => L.RequestForBlood)
              .HasForeignKey(s => s.TargetUserId)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}