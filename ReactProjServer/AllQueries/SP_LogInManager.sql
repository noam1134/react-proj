drop procedure if exists SP_LogInManager
GO
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
CREATE PROCEDURE SP_LogInManager 
	-- Add the parameters for the stored procedure here
	@email varchar(50),
	@password varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	if exists (SELECT * from HospitalManagers where (Email = @email) and ManagerPassword = @password)
		begin 
			SELECT * from HospitalManagers where (Email = @email) and ManagerPassword = @password
		end
	else
		begin
			THROW 50003, 'wrong password or user does not exist', 1
		end
END
GO
