using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.DTOs;
using back.Entities;

namespace back.Interfaces
{
    public interface IBloodRequestRepository
    {
        Task<BloodRequest> GetUserRequest(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithRequest(int userId);
        Task<IEnumerable<BloodRequestDto>> GetUserRequests(string predicate, int userId);
    }
}