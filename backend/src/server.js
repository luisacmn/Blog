//express server. Run with Node using 'node src/server.js'
import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
  },
  {
    name: "learn-node",
    upvotes: 0,
  },
  {
    name: "mongodb",
    upvotes: 0,
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

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
