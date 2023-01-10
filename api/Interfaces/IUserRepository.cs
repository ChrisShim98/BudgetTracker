using api.DTOs;
using api.Entity;
using api.Helpers;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<PagedList<AppUserDTO>> GetUsersAsync(PaginationParams paginationParams);
    }
}