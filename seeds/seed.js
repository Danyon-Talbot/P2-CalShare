;

const sequelize = require('../config/connection');
const { Event, User, UserEvent } = require('../models')

const readerSeedData = require('./readerSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const events = await Event.bulkCreate(seedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of users) {
    const newUser = await User.create({
      user_id: id,
    });
  }

  process.exit(0);
};



seedDatabase();


/*
const seedAll = async () => {

  process.exit(0);
};

seedAll();
*/