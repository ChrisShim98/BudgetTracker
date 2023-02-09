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
using Microsoft.EntityFrameworkCore;

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

            // Calculate assets and expenses
            MonthlyBudget.ExpenseTotal = 0;
            for (int i = 0; i < MonthlyBudget.Expenses.Count; i++)
            {
                MonthlyBudget.ExpenseTotal += _budgetRepository.CalculateTotal(MonthlyBudget.Frequency, MonthlyBudget.Expenses[i].Amount, MonthlyBudget.Expenses[i].Frequency);
            };

            MonthlyBudget.AssetTotal = 0;
            for (int i = 0; i < MonthlyBudget.Assets.Count; i++)
            {
                MonthlyBudget.AssetTotal += _budgetRepository.CalculateTotal(MonthlyBudget.Frequency, MonthlyBudget.Assets[i].Amount, MonthlyBudget.Assets[i].Frequency);
            };
            
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
        public async Task<ActionResult<List<MonthlyBudgetDTO>>> GetAllBudgets([FromQuery] string username)
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

            List<MonthlyBudgetDTO> allBudgets = new List<MonthlyBudgetDTO>();

            foreach (var item in budget.Budgets)
            {
                List<ExpenseDTO> expenses = new List<ExpenseDTO>();
                List<AssetDTO> assets = new List<AssetDTO>();

                foreach (var expense in item.Expenses)
                {
                    expense.Amount = (float)Math.Round(expense.Amount, 2);
                    expenses.Add(_mapper.Map<ExpenseDTO>(expense));
                }
                foreach (var asset in item.Assets)
                {
                    asset.Amount = (float)Math.Round(asset.Amount, 2);
                    assets.Add(_mapper.Map<AssetDTO>(asset));
                }
                var budgetHolder = _mapper.Map<MonthlyBudgetDTO>(item);
                budgetHolder.Assets = assets;
                budgetHolder.Expenses = expenses; 

                allBudgets.Add(budgetHolder);
            }

            return Ok(allBudgets);
        }

        [HttpGet("monthlybudget")]
        public async Task<ActionResult<MonthlyBudgetDTO>> GetMonthlyBudget([FromQuery]int id) 
        {
            if (id == 0)
            return BadRequest("Id is missing!");

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

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteMonthlyBudget([FromQuery]int id, string username) 
        {
            if (id == 0 || username == null)
            return BadRequest("Data is missing!");

            var budget = await _budgetRepository.GetMonthlyBudgetById(id);

            if (budget == null) return BadRequest("Could not find requested budget"); 

            var parentBudget = await _budgetRepository.GetBudgetById(budget.BudgetParentId);

            if (parentBudget == null) return BadRequest("Could not find related budget"); 

            var user = await Task.FromResult(_userManager.Users
                .SingleOrDefault(x => x.UserName == username.ToLower()));

            if (user == null) return Unauthorized("Invalid username"); 

            _budgetRepository.DeleteMonthlyBudget(budget);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}