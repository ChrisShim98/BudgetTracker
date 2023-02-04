using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;

namespace api.Entity
{
    [Table("Budget")]
    public class Budget
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public ICollection<BudgetDTO> Budgets { get; set; }
        public AppUser Owner { get; set; }
    }
}