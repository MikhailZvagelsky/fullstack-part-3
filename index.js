const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('request_body', function(req, res) {
  return JSON.stringify(req.body);
}); 
const logFormat = ':method :url :status :res[content-length] - :response-time ms :request_body';
const loggingMiddleware = morgan(logFormat);
app.use(loggingMiddleware);

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/info', (request, response) => {
  const peopleCount = persons.length;
  const dateTime = new Date();
  response.send(`
  <div>
    Phonebook has info for ${peopleCount} people
  </div>
  <div>
    ${dateTime}
  </div>
  `);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `person with id ${id} is not found`;
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const person = request.body;
  if (!person.name) {
    return response.status(400).json({error: 'person name is required'});
  }
  if (!person.number) {
    return response.status(400).json({error: 'person number is required'});
  }
  const existingPerson = persons.find(p => p.name === person.name);
  if (existingPerson) {
    return response.status(400).json({error: 'name must be unique'});
  }
  const newPerson = {
    id: generatePersonId(),
    name: person.name,
    number: person.number
  };
  persons.push(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const generatePersonId = () => 
  Math.floor(Math.random() * 1_000_000_000_000);
