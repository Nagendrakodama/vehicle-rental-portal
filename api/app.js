const express = require('express');
const { sequelize } = require('./models');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.json());

app.use('/api', vehicleRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
