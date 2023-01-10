using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entity;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;       
        }
        public async Task<PagedList<AppUserDTO>> GetUsersAsync(PaginationParams paginationParams)
        {
            var query = _context.Users.AsQueryable();

            if (paginationParams.SearchQuery != "") {
                query = query.Where(x => x.UserName.Contains(paginationParams.SearchQuery));
            }

            query = query.OrderBy(u => u.Id);          

            return await PagedList<AppUserDTO>.CreateAsync(
                query.AsNoTracking().ProjectTo<AppUserDTO>(_mapper.ConfigurationProvider),
                paginationParams.PageNumber, 
                paginationParams.PageSize);
        }
    }
}