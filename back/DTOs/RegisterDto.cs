using System.ComponentModel.DataAnnotations;

namespace back.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string BloodGroup { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Contact { get; set; }
        [Required]
        public string Password { get; set; }
    }
}