using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactProjServer.Models;

namespace ReactProjServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        // POST
        [HttpPost]
        [Route("SendMail")]
        public bool SendMail(Mail newMail)
        {
            return newMail.SendMail();
        }

        [HttpPost]
        [Route("GetAllEmailsByManager")]
        public List<Mail> GetAllEmailsByManager(string email)
        {
            return Mail.GetAllEmailsByManager(email);
        }

        [HttpPost]
        [Route("DeleteEmailFromInbox")]
        public bool DeleteEmailFromInbox(int emailId)
        {
            return Mail.DeleteEmailByID(emailId);
        }
    }
}
