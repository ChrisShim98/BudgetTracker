using api.DTOs;
using api.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<MonthlyBudget> MonthlyBudget { get; set; }
        public DbSet<Budget> Budget { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasOne(ur => ur.budget)
                .WithOne(u => u.Owner)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.Entity<MonthlyBudget>()
                .HasMany(b => b.Expenses)
                .WithOne(bs => bs.BudgetParent)
                .HasForeignKey(b => b.BudgetId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.Entity<MonthlyBudget>()
                .HasMany(b => b.Assets)
                .WithOne(bs => bs.BudgetParent)
                .HasForeignKey(b => b.BudgetId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.Entity<Budget>()
                .HasMany(b => b.Budgets)
                .WithOne(bs => bs.BudgetParent)
                .HasForeignKey(b => b.BudgetParentId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }
        
    }
}