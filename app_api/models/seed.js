const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');

// Load the Trip model
const Trip = require('./travlr');

const host  = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Read seed data from trips.json
const tripsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8')
);

mongoose
  .connect(dbURI, {})
  .then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
    // Remove existing trip records before seeding
    return Trip.deleteMany({});
  })
  .then(() => {
    console.log('Existing trips collection cleared.');
    //full set of trips from trips.json
    return Trip.insertMany(tripsData);
  })
  .then((docs) => {
    console.log(`\n${docs.length} trips seeded successfully:\n`);
    docs.forEach(d =>
      console.log(`  [${d.code}]  ${d.name}  —  starts ${d.start.toISOString().slice(0,10)}`)
    );
  })
  .catch((err) => {
    console.error('Seed error:', err.message);
  })
  .finally(() => {
    mongoose.connection.close();
    console.log('\nMongoDB connection closed. Seeding complete.');
  });
