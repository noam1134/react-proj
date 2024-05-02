drop table if exists HospitalManagers
go
create table HospitalManagers(
	ManagerId int identity(1,1),
	Email varchar(50) primary key,
	FirstName varchar(30),
	LastName varchar(30),
	ManagerPassword varchar(30),
	HospitalId int
)