using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactProjServer.Models;

namespace ReactProjServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalManagerController : ControllerBase
    {
        // POST
        [HttpPost]
        [Route("Registration")]
        public bool Registration(HospitalManager newManager)
        {
            return newManager.Registration();
        }


        [HttpPost]
        [Route("GetAllHospitalManagersByHospitalId")]
        public List<HospitalManager> GetAllHospitalManagersByHospitalId(int hospitalId)
        {
            return HospitalManager.GetAllHospitalManagersByHospitalId(hospitalId);
        }

        // POST 
        [HttpPost]
        [Route("LogIn")]
        public HospitalManager LogIn(string emailToLogin, string passwordToLogin)
        {
            return HospitalManager.LogIn(emailToLogin, passwordToLogin);
        }
    }
}
