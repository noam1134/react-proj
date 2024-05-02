namespace ReactProjServer.Models
{
    public class HospitalManager
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int HospitalId { get; set; }
        public string ImagePath { get; set; }

        public HospitalManager()
        {
            Email = "";
            FirstName = "";
            LastName = "";
            Password = "";
            ImagePath = "";
            HospitalId = 0;
        }
        public HospitalManager(string email, string firstName, string lastName,string password,string imagePath, int hospitalId)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            ImagePath = imagePath ;
            HospitalId = hospitalId;
        }

        static DBservices dBservices = new DBservices();
        public bool Registration()
        {
            return dBservices.RegisterManager(this);
        }

        public static HospitalManager LogIn(string emailToLogin, string passwordToLogin)
        {
            return dBservices.LogInByEmailAndPassword(emailToLogin, passwordToLogin);
        }

        public static List<HospitalManager> GetAllHospitalManagersByHospitalId(int hospitalId)
        {
            return dBservices.GetAllHospitalManagersByHospitalId(hospitalId);
        }
    }
}
