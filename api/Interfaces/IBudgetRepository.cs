using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entity;

namespace api.Interfaces
{
    public interface IBudgetRepository
    {
        public void SaveExpense(List<Expense> expenses);
        public void SaveMonthlyBudget(BudgetDTO budgetDTO);
        public void SaveBudget(Budget budget);
        Task<Budget> GetBudgetByUserId(int id);
        Task<BudgetDTO> GetMonthlyBudgetById(int id);
        Task<Expense> GetExpenseId(int id);
        public void AddMonthlyBudgetToBudget(Budget budget);

    }
}