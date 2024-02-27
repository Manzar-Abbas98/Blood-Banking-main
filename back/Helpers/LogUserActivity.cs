using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Extensions;
using back.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace back.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
           var resultContext = await next();

           if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

           var username = resultContext.HttpContext.User.GetUsername();

           var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
           var user = await repo.GetUserByEmailAsync(username);
           user.LastActive = DateTime.UtcNow;
           await repo.SaveAllAsync();
        }
    }
}