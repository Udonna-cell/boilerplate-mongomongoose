require('dotenv').config({path: "sample.env"});
let mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// this is a schema my database structure
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})
let Person = new mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "stanley",
    age: 18,
    favoriteFoods: ["rice","beans"]
  })
  
  person.save((err, data)=>{
    if (err){
      console.log(err)
    }else {
      console.log("saved data")
    done(null , data);
    }   
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  let people = Person.create(arrayOfPeople,(err, data)=>{
    if (err){
      console.log(err)
    }else{
      console.log("created Document :", data)
      done(null , data);
    }
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err, data)=>{
    if(err){
      console.log(err)
    }else{
      console.log(data)
      done(null , data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(er, data)=>{
    if (er){
      console.log(er)
    }else{
      console.log(data)
      done(null , data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId},(err, data)=>{
    if (err){
      console.log(err)
    }else{
      console.log(data)
      done(null, data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId},(error, document)=>{
    if (error){
      console.log(error)
    }else{
      console.log(document);
      if(document){
        let newRecord = document
        newRecord.favoriteFoods.push(foodToAdd)
        document.save((er, data)=>{
          if(er){
            console.log(er)
          }else{
            console.log("saved!")
            done(null, data)
          }
        })
      }else{
        console.log("no data was found")
      }
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data)=>{
    if (err){
      console.log(err)
    }else{
      console.log(data)
      done(null, data)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, data)=>{
    if(err){
      console.log(err);
    }else {
      console.log(data);
      done(null, data)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data)=>{
    if(!err){
      console.log(data);
      done(null, data)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all: [foodToSearch]}})
  .sort({name: "asc"})
  .limit(2)
  .select("-age")
  .exec((err, data)=>{
    if(!err){
      console.log(data);
      done(null, data)
    }
  })
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
