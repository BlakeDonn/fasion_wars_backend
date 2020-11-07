const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';

app.get('/api/v1/papers', async (request, response) => {
  try {
    console.log(database)
    const papers = await database('papers').select();
    response.status(200).json(papers);
  } catch (error) {
    response.status(500).json({error});
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

