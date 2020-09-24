const express = require('express');
const app = express();

//Init middleware
app.use(express.json({ extends: false }));

//Root path of API
app.use('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
