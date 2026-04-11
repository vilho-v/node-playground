const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

let movies = [
  {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
  {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
  {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
]

// Hae kaikki elokuvat
app.get("/api/movies", (req, res) => {
    res.json(movies);
})

app.get("/api/movies/:id", (req, res) => {
    // Tallennetaan id parametrin arvo muuttujaan
    const movieId = req.params.id;

    // Luodaan uusi taulukko johon haetaan movies taulukosta elokuva jonka id täsmää reittiparametrin arvoon
    const movie = movies.filter(movie => movie.id === movieId);


    if (movie.length > 0)
        res.json(movie);
    else
        res.status(404).end();
})

// Lisää uusi elokuva
app.post("/api/movies", (req, res) => {
    // Uusi elokuva saadaan body:n sisällöstä ja sille lisätään id kenttä jonka arvoksi asetetaan Date.now() tekstimuodossa
    const newMovie = {'id': Date.now().toString(), ...req.body};

    // Lisätään uusi elokuva movies taulukon viimeiseksi
    movies = [...movies, newMovie];

    res.json(newMovie);
});

// Poista elokuva
app.delete("/api/movies/:id", (req, res) => { 
    const id = req.params.id;

    // käydään läpi kaikki elokuvat (filter)
    // filter antaa uuden joukon, jossa on vain elokuvat jotka palauttivat true
    // jos elokuvan id ei ole annettu id, antaa true ja pitää joukossa
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end();
})

// Elokuvan päivitys
app.put("/api/movies/:id", (req, res) => { 
  const id = req.params.id;
  // otetaan annettu elokuva (jossa id sama mutta kaikki muu muuttuu ... avulla)
  const updatedMovie = {'id': id, ...req.body};

  // Hae päivitettävän elokuvan indeksi
  const index = movies.findIndex(movie => movie.id === id);
  // Korvaa päivitettävä elokuva taulukossa
  movies.splice(index, 1, updatedMovie); 

  res.json(updatedMovie);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});