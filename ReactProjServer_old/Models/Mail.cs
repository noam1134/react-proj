namespace ReactProjServer.Models
{
    public class Mail
    {
        public Mail(string fromEmail, string toEmail, string subject, string content, DateTime sendingDate)
        {
            FromEmail = fromEmail;
            ToEmail = toEmail;
            Subject = subject;
            Content = content;
            SendingDate = sendingDate;
        }

        public Mail()
        {
            FromEmail = "";
            ToEmail = "";
            Subject = "";
            Content = "";
            SendingDate = new DateTime();
        }

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
