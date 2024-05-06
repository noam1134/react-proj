namespace ReactProjServer.Models
{
    public class Mail
    {
        public Mail(int emailId, string fromEmail, string toEmail, string subject, string content, DateTime sendingDate)
        {
            EmailId = emailId;
            FromEmail = fromEmail;
            ToEmail = toEmail;
            Subject = subject;
            Content = content;
            SendingDate = sendingDate;
        }

        public Mail()
        {
            EmailId = 0;
            FromEmail = "";
            ToEmail = "";
            Subject = "";
            Content = "";
            SendingDate = new DateTime();
        }
        public int EmailId { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime SendingDate { get; set; }


        static DBservices dBservices = new DBservices();
        public bool SendMail()
        {
            return dBservices.SendMail(this);
        }

        public static List<Mail> GetAllEmailsByManager(string email)
        {
            return dBservices.GetAllEmailsByManager(email);
        }
    }
}
