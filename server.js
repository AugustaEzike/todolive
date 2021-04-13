const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

const connectionString = 'mongodb+srv://Austa:Austa01@cluster0.l1oqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


app.set('view engine', 'ejs')
app.use(express.static('public'))

// always use body-parser before your CRUD handlers
//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and
app.use(bodyParser.urlencoded({ extended: true }))


// CRUD HANDLERS
app.listen(5000, () => console.log('listening on this port'))
  

//MONGODOB + CRUD

MongoClient.connect(connectionString, {  useUnifiedTopology: true})
  .then(client => {
    // console.log('Connectd to the Database')
    const db = client.db("to-do-items") // to-do-items is the name of the database
    const todolist = db.collection('todos')

    
  
    app.get('/', (req, res) => {
      todolist.find().toArray()
        .then(results => {
          res.render('index.ejs', { todos: results }) //respond with a rendered ejs file
        })
        .catch(error => console.error(error))
     
    })
  
  
    app.post('/todo', (req, res) => {
      todolist.insertOne(req.body)
      .then(result => {
          res.redirect('/')
      })
      .catch(error => console.error(error))
    })

})
.catch(console.error)

  

    


    





  