drop table if exists HospitalManagers
go
create table HospitalManagers(
	managerId int identity(1,1),
	Email varchar(30) primary key,
	FirstName varchar(30),
	LastName varchar(30),
	ManagerPassword varchar(50),
	ImagePath varchar(200),
	HospitalId int
)