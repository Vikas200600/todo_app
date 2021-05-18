const Sequelise = require('sequelize');

let sequelise = new Sequelise({
    dialect: "sqlite",
    storage: "./src/backend/databases/database.sqlite"
});

let User = sequelise.define("users", {
    id : {
        type : Sequelise.NUMBER,
        unique : true,
        allownull :false,
        primaryKey : true        
    },
    name : {
        type : Sequelise.STRING,
        allownull : false
    },
    email : {
        type : Sequelise.STRING,
        allownull : false
    },
    password: {
        type : Sequelise.STRING,
        allownull : false
    }
})


let List = sequelise.define("lists", {
    id : {
        type : Sequelise.NUMBER,
        unique : true,
        allownull :false,     
        primaryKey : true        
    },
    item : {
        type : Sequelise.STRING,
        allownull : false
    },
    edit : {
        type : Sequelise.BOOLEAN
    },
    done: {
        type : Sequelise.STRING
    },
    user_id: {
        type : Sequelise.NUMBER,
        allownull : false
    }
})

sequelise
    .sync()
    .then(() => {
        console.log("users table has been successfully created, if one doesn't exist");
    })
    .catch(err => {
        console.log("This error occurred",err);
    })

module.exports = {
    User : User,
    List : List 
}