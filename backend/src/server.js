//express server. Run with Node using 'node src/server.js'
import express from "express";

let articlesInfo = [  //mocked/fake database
  {
    name: "learn-react",
    upvotes: 0,
    comments: []
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: []
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments: []
  },
];

const app = express();
app.use(express.json());

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
