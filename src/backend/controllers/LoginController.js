const e = require('express');
const session = require('express-session');
let dbConn = require('./../databases/sqlite');
let User = dbConn.User;
let List = dbConn.List;

exports.signUp = (req, res) => {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
        return res.render('signup', {
            msg: "All Feilds Are Required."
        });
    } else {
        let id;
        User.count(
        ).then(total => {
            console.log("POST signup usercount: "+total);
            id = total > 0 ? ++total : 1 ;
            console.log("POST signup id: "+id)
        }).catch(err => {
            return res.redirect('/signup');
        })
        User.create({
            userId,
            name,
            email,
            password
        }).then(user => {
            res.cookie("userName", user.name);
            req.session.userid = user.id;
            return res.redirect('/');
        }).catch(err => {
            return res.redirect('/signup');
        })
    }
}

exports.signIn = (req, res) => {
    let { email, Password } = req.body;
    if (!(email && Password)) {
        console.log("unable to login")
        res.render("signin", {
            msg: "All Feilds Are Required."
        })
    } else {
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            res.cookie("userName", user.name);           
            req.session.userid = user.id;
            console.log("from signin  "+req.session.userid);
            return res.redirect('/');
        }).catch(err => {
            res.redirect('/signin');           
        });
    }
}

exports.dashboard = (req, res) => {
    if(req.session.userid){
        List.findAll({
            where : {
                user_id : req.session.userid
            },
            attributes:   [["item","items"]]           
        }).then(items => {  
            let todo =[];
            items.forEach((item, index) => {
                console.log(index,item);
                todo.push(item.dataValues);
            })
            console.log(todo);   
            res.render("profile",{
                items : todo
            });
        }).catch( err =>{
            console.log(err);
        })
    }
        
}


exports.logout = (req, res ) => {
    req.session.destroy(err => {
        console.log("An Error Occured While Destroying");
    })
    res.redirect('/signin');
}