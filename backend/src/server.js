//express server. Run with Node using 'node src/server.js'
import express, { text } from "express";
import { MongoClient } from "mongodb"

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req,res) => {
  const name = req.params.name;

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();

  const db = client.db('blog-db');   //use created database

  const article = await db.collection('articles').findOne({name});

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404)
  }
})

app.put("/api/articles/:name/upvote", async (req, res) => {
    const name = req.params.name;   //name inputed in the url (request)

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();

    const db = client.db('blog-db');
    await db.collection('articles').updateOne( {name}, {
      $inc: { upvotes: 1 }
    });

    const article = await db.collection('articles').findOne({name});

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes!`)
    } else {
        res.send('That article doesn\'t exist')
    }   
});

app.post("/api/articles/:name/comments", async (req,res) => {
    const name = req.params.name; 
    const postedBy = req.body.postedBy;
    const text = req.body.text;

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();

    const db = client.db('blog-db');   //connect to mongodb

    await db.collection('articles').updateOne({name}, {
      $push: { comments: {postedBy, text}}   //select the collection and push into mongodb comments property
    })
    
    const article = await db.collection('articles').findOne({name});

    if (article) {
        res.send(article.comments)
    } else {
        res.send("That article doesn\'t exist")
    }
})

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
