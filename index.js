const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config()// for the doteenv




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnefkr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // collection
    const jobsCollections = client.db("job-db").collection("jobs");

    //get all the jobs
    app.get('/', async(req, res) =>{
      const result = await jobsCollections.find().toArray();
      res.send(result);
    })

    // get job details
    app.get('/jobs/:id', async(req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      const result = await jobsCollections.findOne(id);
      res.send(result); 
    })


    // recruiter post

    // user delete (same time delete from firebase)

    // user personal account delete

    // job get || use axios & tanstack query || design using framer motion later 

    // job post

    // job details

    // job delete

    // job patch



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`server is running on: ${port}`);
})