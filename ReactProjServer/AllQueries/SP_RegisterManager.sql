drop procedure if exists SP_RegisterManager
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
CREATE PROCEDURE SP_RegisterManager
	-- Add the parameters for the stored procedure here
	@email varchar(50),
	@firstName varchar(30),
	@lastname varchar(30),
	@password varchar(50),
	@imagePath varchar(200),
	@hospitalId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	if exists (select * from HospitalManagers where email = @email)
	begin
		throw 50000, 'Email already taken!', 1
	end
    -- Insert statements for procedure here
	INSERT INTO HospitalManagers (Email, FirstName, LastName, ManagerPassword,ImagePath, HospitalId)
	VALUES (@email, @firstName, @lastname, @password, @imagePath, @hospitalId)
END
GO
