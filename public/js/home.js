application.get('/home', async (req, res) => {
    try {
        // Fetch user events
        const userEvents = await getUserEvent(req.user);
        // Fetch user availability
        const userAvailability = await getUserAvailability(req.user);
        res.render('home', { events: userEvents, availability: userAvailability });
    } catch (err) {
        // Handle errors
        res.status(500).send("Error fetching data");
    }
});