using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Entity;

namespace api.DTOs
{
    [Table("MonthlyBudget")]
    public class MonthlyBudget
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public float Income { get; set; }
        [Required]
        public string Frequency { get; set; }
        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }
        public string JobField { get; set; }
        public float ExpenseTotal { get; set; }
        public List<Expense> Expenses { get; set; }
        public float AssetTotal { get; set; }
        public List<Asset> Assets { get; set; }
        public int BudgetParentId { get; set; }
        public Budget BudgetParent { get; set; }
    }
}