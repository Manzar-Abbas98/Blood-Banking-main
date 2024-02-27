using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.DTOs
{
    public class BloodRequestDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string PhotoUrl { get; set; }
        public string City { get; set; }
        public string BloodGroup { get; set; }
    }
}