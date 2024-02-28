using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using back.Data;
using back.DTOs;
using back.Entities;
using back.Interfaces;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;

namespace back.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public IMapper _mapper { get; }

        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // fyp/account/register
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {

            if(await UserExist(registerDto.Email)) return BadRequest("This Email is already registered");

            var user = _mapper.Map<AppUser>(registerDto);

            var otp = GenerateOTP();

            using var hmac = new HMACSHA512();


                user.Email = registerDto.Email;
                // user.UserName = registerDto.UserName;
                // user.Gender = registerDto.Gender;
                // user.BloodGroup = registerDto.BloodGroup;
                // // Age = registerDto.Age,
                // user.Contact = registerDto.Contact;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
                user.PasswordSalt = hmac.Key;
                user.IsVerified = false;
                user.Otp = otp;


             _context.Users.Add(user);
             await _context.SaveChangesAsync();

             SendEmail(user.Email, user.UserName, user.Otp);

            //  return new UserDto
            //  {
            //     Username = user.UserName,
            //     Token = _tokenService.CreateToken(user)
            //  };

            return Ok("Register Succesfully");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if(user == null) return Unauthorized("Invalid Email");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < ComputedHash.Length; i++)
            {
                if(ComputedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
             {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Email = user.Email,
                BloodGroup = user.BloodGroup,
                IsVerified = user.IsVerified
             };
        }

        private async Task<bool> UserExist(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

         public IActionResult SendEmail(string UserEmail, string UserName, string otp)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("Bloodify", "bloodify.com"));
                email.To.Add(new MailboxAddress(UserName, UserEmail));
                email.Subject = "Email Verification";
                email.Body = new TextPart(TextFormat.Html) { Text = $"Hello {UserName}! Your OTP number is {otp}" };

                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls); // Use SSL/TLS
                    smtp.Authenticate("blooodify@gmail.com", "gkaxpdgtuzvhedui");
                    smtp.Send(email);
                    smtp.Disconnect(true);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email: {ex.Message}");
            }
        }

        public string GenerateOTP()
        {
            Random random = new Random();
            int otp = random.Next(100000, 999999);

            string otpString = otp.ToString();
            return otpString;
        }

        [HttpPost("verify")]
        public IActionResult Otpverify(OtpDto otp)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == otp.email);

            if (user == null) return BadRequest("Unexpected Error");
            
            if(user.Otp == otp.otp)
            {
                user.IsVerified = true;
                _context.SaveChanges();
                return Ok("User Verified");
            }
            else
            {
                return BadRequest("Invalid Otp");
            }

        }

        [HttpGet("otp")]
        public IActionResult otpRegenerate(string email)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == email);

            if(user == null) return NotFound();

            var NewOtp = GenerateOTP();

            user.Otp = NewOtp;

            SendEmail(user.Email, user.UserName, user.Otp);

            _context.SaveChanges();

            return Ok("Otp Successfully send to your Email");
        }

    }
}