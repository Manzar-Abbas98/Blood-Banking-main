using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.DTOs
{
    public class CreateMessageDto
    {
        public string RecipientEmail { get; set; }
        public string Content { get; set; }
    }
}