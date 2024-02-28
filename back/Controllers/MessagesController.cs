using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back.DTOs;
using back.Entities;
using back.Extensions;
using back.Helpers;
using back.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var userEmail = User.GetUsername();
            if(userEmail == createMessageDto.RecipientEmail) return BadRequest("You Cannot Send Message To Yourself");

            var sender = await _userRepository.GetUserByEmailAsync(userEmail);
            var recipient = await _userRepository.GetUserByEmailAsync(createMessageDto.RecipientEmail);

            if(recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Email,
                RecipientUsername = recipient.Email,
                Content = createMessageDto.Content
            };

            _messageRepository.AddMessage(message);

            if(await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to Send message");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Email = User.GetUsername();

            var messages = await _messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize,messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpGet("thread/{email}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string email)
        {
            var currentUserEmail = User.GetUsername();

            return Ok(await _messageRepository.GetMessageThread(currentUserEmail, email));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var userEmail = User.GetUsername();

            var message = await _messageRepository.GetMessage(id);

            if(message.SenderUsername != userEmail && message.RecipientUsername != userEmail) return Unauthorized();

            if(message.SenderUsername == userEmail) message.SenderDeleted = true;

            if(message.RecipientUsername == userEmail) message.RecipientDeleted = true;

            if(message.SenderDeleted && message.RecipientDeleted)
            {
                _messageRepository.DeleteMessage(message);

            }
            if(await _messageRepository.SaveAllAsync()) return Ok();

             return BadRequest("problem deleting message");
        }
    }
}