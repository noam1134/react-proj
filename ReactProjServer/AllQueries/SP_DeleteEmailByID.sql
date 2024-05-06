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
CREATE PROCEDURE SP_DeleteEmailByID
    @EmailID INT -- Parameter: EmailID of the email to delete
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Deleting the email from the Emails table where EmailID matches the provided parameter
        DELETE FROM Emails
        WHERE EmailID = @EmailID;

        -- If the deletion is successful, print this message
        PRINT 'The email with EmailID = ' + CAST(@EmailID AS VARCHAR(10)) + ' has been deleted successfully.';
    END TRY
    BEGIN CATCH
        -- If an error occurs, returns the error message
        PRINT 'Error: ' + ERROR_MESSAGE();
    END CATCH
END
GO
