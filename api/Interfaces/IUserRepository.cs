using api.DTOs;
using api.Entity;
using api.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<PagedList<AppUserDTO>> GetUsersAsync(PaginationParams paginationParams);
        void DeleteUser(int id);
        Task<AppUser> GetUserByIdAsync(string id);
    }
}