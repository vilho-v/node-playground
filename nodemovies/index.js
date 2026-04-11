const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

let customers = [
  {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
  {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
  {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// Hae kaikki asiakast
app.get("/api/customers", (req, res) => {
    res.json(customers);
})

app.get("/api/customers/:id", (req, res) => {
    // Tallennetaan id parametrin arvo muuttujaan
    const customerId = req.params.id;

    // Luodaan uusi taulukko johon haetaan customers taulukosta ukko jonka id täsmää reittiparametrin arvoon
    const customer = customers.filter(cust => cust.id === customerId);


    if (customer.length > 0)
        res.json(customer);
    else
        res.status(404).end();
})

// Lisää uusi asiakas
app.post("/api/customers", (req, res) => {
    // Uusi ukko saadaan body:n sisällöstä ja sille lisätään id kenttä jonka arvoksi asetetaan Date.now() tekstimuodossa
    const newCustomer = {'id': Date.now().toString(), ...req.body};

    // Lisätään uusi asiakas customers taulukon viimeiseksi
    customers = [...customers, newCustomer];

    res.json(newCustomer);
});

// Poista asiakas
app.delete("/api/customers/:id", (req, res) => { 
    const id = req.params.id;

    // käydään läpi kaikki ukot (filter)
    // filter antaa uuden joukon, jossa on vain asiakkaat jotka palauttivat true
    // jos asiakkaan id ei ole annettu id, antaa true ja pitää joukossa
    customers = customers.filter(cust => cust.id !== id);
    res.status(204).end();
})

// asiakkaan päivitys
app.put("/api/customers/:id", (req, res) => { 
  const id = req.params.id;
  // otetaan annettu asiakas (jossa id sama mutta kaikki muu muuttuu ... avulla)
  const updatedCustomer = {'id': id, ...req.body};

  // Hae päivitettävän asiakkaan indeksi
  const index = customers.findIndex(cust => cust.id === id);
  // Korvaa päivitettävä asiakas taulukossa
  customers.splice(index, 1, updatedCustomer); 

  res.json(updatedCustomer);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});