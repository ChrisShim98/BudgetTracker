using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class ExpenseDTO
    {
        public string Name { get; set; }
        public string Frequency { get; set; }
        public string Type { get; set; }
        public int Amount { get; set; }
    }
}