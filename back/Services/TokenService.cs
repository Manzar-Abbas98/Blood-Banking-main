using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using back.Entities;
using back.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace back.Services
{
    public class TokenService : ITokenService
    {
            private readonly SymmetricSecurityKey _key;
            public TokenService(IConfiguration config)
            {
                _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            }
            public string CreateToken(AppUser user)
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName)
                };

                var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

                var TokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(7),
                    SigningCredentials = cred
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(TokenDescriptor);

                return tokenHandler.WriteToken(token);
            }
    }
}