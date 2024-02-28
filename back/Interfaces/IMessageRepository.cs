using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.DTOs;
using back.Entities;
using back.Helpers;

namespace back.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserEmail, string recipientEmail);
        Task<bool> SaveAllAsync();
    }
}