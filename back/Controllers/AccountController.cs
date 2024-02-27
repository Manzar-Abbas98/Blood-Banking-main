using System.Security.Cryptography;
using System.Text;
using AutoMapper;
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
        public IMapper _mapper { get; }

        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // fyp/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if(await UserExist(registerDto.Email)) return BadRequest("This Email is already registered");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();


                user.Email = registerDto.Email;
                // user.UserName = registerDto.UserName;
                // user.Gender = registerDto.Gender;
                // user.BloodGroup = registerDto.BloodGroup;
                // // Age = registerDto.Age,
                // user.Contact = registerDto.Contact;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
                user.PasswordSalt = hmac.Key;

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
                BloodGroup = user.BloodGroup
             };
        }

        private async Task<bool> UserExist(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
    }
}