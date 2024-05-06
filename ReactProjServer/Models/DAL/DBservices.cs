using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using ReactProjServer.Models;
using System.Reflection.Metadata.Ecma335;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Manager to the HospitalManagers table 
    //--------------------------------------------------------------------------------------------------
    public bool RegisterManager(HospitalManager manager)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@email", manager.Email);
        paramDic.Add("@firstName", manager.FirstName);
        paramDic.Add("@lastName", manager.LastName);
        paramDic.Add("@password", manager.Password);
        paramDic.Add("@imagePath", manager.ImagePath);
        paramDic.Add("@hospitalId", manager.HospitalId);

        cmd = CreateCommandWithStoredProcedure("SP_RegisterManager", con, paramDic);

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if(numEffected == 0) 
            {
                return false;
            }
            return true;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method Send an email 
    //--------------------------------------------------------------------------------------------------
    public bool SendMail(Mail email)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@ToEmail", email.ToEmail);
        paramDic.Add("@FromEmail", email.FromEmail);
        paramDic.Add("@EmailSubject", email.Subject);
        paramDic.Add("@Content", email.Content);
        paramDic.Add("@SendingDate", email.SendingDate);

        cmd = CreateCommandWithStoredProcedure("SP_SendEmail", con, paramDic);

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            if (numEffected == 0)
            {
                return false;
            }
            return true;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }


    //--------------------------------------------------------------------------------------------------
    // This method Log in by user mail, password
    //--------------------------------------------------------------------------------------------------
    public HospitalManager LogInByEmailAndPassword(string emailToLogin, string passwordToLogin)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@email", emailToLogin);
        paramDic.Add("@password", passwordToLogin);

        cmd = CreateCommandWithStoredProcedure("SP_LogInManager", con, paramDic);// create the command

        HospitalManager manager = new HospitalManager();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                manager.FirstName = dataReader["FirstName"].ToString();
                manager.LastName = dataReader["LastName"].ToString();
                manager.Email = dataReader["Email"].ToString();
                manager.Password = dataReader["ManagerPassword"].ToString();
                manager.ImagePath = dataReader["ImagePath"].ToString();
                manager.HospitalId = Convert.ToInt32(dataReader["HospitalId"]);
            }
            if (manager.Email == "")
                throw new Exception("User not found- check email/password...");

            return manager;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method Get All Hospital Managers By Hospital Id
    //--------------------------------------------------------------------------------------------------
    public List<HospitalManager> GetAllHospitalManagersByHospitalId(int hospitalId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }


        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@hospitalId", hospitalId);


        cmd = CreateCommandWithStoredProcedure("SP_GetAllHospitalManagersByHospitalId", con, paramDic);             // create the command
        var returnParameter = cmd.Parameters.Add("@returnValue", SqlDbType.Int);

        returnParameter.Direction = ParameterDirection.ReturnValue;


        List<HospitalManager> hospitalManagerList = new List<HospitalManager>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                HospitalManager hm = new HospitalManager();
                hm.FirstName = dataReader["FirstName"].ToString();
                hm.LastName = dataReader["LastName"].ToString();
                hm.Email = dataReader["Email"].ToString();
                hm.ImagePath = dataReader["ImagePath"].ToString();
                hm.HospitalId = Convert.ToInt32(dataReader["HospitalId"]);
                
                hospitalManagerList.Add(hm);
            }



            return hospitalManagerList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
            // note that the return value appears only after closing the connection
            var result = returnParameter.Value;
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method Get All Emails By Manager
    //--------------------------------------------------------------------------------------------------
    public List<Mail> GetAllEmailsByManager(string email)
    {
        
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }


        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@EmailAddress", email);


        cmd = CreateCommandWithStoredProcedure("SP_getAllEmails", con, paramDic);             // create the command
        var returnParameter = cmd.Parameters.Add("@returnValue", SqlDbType.Int);

        returnParameter.Direction = ParameterDirection.ReturnValue;


        List<Mail> inbox = new List<Mail>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Mail mail = new Mail();
                mail.ToEmail = dataReader["ToEmail"].ToString();
                mail.FromEmail = dataReader["FromEmail"].ToString();
                mail.Subject = dataReader["EmailSubject"].ToString();
                mail.Content = dataReader["Content"].ToString();
                mail.SendingDate = Convert.ToDateTime(dataReader["SendingDate"]);
                
                inbox.Add(mail);
            }



            return inbox;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
            // note that the return value appears only after closing the connection
            var result = returnParameter.Value;
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method removes a email the user's inbox
    //--------------------------------------------------------------------------------------------------
    public bool DeleteEmailByID(int emailId)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        Dictionary<string, object> paramDic = new Dictionary<string, object>();
        paramDic.Add("@EmailID", emailId);

        cmd = CreateCommandWithStoredProcedure("SP_DeleteEmailByID", con, paramDic);// create the command

        int numEffected = cmd.ExecuteNonQuery(); // execute the command
        if (numEffected == 0)
        {
            throw new Exception("Email not exist");
        }
        try
        {
            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, Dictionary<string, object> paramDic)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        if(paramDic != null)
            foreach (KeyValuePair<string, object> param in paramDic) {
                cmd.Parameters.AddWithValue(param.Key,param.Value);

            }


        return cmd;
    }



}
