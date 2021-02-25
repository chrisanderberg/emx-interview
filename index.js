const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(generateAnswer(req)))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function generateAnswer(req) {
  let {q, d} = req.query;
  let response = "";
  switch(q) {
    case "Resume":
      response = "https://mysterious-basin-39601.herokuapp.com/Resume-and-Cover-Letter.zip"
      break;
    case "Puzzle":
      response = solvePuzzle(d);
      break;
    case "Position":
      response = "Software Engineer - Mid Level on the Exchange team"
      break;
    case "Phone":
      response = "(760) 994-5640";
      break;
    case "Degree":
      response = "Bachelor of Science in Computer Science, Minor in Physics at California State Polytechnic University, Pomona";
      break;
    case "Referrer":
      response = "I heard about it from a recruiter, Andrew Rogers.";
      break;
    case "Years":
      response = "I have 8 years of professional experience since graduating, 18 years of writing code since I was a kid.";
      break;
    case "Name":
      response = "Christopher Anderberg";
      break;
    case "Source":
      response = "https://github.com/chrisanderberg/emx-interview";
      break;
    case "Email Address":
      response = "chris.anderberg@protonmail.com";
      break;
    case "Status":
      response = "yes";
      break;
    case "ping":
      response = "OK";
      break;
    default:
      response = "";
  }
  return response;
}

function solvePuzzle(d) {
  let puzzleString = d.match(/\sABCD\sA\S{4}\sB\S{4}\sC\S{4}\sD\S{4}/);
  if(puzzleString) {
    puzzleString = puzzleString[0]
  }
  return puzzleString || " ABCD\nA=---\nB-=--\nC--=-\nD---=";
}