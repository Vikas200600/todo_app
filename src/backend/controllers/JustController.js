const dbConn = require('./../databases/sqlite');
let User = dbConn.User;
let List = dbConn.List;

exports.getAllLists = (req, res) => {
    List.findAll(
    ).then(user => {
        res.json(user);
    }).catch(err => {
        res.send("Error Occured"+err);
    })
} 

exports.getAllUsers = (req, res) => {    
    User.findAll(
        ).then(user => {
            res.json(user);
        }).catch(err => {
            res.send("Error Occured"+err);
        })
}