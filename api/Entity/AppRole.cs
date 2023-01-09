using Microsoft.AspNetCore.Identity;

namespace api.Entity
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}