-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
alter PROCEDURE SP_SendEmail
    @FromEmail VARCHAR(255),
    @ToEmail VARCHAR(255),
    @EmailSubject VARCHAR(255),
    @Content TEXT,
    @SendingDate DATETIME
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
INSERT INTO Emails (FromEmail, ToEmail, EmailSubject, Content, SendingDate)
    VALUES (@FromEmail, @ToEmail, @EmailSubject, @Content, @SendingDate);

    SELECT SCOPE_IDENTITY() AS NewEmailId;  -- Returns the ID of the newly created email record
END;
GO
