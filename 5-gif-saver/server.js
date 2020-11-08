// TASK 1A: What does the require function do?
//The code will require express and file system methods that return promise obejects
//instead of using callbacks.
const express = require('express')
//const fs = require('fs/promises')
const fs = require('fs').promises;

// TASK 1B: What are these two parameters and how do they work with express?
//req is the require messsage that client send and res is response message that
//server response back to client.
const getAllMoods = (req, res) => {
  const allMoods = Object.keys(res.app.locals.reactions);
  //console.log(allMoods);

  // TASK 1C: What does the res.status() function do? What allows this to be chained?
  //the res.status is to set the HTTP status and send the content you need,
  res.status(200).send(allMoods);
};

//first get function
const moodElements = (req, res) => {
  const allMoods = Object(res.app.locals.reactions);
  console.log(allMoods);

  res.status(200).send(allMoods);
}

//second get function
const randomOneMood = (req, res) => {
  //check if the mood exist or not
  const mood = req.params.mood;
  const oneMood = Object(res.app.locals.reactions[mood]);
  const allMoodsKeys = Object.keys(res.app.locals.reactions);
  const errorMessage = "No such content, please check back\n";
  const noContent = "Mood exist, but no content found\n";
  const moodExistence = allMoodsKeys.includes(mood);

  //if the mood found
  if (moodExistence) {

    const randomNumber = Math.floor(Math.random() * oneMood.length);
    //if the length is 0
    if(oneMood.length === 0) {
      res.status(200).send(noContent);
      //console.log("No content running");
    }
    //if the length is not 0, return one random mood
    else {
      res.status(200).send(oneMood[randomNumber]);
    }

  }
  //the mood not exist
  else {
    res.status(404).send(errorMessage);
  }
  /*
  console.log("---------------------------------");
  console.log(oneMood);
  console.log(oneMood.length);
  console.log(allMoodsKeys);
  console.log(moodExistence);
  */

}

//first post fucntion
const postMood = (req, res) => {
  //set up variable to check if mood exist or not
  const newMood = req.body.mood;
  const allMoodsKeys = Object.keys(res.app.locals.reactions);
  const moodExisted = allMoodsKeys.includes(newMood);
  const moodExistedMessage = "Mood already exist, no need to add again\n";
  const newMoodAdded = "New mood added :)\n";
  console.log(moodExisted);

  //if exist
  if(moodExisted) {
    res.status(200).send(moodExistedMessage);
  }
  //if not exist, add the new mood to JSON file
  else {
    res.app.locals.reactions[newMood] = [];
    console.log(res.app.locals.reactions);
    res.status(200).send(newMoodAdded);
  }
}

//second post function
const postLink = (req, res) => {
  //set up variable to check if mood exist or not
  const mood = req.params.mood;
  const link = req.body.link;
  const allMoodsKeys = Object.keys(res.app.locals.reactions);
  const moodExisted = allMoodsKeys.includes(mood);
  const errorMessage = "Mood not exist, cannot add the link\n";
  const newLinkAdded = "New link added :)\n";

  //if mood exist, add the link to mood
  if (moodExisted) {
    res.app.locals.reactions[mood].push(link);
    console.log(res.app.locals.reactions);
    res.status(200).send(newLinkAdded);
  }
  //if mood not exist, send error message;
  else {
    res.status(404).send(errorMessage);
  }

}

//first delete function
const deleteMood = (req, res) => {
  const mood = req.params.mood;
  const deleteMessage = "Mood have been deleted\n";

  delete res.app.locals.reactions[mood];
  console.log(res.app.locals.reactions);
  res.status(200).send(deleteMessage);
}

//second delete function
const deleteLink = (req, res) => {
  const mood = req.params.mood;
  const link = req.body.link;
  const totalLength = res.app.locals.reactions[mood].length;
  const deleteMessage = "Link deleted\n";

  //Remove the element that have the same link with variable link
  const linksRemain = res.app.locals.reactions[mood].filter(element => element !== link);

  //update the new link to the mood
  res.app.locals.reactions[mood] = linksRemain;
  res.status(200).send(deleteMessage);
  console.log(res.app.locals.reactions);

}


const main = () => {
  const app = express();
  const port = 3000;

  // TASK 1D: What does this line do?
  //This line will tell the express the incoming request object as a JSON object
  app.use(express.json());

  // TASK 1E: What does this line do?
  //The line below is for get request
  app.get("/moods", getAllMoods);

  //first get request: returns the entire res.app.locals.reactions object
  app.get("/gifs", moodElements);

  //Second get request, return a random link from the moon
  app.get("/gif/:mood", randomOneMood);

  //first post request, post a new mood to the JSON object
  app.post("/mood", postMood);

  //second post request, post a link to the mood
  app.post("/gif/:mood", postLink);

  //first delete request, delete the mood from the JSON object
  app.delete("/mood/:mood", deleteMood);

  //second delete request, delete the link from the mood
  app.delete("/gif/:mood", deleteLink)

  fs.readFile("./gifs.json", "utf-8")
    .then((fileContents) => JSON.parse(fileContents))
    .then((data) => {
      // TASK 1F: What is the locals property in on the app object?
      //locals property means the object has the properties that are local variables
      app.locals.reactions = data;

      // TASK 1G: What does this do?
      //The line will listense the request from client in port 3000
      app.listen(port, () => {
        console.log(`Reaction gifs started on http://localhost:${port}`);
      });
    });



};

main();
