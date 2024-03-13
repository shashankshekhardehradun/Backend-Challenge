import express from 'express';
import { sequelize } from './config/db'; 
import path from 'path';
import { fetchQuotes } from './controller/post.controller';
import { fetchBestThreeQuotes } from './controller/get.controller';

const app = express();

const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://www.localhost:${port}`);
    });

    app.post('/api/quotes', fetchQuotes);
    app.get('/api/quotes/best-three', fetchBestThreeQuotes);

  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
