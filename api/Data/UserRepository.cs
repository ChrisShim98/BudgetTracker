using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entity;
using api.Interfaces;
using AutoMapper;
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
        public async Task<IEnumerable<AppUserDTO>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            
            var appUser = _mapper.Map<IEnumerable<AppUserDTO>>(users);
            return appUser;
        }
    }
}