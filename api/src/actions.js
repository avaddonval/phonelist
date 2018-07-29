var db = require('./db')

async function getPhones(args) {
    console.log(args);
    var data = []
    if (args.contact) {
        data = await db.many('SELECT * FROM phones WHERE contact_id=$1', [args.contact])
            .then(data => {
                return data
            }).catch(err => {
                console.log(err)
            })
    } else {
        data = await db.many('SELECT * FROM phones')
            .then(data => {
                return data
            }).catch(err => {
                console.log(err)
            })
    }

    return data
}
async function getPhone(args) {
    var id = args.id;

    var data = await db.one('SELECT * FROM phones WHERE id=$1', [id]).then(data => {
        console.log("data", data);
        return data
    })
    return data
}

async function getContacts(args) {
    var data = await db.many('SELECT * FROM contacts').then(data => {
        console.log("data", data);
        return data
    })
    return data
}
async function getContact(args) {
    var id = args.id;

    var data = await db.one('SELECT * FROM contacts WHERE id=$1', [id]).then(data => {
        console.log("data", data);
        return data
    })
    return data
}

async function createPhone(args) {
    let data = await db.one('INSERT INTO phones(phone) VALUES($1) RETURNING id,phone,contact_id', [args.phone])
        .then(data => {
            return data
        })
    console.log(data)
    return data
}
async function createContact(args) {
    console.log(args)
    /*let data=await db.one('INSERT INTO contacts(name) VALUES($1) RETURNING *', [args.name])
     .then(data => {
     return data
     })*/

    let data = await db.task(async t => {
        // this.ctx = task config + state context;
        let newContact = await t.one('INSERT INTO contacts(name) VALUES($1) RETURNING *', [args.name])
            .then(async contact => {

                const queries = args.phones.map(phone => {
                    return t.one('INSERT INTO phones(phone,contact_id) VALUES($1,$2) RETURNING *', [phone,contact.id]);
                });
                await t.batch(queries);
                return contact
            })
            .catch(err => console.log("phones error", err));
        return newContact
    }).then(data => {
        return data;
    }).catch(error => {
        console.log("full error", error);
    });
    console.log("data",data)
    return data
}
module.exports = {getPhone, getPhones, createPhone, getContact, getContacts, createContact}