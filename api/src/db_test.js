var db=require('./db')
function testDB(req,res) {

    db.any('SELECT * FROM phones').then(data=>{
        res.status(200).json(data)
    })
}
module.exports=testDB;