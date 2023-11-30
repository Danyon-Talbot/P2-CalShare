INSERT INTO User (firstname, lastname, email, password)
VALUES  ('john', 'doe', 'john.doe@example.com', '1234'),
        ('jane', 'smith', 'jane.smith@example.com', '123245'),
        ('bob', 'jones', 'bob.jones@example.com', '123456');

INSERT INTO Event (event_name, creator_id)
VALUES  ('Birthday Party', 1),
        ('Conference', 3),
        ('Team Building', 2);


INSERT INTO UserEvent (user_id, event_id, user_role)
VALUES  (1, 1, 'Organizer'),
        (2, 1, 'Participant'),
        (3, 2, 'Organizer'),
        (1, 2, 'Participant'),
        (2, 3, 'Organizer'),
        (3, 3, 'Participant');

-- INSERT INTO Availability (availability_id, user_event_id, date, start_time, end_time, status)
-- VALUES  (1, 1, '2023-01-15', '09:00:00', '12:00:00', 'Available'),
--         (2, 1, '2023-01-15', '14:00:00', '17:00:00', 'Available'),
--         (3, 2, '2023-02-18', '10:30:00', '12:30:00', 'Available'),
--         (4, 3, '2023-03-25', '16:00:00', '18:00:00', 'Unavailable'),
--         (5, 4, '2023-02-15', '11:00:00', '13:00:00', 'Available'),
--         (6, 5, '2023-03-20', '15:45:00', '17:45:00', 'Available');
