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
        public void SaveMonthlyBudget(MonthlyBudget MonthlyBudget);
        public void SaveBudget(Budget budget);
        Task<Budget> GetBudgetByUserId(int id);
        Task<MonthlyBudget> GetMonthlyBudgetById(int id);
        Task<Expense> GetExpenseId(int id);
        public void AddMonthlyBudgetToBudget(Budget budget);
        public void DeleteMonthlyBudget(MonthlyBudget monthlyBudget);

    }
}