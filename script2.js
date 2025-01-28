use iti;

show collections;


// create new collection
db.createCollection("instructors");

//Insert many data
let instructorsArray = [
    {
        _id: 6,
        firstName: "noha",
        lastName: "hesham",
        age: 21,
        salary: 3500,
        address: { city: "cairo", street: 10, building: 8 },
        courses: ["js", "mvc", "signalR", "expressjs"],
    },

    {
        _id: 7,
        firstName: "mona",
        lastName: "ahmed",
        age: 21,
        salary: 3600,
        address: { city: "cairo", street: 20, building: 8 },
        courses: ["es6", "mvc", "signalR", "expressjs"],
    },

    {
        _id: 8,
        firstName: "mazen",
        lastName: "mohammed",
        age: 21,
        salary: 7040,
        address: { city: "Ismailia", street: 10, building: 8 },
        courses: ["asp.net", "mvc", "EF"],
    },

    {
        _id: 9,
        firstName: "ebtesam",
        lastName: "hesham",
        age: 21,
        salary: 7500,
        address: { city: "mansoura", street: 14, building: 3 },
        courses: ["js", "html5", "signalR", "expressjs", "bootstrap"],
    },

    {
        _id: 10,
        firstName: "badr",
        lastName: "ahmed",
        age: 22.0,
        salary: 5550.0,
        address: {
            city: "cairo",
            street: 10.0,
            building: 8.0,
        },
        courses: ["sqlserver", "mvc", "signalR", "asp.net"],
    },
    {
        _id: 2,
        firstName: "mona",
        lastName: "mohammed",
        age: 21.0,
        salary: 3600.0,
        address: {
            city: "mansoura",
            street: 20.0,
            building: 18.0,
        },
        courses: ["es6", "js", "mongodb", "expressjs"],
    },
    {
        _id: 3,
        firstName: "mazen",
        lastName: "ali",
        age: 30.0,
        salary: 7010.0,
        address: {
            city: "cairo",
            street: 10.0,
            building: 5.0,
        },
        courses: ["asp.net", "mvc", "EF"],
    },
    {
        _id: 4,
        firstName: "ebtesam",
        lastName: "ahmed",
        age: 28.0,
        salary: 6200.0,
        address: {
            city: "mansoura",
            street: 14.0,
            building: 7.0,
        },
        courses: ["js", "html5", "signalR", "expressjs", "bootstrap", "es6"],
    },
]
db.instructors.insertMany(instructorsArray);

//Insert my own data
db.instructors.insertOne({
    _id: 20,
    firstName: "Ahmed",
    lastName: "Gamal",
    age: 27,
    salary: 1000,
    address: {
        city: "cairo",
        street: 14.0,
        building: 7.0,
    },
    courses: ["js", "html5", "signalR", "expressjs", "bootstrap", "es6"],

});
//show my data
db.instructors.find();

//Insert instructor without firstName and LastName
db.instructors.insertOne({
    _id: 21,
    age: 27,
    salary: 1000,
    address: {
        city: "cairo",
        street: 14.0,
        building: 7.0,
    },
    courses: ["js", "html5", "signalR", "expressjs", "bootstrap", "es6"],

});
//show my data
db.instructors.find();

db.instructors.find({age: 21}); // will return all of data if founded and i can search by attribute
db.instructors.find(); //will return all if data but i can't serch by attr
db.instructors.findOne({age: 21}); // i return first one only matching my search and if there is no return null
db.instructors.find().constructor.name; //?? msh fahmha!!

db.instructors.find({}).forEach((ele)=>{
print(ele.firstName,ele.lastName);
})

//calc max and min salary
let salaryArr=[]
db.instructors.find({}).forEach((ele)=>{
salaryArr.push(ele.salary)
})
//print(salaryArr)
let maxSalary = Math.max(...salaryArr);
let minSalary = Math.min(...salaryArr);
print(maxSalary,minSalary);

