//express server. Run with Node using 'node src/server.js'
import express from "express";
import {db, connectToDb} from './db.js'   //import the db connection

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req,res) => {
  const name = req.params.name;

  const article = await db.collection('articles').findOne({name});

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404)
  }
})

app.put("/api/articles/:name/upvote", async (req, res) => {
    const name = req.params.name;   //name inputed in the url (request)

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

connectToDb(() => {  //start the server only when the database is connected
  console.log('Successfully connected to the database')
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
})
