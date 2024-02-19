using System.Security.Cryptography;
using System.Text;
using back.Data;
using back.DTOs;
using back.Entities;
using back.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // fyp/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if(await UserExist(registerDto.Email)) return BadRequest("This Email is already registered");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                Gender = registerDto.Gender,
                BloodGroup = registerDto.BloodGroup,
                Age = registerDto.Age,
                Contact = registerDto.Contact,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

             _context.Users.Add(user);
             await _context.SaveChangesAsync();

             return new UserDto
             {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
             };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

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
                Token = _tokenService.CreateToken(user)
             };
        }

        private async Task<bool> UserExist(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
    }
}