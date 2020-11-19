const express = require('express')
const fs = require('fs').promises;

/*
//Initialize the with HTML elements
const initializePage = (req, res) => {
  console.log("hi");
}
*/

//get all list
const getLists = (req, res) => {
  const allList = Object(res.app.locals.reactions);
  console.log(allList);

  res.status(200).send(allList);
}

//post a new request to do todo list
const addToDo = (req, res) => {

  console.log(req);
  //const data = {title: req.body.title}
  const data = req.body.title;
  const dataJson = {title: req.body.title}
  console.log(data);

  res.app.locals.reactions["todo"].push(data);
  //console.log(res.app.locals.reactions);

  //stringify the object, so it is able to write the file.
  const newList = res.app.locals.reactions;
  const stringList = JSON.stringify(newList);
  //console.log(stringList);

  //write to the new file
  fs.writeFile('./database/todo.json', stringList, (err) => {
    if (err) {throw err;}
    //send back the data //sendJSON
    //else {res.status(201).sendJSON(data);}
  });

  res.status(201).send(dataJson);

}

const main = () => {
  const app = express();
  const port = 3000;

  app.use(express.json());

  //app.use(express.static("static"));
  app.use(express.static('./static'));

  //app.get("/", initializePage);
  //get request terminal command: curl localhost:3000/api/get
  app.get("/api/get", getLists);

  //post to change single element terminal command:
  //curl -H "content-type: application/json" -d '{"title": "Road Roller Da!" }' localhost:3000/api/post
  app.post("/api/post", addToDo);
  //app.post("/api/post/:todo", addToDo);

  fs.readFile("./database/todo.json", "utf-8")
    .then((fileContents) => JSON.parse(fileContents))
    .then((data) => {

      app.locals.reactions = data;

      app.listen(port, () => {
        console.log(`Reaction gifs started on http://localhost:${port}`);
      });
    });

};

main();
