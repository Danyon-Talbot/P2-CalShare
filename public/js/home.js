application.get('/home', (req, res) => {
    const userEvents = getUserEvent(req.user);
    
    res.render('home', { events: userEvents });
});