using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Email { get; set; }
        public string Container { get; set; } = "Unread";
    }
}