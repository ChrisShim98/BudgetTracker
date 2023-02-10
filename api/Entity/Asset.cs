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
        public int BudgetParentId { get; set; }
        public string Name { get; set; }
        public string Frequency { get; set; }
        public string Type { get; set; }
        public float Amount { get; set; }
        public MonthlyBudget BudgetParent { get; set; }
    }
}