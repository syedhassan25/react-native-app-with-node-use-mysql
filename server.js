var express = require('express');
var app = express();
var bodyparser =   require('body-parser');
var mysql = require('mysql');
app.use(bodyparser.json({type:'application/json'}));
app.use(bodyparser.urlencoded({extended:true}));

var con  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"react"
});


var server = app.listen(8000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server Start');
})

con.connect(function(error){
    if(error) console.log(error);
    else console.log('connected');

});

app.get('/users',function(req,res){
    con.query('select * from users',function(error,rows,feild){
            if(error)console.log(error);
            else{
            console.log(rows);
            res.send(rows);
            }
    })
})

app.post('/saveuser',function(req,res){

    con.query('insert into users set ?',req.body,function(error,rows,feild){
        if(error)console.log(error);
        else
        console.log(rows);
        res.send(JSON.stringify(rows));
    })

})


app.post('/updateuser',function(req,res){

    con.query('update  users set name = ? , email = ? , password= ?  where id = ? ',[req.body.name,req.body.email,req.body.password,req.body.id],function(error,rows,feild){
        if(error)console.log(error);
        else
        console.log(rows);
        res.send(JSON.stringify(rows));
    })

})

app.get('/user/:id',function(req,res){

    console.log(req.params.id)

    con.query('select * from  users where id = ?',req.params.id,function(error,rows,feild){
        if(error)console.log(error);
        else
        console.log(rows);
        res.send(JSON.stringify(rows));
    })

})

app.get('/userdelete/:id',function(req,res){

    console.log(req.params.id)

    con.query('delete from users where id = ?',req.params.id,function(error,rows,feild){
        if(error)console.log(error);
        else
        console.log(rows);
        res.send(JSON.stringify(rows));
    })

})