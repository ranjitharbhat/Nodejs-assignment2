const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config({ path: './config.env' });

// Database connection
mongoose.connect(process.env.DB_LOCAL_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
