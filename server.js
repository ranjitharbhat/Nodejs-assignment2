const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DB_LOCAL_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
