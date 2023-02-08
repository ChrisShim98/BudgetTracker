using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;

namespace api.Entity
{
    public class Asset
    {
        public int Id { get; set; }
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public string Frequency { get; set; }
        public int Amount { get; set; }
        public MonthlyBudget BudgetParent { get; set; }
    }
}