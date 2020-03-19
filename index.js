const express=require('express');
const bodyParser = require('body-parser');
const sql=require("mysql"); 
const port=3000;
const app=express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json


//database connection
var conn=sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_rest'
});
conn.connect(function(err){
    if(err)
    throw err;
    console.log(`database is connected !`);
});



//get home page
app.get('/home',function(req,res,next){
    var selectQuery="select * from students";
    conn.query(selectQuery,function(err,data){
        var obj={users:data,title:'students data'}
        if(err){ 
            next(err);
        }else{
            res.render('index',obj);
        }
    });

   
});

app.get('/form',function(req,res){
res.render('form',{data:null});
})



app.use((error,req, res, next)=>{

     res.status(error.status || 500).render('error',{title:error.message});
})




// about page 
app.get('/about', function(req, res) {
    res.write('<h1>hello</h1>')
    
    res.end();
});

// post API for data from form...
app.post('/form',function(req,res){
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
console.log(req.body)

    var insertQuery= "INSERT INTO students (name,phone,email) VALUES ('"+name+"', '"+phone+"','"+email+"')";
    conn.query(insertQuery,function(err,data){
        if(err){
            next(err);
        }else{
            res.render('form',{data:{name:name}});
            console.log(`new data is enter :: ${{data:{name:name}}}`);
        }

    });

});






app.listen(port, () =>{ console.log(`Hello world app listening on port ${port} !`)});




// var selectQuery="select * from students"
// conn.query(selectQuery,function(err,result){
//     if(err) 
//     {
//         console.log(`error is : ${err}`);
//     }
//     res.send(result);
//     conn.end();
// })