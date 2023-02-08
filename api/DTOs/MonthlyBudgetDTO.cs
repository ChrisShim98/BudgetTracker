using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entity;

namespace api.DTOs
{
    public class MonthlyBudgetDTO
    {
        public int Id { get; set; }
        public int Income { get; set; }
        public string Frequency { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string JobField { get; set; }
        public List<ExpenseDTO> Expenses { get; set; }
        public List<AssetDTO> Assets { get; set; }
        public int BudgetParentId { get; set; }
    }
}