var db=require('./db')

async function getPhones(args) {
    var data=await db.many('SELECT * FROM phones').then(data=>{
        console.log("data",data);
        return data
    })
    return data
    //return [{ id: 1, phone: '+77474159500', contact_id: null }]
}
async function getPhone(args) {
    var id = args.id;

    var data=await db.one('SELECT * FROM phones WHERE id=$1',[id]).then(data=>{
        console.log("data",data);
        return data
    })
    return data
}
async function createPhone(args){
    let data=await db.one('INSERT INTO phones(phone) VALUES($1) RETURNING id,phone,contact_id', [args.phone])
        .then(data => {
            return data
        })
    console.log(data)
    return data
}
module.exports={getPhone,getPhones,createPhone}