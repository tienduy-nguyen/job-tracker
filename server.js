const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');

//Init middleware
app.use(express.json({ extends: false }));

//Connect database
connectDB();

// Router
app.use(cors());
routes(app);

//Root path of API
app.use('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
