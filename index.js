let express = require('express');
let { dish } = require('./models/dish.model');
let { chef } = require('./models/chef.model');
let { chefDish } = require('./models/chefDish.model');
let { sequelize } = require('./lib/index');
let { Op } = require('@sequelize/core');
let app = express();

app.use(express.json());

// Data
let dishes = [
  {
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    preparationTime: 20,
  },
  {
    name: 'Sushi',
    cuisine: 'Japanese',
    preparationTime: 50,
  },
  {
    name: 'Poutine',
    cuisine: 'Canadian',
    preparationTime: 30,
  },
];

let chefs = [
  { name: 'Gordon Ramsay', birthYear: 1966 },
  { name: 'Masaharu Morimoto', birthYear: 1955 },
  { name: 'Ricardo Larrivée', birthYear: 1967 },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await dish.bulkCreate(dishes);

    await chef.bulkCreate(chefs);

    res.status(200).json({ message: 'Database seeding successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1
async function addNewChef(newChef) {
  let newData = await chef.create(newChef);

  return { newData };
}

app.post('/chefs/new', async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let response = await addNewChef(newChef);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2
async function updateChefById(id, newChefData) {
  let chefDetails = await chef.findOne({ where: { id } });

  if (!chefDetails) return {};

  chefDetails.set(newChefData);
  let updatedData = await chefDetails.save();

  return { message: 'Chef updated successfully', updatedData };
}

app.post('/chefs/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newChefData = req.body;
    let response = await updateChefById(id, newChefData);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Port
app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
