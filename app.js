const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://jay:Justdoit13!@cluster0.h91efzd.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'songs'; 
const collectionName = 'companies'; 

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/companies.html');
});

app.post('/lookup', async (req, res) => {
    const searchInput = req.body.searchInput;
    const searchType = req.body.searchType;
    let client; 
  
    try {
      client = new MongoClient(mongoURI, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      let query = {};
      if (searchType === 'symbol') {
        query = { stockTicker: searchInput };
      } else if (searchType === 'companyName') {
        query = { companyName: searchInput };
      }
  
      const company = await collection.findOne(query);
  
      if (company) {
        const formattedResponse = `Company Name: ${company.companyName}\nSymbol: ${company.stockTicker}\nStock Price: ${company.latestPrice}`;
        res.send(formattedResponse);
      } else {
        res.status(404).send('Company not found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving data from database');
    } finally {
      if (client) {
        client.close(); 
      }
    }
  });
  
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
