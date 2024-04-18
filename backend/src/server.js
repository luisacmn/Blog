//express server. Run with Node using 'node src/server.js'
import express from "express";
import { MongoClient } from "mongodb"

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req,res) => {
  const name = req.params.name;

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();

  const database = client.db('blog-db');   //use created database

  const article = await database.collection('articles').findOne({name});

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404)
  }
})

app.put("/api/articles/:name/upvote", (req, res) => {
    const name = req.params.name;   //name inputed in the url (request)
    const article = articlesInfo.find(article => article.name === name);  //find the article which param value === database value
    
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes!`)
    } else {
        res.send('That article doesn\'t exist')
    }   
});

app.post("/api/articles/:name/comments", (req,res) => {
    const name = req.params.name; 
    const postedBy = req.body.postedBy;
    const text = req.body.text;

    const article = articlesInfo.find(article => article.name === name);
    
    if (article) {
        article.comments.push(postedBy, text);
        res.send(article.comments)
    } else {
        res.send("That article doesn\'t exist")
    }
})

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
