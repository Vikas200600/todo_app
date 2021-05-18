const dbConn = require('./../databases/sqlite');
let List = dbConn.List;

exports.add =(req, res) => {
    const {item} = req.body;
    List.count(
    ).then(total => {
        let listId = total > 0 ? ++total : 1;
        List.create({
            id : listId,
            item : item,
            edit : 'false',
            done : 'no',
            user_id : req.session.userid
        }).then(list => {
                res.redirect('/');            
        })
    })
}

