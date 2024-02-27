using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.DTOs;
using back.Entities;
using back.Extensions;
using back.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    public class RequestController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IBloodRequestRepository _bloodRequestRepository;

        public RequestController(IUserRepository userRepository, IBloodRequestRepository bloodRequestRepository)
        {
            _userRepository = userRepository;
            _bloodRequestRepository = bloodRequestRepository;
        }

        [HttpPost("{email}")]
        public async Task<ActionResult> AddRequest(string email)
        {
            var sourceUserId = int.Parse(User.GetUserId());
            var bloodRequest = await _userRepository.GetUserByEmailAsync(email);
            var sourceUser = await _bloodRequestRepository.GetUserWithRequest(sourceUserId);

            if(bloodRequest == null) return NotFound();

            if(sourceUser.Email == email) return BadRequest("You Cannot send blood request to yourself");

            var userRequest = await _bloodRequestRepository.GetUserRequest(sourceUserId, bloodRequest.Id);

            if(userRequest!= null) return BadRequest("You Already Like This");

            userRequest = new BloodRequest
            {
                SourceUserId = sourceUserId,
                TargetUserId = bloodRequest.Id
            };

            sourceUser.BloodRequest.Add(userRequest);

            if(await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to send Request");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodRequestDto>>> GetUserRequest(string predicate)
        {
            var users = await _bloodRequestRepository.GetUserRequests(predicate, int.Parse(User.GetUserId()));

            return Ok(users);
        }
    }
}