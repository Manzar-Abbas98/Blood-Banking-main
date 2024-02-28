namespace back.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string BloodGroup { get; set; }
        public bool IsVerified { get; set; }
    }
}