
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  
  // MODELS
const Clothe= require('./models/Clothing');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));



app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  app.get('/clothes', async (req, res) => {
    const clothes = await Clothe.find({});
  
    res.render('clothes/index.ejs', { clothes: clothes });
  });
  


  app.get("/clothes/new", (req, res) => {
    res.render("clothes/new.ejs");
  });

  app.post("/clothes", async (req, res) => {
    // try {
        const newClothe = await Clothe.create(req.body); 
        console.log(newClothe); 
    // } catch (err) {
    //     console.log('ERROR:', err); 
    // }
    
    res.redirect("/clothes/new");
    console.log(req.body);
  });

//   // Fruit Show
app.get('/clothes/:clothId', async (req, res) => {
    const foundCloth = await Clothe.findById(req.params.clothId);
    res.render('clothes/show.ejs', { cloth: foundCloth });
  });


  app.get("/clothes/:clothId/edit", async (req, res) => {
    const foundCloth = await Clothe.findById(req.params.clothId);
    res.render("clothes/edit.ejs", {
      cloth:  foundCloth,
    });
  });

  
app.put("/clothes/:clothId", async (req, res) => {
  
 
  
  // Update the fruit in the database
  await Clothe.findByIdAndUpdate(req.params.clothId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/clothes/${req.params.clothId}`);
});

app.delete('/clothes/:clothId', async (req, res) => {
  await Clothe.findByIdAndDelete(req.params.clothId);
  res.redirect('/clothes');
});


app.listen(3100, () => {
  console.log("Listening on port 3100");
});