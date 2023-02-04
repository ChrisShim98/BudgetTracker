using Microsoft.AspNetCore.Identity;

namespace api.Entity
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
        public Budget budget { get; set; }
    }
}