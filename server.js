const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://reqe:thisisapassword@cluster0.l1oqp.mongodb.net/mytodoDB?retryWrites=true&w=majority'


MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        //MAKE SURE BODY PARSER IS PUT BEFORE CRUD HANDLERS!!!
        // urlencoded method within the body-parser tells body-parser to extract data from the <form> element and add them to the <body> property in the request object
        app.use(bodyParser.urlencoded({ extended: true })) //urlencoded(options?: bodyParser.OptionsUrlencoded): createServer.NextHandleFunction. Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
        app.use(express.static('public'))
        app.use(bodyParser.json())

        
        const db = client.db('to-do-missions')
        const missionBoxes = db.collection('missions')
        app.set('view engine', 'ejs')

        app.listen(3000, function() {
            console.log("Listening on 3000")
        })
        
        //READ REQUEST (get a response from sever and read it back to me)
        //app.get(endpont(where are we listening on, its the value that comes after the domain name), callback(tells the broswer what to do when the requested endpoint matches the value requested, it takes the request and response objects))
        app.get('/', async (req, res) => {
            const missionsList = await missionBoxes.find().toArray()
            const missionsLeft = await missionBoxes.countDocuments({completed: false})
            const missionsCount = await missionBoxes.countDocuments()
            const missionsDone = await missionBoxes.countDocuments({completed: true})
            res.render('index.ejs', {missions: missionsList, 
                                        left: missionsLeft, 
                                        all: missionsCount,
                                        done: missionsDone})
            // missionBoxes.find().toArray()
            //     .then(results => {
            //         res.render('index.ejs', { missions: results })   
            //     })
            //     .catch(error => console.error(error))
        })
        //__dirname is the name of current directory
        //CREATE REQUEST (send something to the server)
        //a CREATE operation is performed if browser sends a POST request to the server. either through js or through <form> in html. now i am posting to the endpoint /todos which corresponds to the /todos (and POST method) in html
        app.post('/mission', (req, res) => {
            missionBoxes.insertOne({mission: req.body.mission, completed: false})
                .then(results => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        //UPDATE (when you whant to PUT(change) something. Also triggered through js or <form> element)

        //by convention UPDATE or PUT requests exist in a seperate folder called public
        //create a server that browsers can listen to
        app.put("/completeMission", (req, res) => {
            missionBoxes.updateOne({missionText: req.body.allMissions}, {
                $set: {
                    completed: true
                }
            })
            .then(result => {
                console.log(this.parentNode.childNodes[0].innerText)
                console.log('Marked Complete')
                res.json('marked complete')
            })
        })

        app.put("/undo", (req, res) => {
            missionBoxes.updateOne({missionText: req.body.allMissions}, {
                $set: {
                    completed: false
                }
            })
            .then(result => {
                console.log('Marked uncomplete')
                res.json('marked uncomplete')
            })
        })

        app.delete('/deleteMission', (req, res) => {
            
            missionBoxes.deleteOne({missionText: req.body.allMissions})
            .then(results => {
                console.log('this is deleted')
                res.json('Deleted it')
            })
        })
    })