INSERT INTO User (Username, Email, PasswordHash, CreatedAt, UpdatedAt)
VALUES ('john_doe', 'john.doe@example.com', 'hashed_password_123', '2023-01-01 12:00:00', '2023-01-01 12:00:00'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_456', '2023-01-02 10:30:00', '2023-01-02 10:30:00'),
('bob_jones', 'bob.jones@example.com', 'hashed_password_789', '2023-01-03 15:45:00', '2023-01-03 15:45:00');

INSERT INTO Event (id, event_name, creator_id, event_link, CreatedAt, UpdatedAt)
VALUES (1, 'Birthday Party', 1, 'birthday-party-link', '2023-01-10 08:00:00', '2023-01-10 08:00:00'),
(2, 'Conference', 2, 'conference-link', '2023-02-15 10:30:00', '2023-02-15 10:30:00'),
(3, 'Team Building', 3, 'team-building-link', '2023-03-20 15:45:00', '2023-03-20 15:45:00');


INSERT INTO UserEvent (UserEventID, UserID, EventID, Role)
VALUES (1, 1, 1, 'Organizer'),
(2, 2, 1, 'Participant'),
(3, 3, 2, 'Organizer'),
(4, 1, 2, 'Participant'),
(5, 2, 3, 'Organizer'),
(6, 3, 3, 'Participant');

INSERT INTO Availability (AvailabilityID, UserEventID, Date, StartTime, EndTime, Status)
VALUES (1, 1, '2023-01-15', '09:00:00', '12:00:00', 'Available'),
(2, 1, '2023-01-15', '14:00:00', '17:00:00', 'Available'),
(3, 2, '2023-02-18', '10:30:00', '12:30:00', 'Available'),
(4, 3, '2023-03-25', '16:00:00', '18:00:00', 'Unavailable'),
(5, 4, '2023-02-15', '11:00:00', '13:00:00', 'Available'),
(6, 5, '2023-03-20', '15:45:00', '17:45:00', 'Available');