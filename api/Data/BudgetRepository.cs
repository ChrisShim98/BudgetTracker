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

        public async Task<Budget> GetBudgetByUserId(int id)
        {
            return await _context.Budget
                .Include(x => x.Budgets)
                .ThenInclude(x => x.Expenses)
                .Include(x => x.Budgets)
                .ThenInclude(x => x.Assets)
                .FirstOrDefaultAsync(x => x.OwnerId == id);
        }

        public async Task<Expense> GetExpenseId(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<BudgetDTO> GetMonthlyBudgetById(int id)
        {
            return await _context.MonthlyBudget.FindAsync(id);
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

        public void SaveMonthlyBudget(BudgetDTO budgetDTO)
        {
            _context.MonthlyBudget.Add(budgetDTO);
        }
    }
}