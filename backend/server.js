const express = require('express');
const app = express();

app.use(express.json());

// import routes
const salesAreaRoutes = require('./routes/sales-area.routes');
app.use('/api/sales-area', salesAreaRoutes);

app.listen(3000, () => {
  console.log('API running at http://localhost:3000');
});
