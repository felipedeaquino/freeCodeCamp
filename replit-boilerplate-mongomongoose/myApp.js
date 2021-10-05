// replit way of dealing with environment variables
require('dotenv').config();
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var database = mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

//db modelling
var personSchema = new Schema({
    name:  {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
  });

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let john = new Person({
    name: "John",
    age: 29,
    favoriteFoods: ["Sushi", "Lasanha"]
  });
  john.save((error, data) => {
    if(error){
      console.log(error);
    }
    else{
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) console.log(error);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, name) => {
    if(err) console.log(error);
    done(null, name);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, food) => {
    if(err) console.log(error);
    done(null, food);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, id) => {
    if(err) console.log(error);
    done(null, id);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) console.log(error);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if(err) console.log(error);
      done(null, data);
    });  
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, (err, foundPerson) => {
    if(err) console.log(error);
    done(null, foundPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if(err) console.log(error);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, foundPerson) => {
  if(err) console.log(error); 
  done(null, foundPerson);
  });  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort([['name']]).limit(2).select('-age').exec((err, searchResult) => {
      if(err) console.log(error);   
      done(null, searchResult);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
