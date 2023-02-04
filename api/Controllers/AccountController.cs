using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Entity;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IBudgetRepository _budgetRepository;
        private readonly DataContext _context;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, 
            IMapper mapper, IBudgetRepository budgetRepository, DataContext context)
        {
            _context = context;
            _budgetRepository = budgetRepository;
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost("register")] // POST: api/account/register
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            return BadRequest("Username is taken!");
            
            var user = _mapper.Map<AppUser>(registerDTO);

            user.UserName = registerDTO.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            var savedUser = await _userManager.Users.FirstAsync(x => x.UserName == user.UserName);

                Budget Parent = new Budget
                {
                    Owner = savedUser,
                    OwnerId = savedUser.Id
                };

            _budgetRepository.SaveBudget(Parent);

            return new UserDTO
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        public async Task<bool> UserExists(string username)
        {
            return await Task.FromResult(_userManager.Users.Any(x => x.UserName == username.ToLower()));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await Task.FromResult(_userManager.Users
                .SingleOrDefault(x => x.UserName == loginDTO.Username.ToLower()));

            if (user == null) return Unauthorized("Invalid username");

            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (!result) return Unauthorized("Invalid Password");

            return new UserDTO
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpGet("guest")]
        public async Task<ActionResult<UserDTO>> CreateGuestAccount()
        {
            string guestUsername = "guest";
            int guestNumber = 1;

            while(true)
            {
                if (await UserExists(guestUsername + guestNumber))
                {
                    guestNumber = guestNumber + 1;
                }
                else 
                {
                    break;
                }
            }

            Random rnd = new Random();
            string guestPassword = "Budget" + rnd.Next(1000, 9999);

            var guestUser = new RegisterDTO{
                Username = guestUsername + guestNumber,
                Password = guestPassword
            };

            var user = _mapper.Map<AppUser>(guestUser);

            var result = await _userManager.CreateAsync(user, guestPassword);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            var savedUser = await _userManager.Users.FirstAsync(x => x.UserName == user.UserName);

                Budget Parent = new Budget
                {
                    Owner = savedUser,
                    OwnerId = savedUser.Id
                };

            _budgetRepository.SaveBudget(Parent);

            await _context.SaveChangesAsync();

            return new UserDTO
            {
                Username = user.UserName,
                Pin = guestPassword,
                Token = await _tokenService.CreateToken(user)
            };
        }
    }
}