using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using back.DTOs;
using back.Entities;
using back.Helpers;
using back.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }
        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
              .OrderByDescending(x => x.MessageSend)
              .AsQueryable();

              query = messageParams.Container switch
              {
                "Inbox" => query.Where(u => u.RecipientUsername == messageParams.Email && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.SenderUsername == messageParams.Email && u.SenderDeleted == false),
                _ => query.Where(u => u.RecipientUsername == messageParams.Email &&u.RecipientDeleted == false && u.DateRead == null)
              };

              var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

              return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserEmail, string recipientEmail)
        {
            var messages = await _context.Messages
              .Include(u => u.Sender).ThenInclude(p => p.Photos)
              .Include(u => u.Recipient).ThenInclude(p => p.Photos)
              .Where(
                m => m.RecipientUsername == currentUserEmail && m.RecipientDeleted == false && m.SenderUsername == recipientEmail || m.RecipientUsername == recipientEmail && m.SenderDeleted == false && m.SenderUsername == currentUserEmail
              )
              .OrderBy(m => m.MessageSend)
              .ToListAsync();

            var unreadMessages = messages.Where(m => m.DateRead == null && m.RecipientUsername == currentUserEmail).ToList();

            if(unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }
        

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0 ;
        }
    }
}