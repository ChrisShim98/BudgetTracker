using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class AssetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Frequency { get; set; }
        public string type { get; set; }
        public float Amount { get; set; }
    }
}