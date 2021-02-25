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
    default:
      response = "OK";
      break;
  }
  return response;
}

function solvePuzzle(d) {
  let puzzleMatch = d.match(/\sABCD\sA([<>=-]{4})\sB([<>=-]{4})\sC([<>=-]{4})\sD([<>=-]{4})/);
  if(puzzleMatch) {
    let [puzzleString, ...solution] = puzzleMatch;
    let isSolved = false;
    while(!isSolved) {
      isSolved = true; // assume it's solved until a blank is found
      for(let row = 0; row < 4; row++) { // each row
        for(let col = 0; col < 4; col++) { // each col
          if(solution[row][col] === '-') { // if it's blank
            if(solution[col][row] !== '-') { // if the correlated element isn't blank
              // set the element to the opposite of it's correlated element
              solution[row][col] = solution[col][row] === '>' ? '<' : '>';
            } else {
              //isSolved = false;
            }
          }
        }
      }
    }
    return ` ABCD\nA${solution[0]}\nB${solution[1]}\nC${solution[2]}\nD${solution[3]}`;
  } else {
    return "couldn't parse puzzle";
  }
}