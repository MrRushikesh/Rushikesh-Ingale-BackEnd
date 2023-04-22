let express = require('express');
let app = express();
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 8500
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
// let mongoUrl = "mongodb://localhost:27017";
let mongoUrl = "mongodb://test:test123@ac-vvqzgty-shard-00-00.fp1yuey.mongodb.net:27017,ac-vvqzgty-shard-00-01.fp1yuey.mongodb.net:27017,ac-vvqzgty-shard-00-02.fp1yuey.mongodb.net:27017/?ssl=true&replicaSet=atlas-j1e58a-shard-0&authSource=admin&retryWrites=true&w=majority";
let db;

// middleware
app.use(cors())


app.get('/',(req,res) => {
    res.send('<h1>Hii From Express</h1>')
})


//http://localhost:8500/search
//http://localhost:7447/search
app.get('/search/',(req,res) => {
    let query = {}
    query = [
        {$lookup: {
          from: "ads",
          localField: "companyId",
          foreignField: "_id",
          as: "company"
        }},
        {$unwind: "$companyId"},
        {$match: {companyId: {$in: [1, 2, 3, 4, 5, 6, 7]}}}
      ]
   db.collection('item').aggregate(query).toArray((err,result) => {
       if(err) throw err;
       res.send(result)
   })
})


// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
    if(err) console.log('Error while connecting');
    db = dc.db('componies');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})