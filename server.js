const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const mysql = require('mysql')
const multer = require('multer')




const app = express()
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data);
const upload = multer({dest:'./upload'})

//정적 파일에 직접접근가능
app.use('/image',express.static('./upload'))

const connection = mysql.createConnection({
    host :  conf.host,
    user : conf.user,
    password : conf.password,
    port: conf.port,
    database : conf.database
})

connection.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/customers',(req,res)=>{
    

    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0 ", (err,rows,fileds) => {
            res.send(rows);
        }

    )



    
})


app.post('/api/cumstomers',upload.single('image'),(req,res)=>{
    
   
    let sql = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)';
    
    let image ='';
    if(req.file?.filename){
         image = '/image/' + req.file.filename;
    }
    
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    let params = [image,name,birthday,gender,job];


    connection.query( sql, params, (err,rows,fileds) => {
            res.send(rows);
        }

    )
    
})

app.delete('/api/customers/:id',(req,res)=>{

     let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?'

     let params =[req.params.id]
    console.log(params);
     connection.query(sql,params,(err,rows,fileds) => {
        res.send(rows);
    })




});



app.listen(port, ()=>console.log(`Listening on port ${port}`));