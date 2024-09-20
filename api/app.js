const express = require('express');
const { sequelize } = require('./models');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
var cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', vehicleRoutes);
app.use('/booking', bookingRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
