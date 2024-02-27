using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.DTOs;
using back.Entities;
using back.Extensions;
using back.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class BloodRequestRepository : IBloodRequestRepository
    {
        private readonly DataContext _context;
        public BloodRequestRepository(DataContext context)
        {
            _context = context;
            
        }
        public async Task<BloodRequest> GetUserRequest(int sourceUserId, int targetUserId)
        {
            return await _context.Request.FindAsync(sourceUserId, targetUserId);
        }

        public async Task<IEnumerable<BloodRequestDto>> GetUserRequests(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var requests = _context.Request.AsQueryable();

            if(predicate == "liked")
            {
                requests = requests.Where(requests => requests.SourceUserId == userId);
                users = requests.Select(requests => requests.TargetUser);
            }

            if(predicate == "likedBy")
            {
                requests = requests.Where(requests => requests.TargetUserId == userId);
                users = requests.Select(requests => requests.SourceUser);
            }

            return await users.Select(user => new BloodRequestDto
            {
                UserName = user.UserName,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City,
                BloodGroup = user.BloodGroup,
                Id = user.Id
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithRequest(int userId)
        {
            return await _context.Users
             .Include(x => x.BloodRequest)
             .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}