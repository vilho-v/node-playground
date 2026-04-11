const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


// req pitää olla vaikka ei käytettäisi
app.get("/home/:name/:age", (req, res) => 
{
  if(req.params.age >= 18)
    res.send(`Welcome ${req.params.name}, you're ${req.params.age} years old!`);
  else
    res.send(`Hello ${req.params.name}, you're too young!`)
});

app.get("/home/:name", (req, res) => 
{
  res.json({"username": req.params.name})
  
});