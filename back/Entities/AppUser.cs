using back.Extensions;

namespace back.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
        // public int Age { get; set; }
        public string Contact { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string City { get; set; }
        public string Country { get; set; }
        public string Introduction { get; set; }
        public List<Photo> Photos { get; set; } = new();
        public List<BloodRequest> RequestForBlood { get; set; }
        public List<BloodRequest> BloodRequest { get; set; }


        // public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge(); // method is created in date time extensions
        // }
    }
}