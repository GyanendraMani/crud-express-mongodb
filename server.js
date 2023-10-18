console.log("server called");

const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/database");
const Quots = require('./model');
const PORT = 5000;

const app = express();
InitiateMongoServer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})

app.get('/quotes/:_id', async (req, res) => {
    const id = req.params._id
    const doc = await Quots.findById(id).exec();
    res.json({ data: doc })
})

app.put('/quotes/:_id', async (req, res) => {
    const id = req.params;
    const body = req.body;
    console.log("printing data of body ", body);
    const doc = await Quots.findByIdAndUpdate(id, body).exec();

    res.json({ data: doc })
})

app.delete('/quotes/:_id', async (req, res) => {
    const id = req.params;
    const doc = await Quots.findByIdAndDelete(id).exec();

    res.json({ message: "Deleted successfully" })
})

app.get('/quotes', async (req, res) => {
    const docs = await Quots.find().exec();
    console.log("printing single doc", docs)
    res.json({ data: docs })

})

app.post("/quotes", async (req, res) => {
    console.log(req.body);
    const data = new Quots(req.body);
    await data.save();
    res.send("Post type request",)
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

