using back.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("fyp/[Controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}