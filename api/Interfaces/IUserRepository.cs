using api.DTOs;
using api.Entity;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUserDTO>> GetUsersAsync();
    }
}