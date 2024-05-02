DROP TABLE IF EXISTS Emails;

CREATE TABLE Emails (
    EmailID INT PRIMARY KEY IDENTITY(1,1),
    FromEmail VARCHAR(255) NOT NULL,
    ToEmail VARCHAR(255) NOT NULL,
    EmailSubject VARCHAR(255),
    Content TEXT,
    SendingDate DATETIME
);
