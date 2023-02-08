using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Entity;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BudgetController : BaseApiController
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public BudgetController(UserManager<AppUser> userManager, IBudgetRepository budgetRepository, DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _context = context;
            _budgetRepository = budgetRepository;   
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<bool>> AddMonthlyBudget(MonthlyBudget MonthlyBudget, [FromQuery] string username)
        {
            // Check if user is not null
            if (username == null) return BadRequest("Username is null");
            // Get User
            var user = await Task.FromResult(_userManager.Users
                .SingleOrDefault(x => x.UserName == username.ToLower()));

            if (user == null) return Unauthorized("Invalid username");

            // Get Budget by userId
            var budget = await _budgetRepository.GetBudgetByUserId(user.Id);
            if (budget == null) return BadRequest("Budget does not exist");

            // Set Monthly budget Id then add to budget

            MonthlyBudget.Id = Int32.Parse(budget.Id + "" + MonthlyBudget.Month + "" + MonthlyBudget.Year);
            MonthlyBudget.BudgetParent = budget;
            MonthlyBudget.BudgetParentId = budget.Id;
            
            // Check if budget with id already exists before adding
            var budgetCheck = await _budgetRepository.GetMonthlyBudgetById(MonthlyBudget.Id);
            if (budgetCheck == null)
            {
                budget.Budgets.Add(MonthlyBudget);
            } 
            else 
            {
                return BadRequest("Monthly Budget already exist");
            } 
            
            // Update Budget with Monthly Budget

            _budgetRepository.AddMonthlyBudgetToBudget(budget);

            // Set Foreign Key on Monthly Budget then save

            _budgetRepository.SaveMonthlyBudget(MonthlyBudget);

            // Save expenses

            _budgetRepository.SaveExpense(MonthlyBudget.Expenses);   

            return await _context.SaveChangesAsync() > 0;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<BudgetAllDTO>>> GetAllBudgets([FromQuery] string username)
        {
            // Check if user is not null
            if (username == null) return BadRequest("Username is null");
            // Get User
            var user = await Task.FromResult(_userManager.Users
                .SingleOrDefault(x => x.UserName == username.ToLower()));

            if (user == null) return Unauthorized("Invalid username");

            // Get Budget by userId
            var budget = await _budgetRepository.GetBudgetByUserId(user.Id);
            if (budget == null) return BadRequest("Budget does not exist");

            List<BudgetAllDTO> allBudgets = new List<BudgetAllDTO>();

            foreach (var item in budget.Budgets)
            {
                List<ExpenseDTO> expenses = new List<ExpenseDTO>();
                List<AssetDTO> assets = new List<AssetDTO>();

                foreach (var expense in item.Expenses)
                {
                    expenses.Add(_mapper.Map<ExpenseDTO>(expense));
                }
                foreach (var asset in item.Assets)
                {
                    assets.Add(_mapper.Map<AssetDTO>(asset));
                }
                var budgetHolder = _mapper.Map<BudgetAllDTO>(item);
                budgetHolder.Assets = assets;
                budgetHolder.Expenses = expenses; 

                allBudgets.Add(budgetHolder);
            }

            return Ok(allBudgets);
        }

        [HttpGet("delete")]
        public async Task<MonthlyBudgetDTO> DeleteMonthlyBudget([FromQuery]int id) 
        {
            var budget = await _budgetRepository.GetMonthlyBudgetById(id);
            var monthlyBudgetDTO = _mapper.Map<MonthlyBudgetDTO>(budget);

            List<ExpenseDTO> expenses = new List<ExpenseDTO>();
            List<AssetDTO> assets = new List<AssetDTO>();

            foreach (var expense in monthlyBudgetDTO.Expenses)
            {
                expenses.Add(_mapper.Map<ExpenseDTO>(expense));
            }
            foreach (var asset in monthlyBudgetDTO.Assets)
            {
                assets.Add(_mapper.Map<AssetDTO>(asset));
            }

            monthlyBudgetDTO.Assets = assets;
            monthlyBudgetDTO.Expenses = expenses; 

            return monthlyBudgetDTO;
        }
    }
}