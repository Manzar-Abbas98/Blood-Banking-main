using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Entities;

namespace back.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}