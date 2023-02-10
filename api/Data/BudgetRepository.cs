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
    public class BudgetRepository : IBudgetRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public BudgetRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public void AddMonthlyBudgetToBudget(Budget budget)
        {
            _context.Entry(budget).State = EntityState.Modified;
        }
        public void UpdateMonthlyBudget(MonthlyBudget monthlyBudget)
        {      
            var assets = _context.Assets.Where(x => x.BudgetParentId == monthlyBudget.Id);
            foreach (var asset in assets)
            {
                _context.Assets.Remove(asset);
            }

            var expenses = _context.Expenses.Where(x => x.BudgetParentId == monthlyBudget.Id);
            foreach (var expense in expenses)
            {
                _context.Expenses.Remove(expense);
            }

            _context.SaveChanges();

            _context.MonthlyBudget.Update(monthlyBudget);
        }

        public void DeleteMonthlyBudget(MonthlyBudget monthlyBudget)
        {
            _context.MonthlyBudget.Remove(monthlyBudget);
        }

        public async Task<Budget> GetBudgetByUserId(int id)
        {
            return await _context.Budget
                .Include(x => x.Budgets)
                .ThenInclude(x => x.Assets)
                .Include(x => x.Budgets)
                .ThenInclude(x => x.Expenses)
                .FirstOrDefaultAsync(x => x.OwnerId == id);
        }

        public async Task<Budget> GetBudgetById(int id)
        {
            return await _context.Budget
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Expense> GetExpenseId(int id)
        {
            return await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<MonthlyBudget> GetMonthlyBudgetById(int id)
        {
            return await _context.MonthlyBudget
                .Include(x => x.Expenses)
                .Include(x => x.Assets)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public void SaveBudget(Budget budget)
        {
            _context.Budget.Add(budget);
        }

        public void SaveExpense(List<Expense> expenses)
        {
            for (int i = 0; i < expenses.Count; i++)
            {
                _context.Expenses.Add(expenses[i]);
            }
        }

        public void SaveMonthlyBudget(MonthlyBudget MonthlyBudget)
        {
            _context.MonthlyBudget.Add(MonthlyBudget);
        }

        public float CalculateTotal(string incomeFrequency, float item, string itemFrequency)
        {
            if (itemFrequency == "") { itemFrequency = incomeFrequency; }

            float frequencyAmount = CalculateFrequencyAmount(incomeFrequency, itemFrequency);
            float total = (float)item * frequencyAmount;
            return (float)Math.Round(total, 2);
        }
        public float CalculateFrequencyAmount(string incomeFrequency, string itemFrequency)
        {
            if (incomeFrequency == itemFrequency || itemFrequency == "oneTime") { return 1f; }

            if (incomeFrequency == "weekly")
            {
                if (itemFrequency == "monthly") { return 0.25f; }
                else if (itemFrequency == "biWeekly") { return 0.50f; }
                else if (itemFrequency == "annually") { return 0.01923076923f; }
            }
            else if (incomeFrequency == "monthly")
            {
                if (itemFrequency == "weekly") { return 4f; }
                else if (itemFrequency == "biWeekly") { return 2f; }
                else if (itemFrequency == "annually") { return 0.08333333333f; }
            }
            else if (incomeFrequency == "biWeekly")
            {
                if (itemFrequency == "monthly") { return 0.5f; }
                else if (itemFrequency == "weekly") { return 2f; }
                else if (itemFrequency == "annually") { return 0.00961538461f; }
            }
            else if (incomeFrequency == "annually")
            {
                if (itemFrequency == "monthly") { return 12f; }
                else if (itemFrequency == "biWeekly") { return 104f; }
                else if (itemFrequency == "weekly") { return 52f; }
            }

            return 1f;
        }
    }
}