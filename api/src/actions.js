let db = require('./db')

async function getPhones(args) {
    console.log(args);
    let data = []
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
    let id = args.id;

    let data = await db.one('SELECT * FROM phones WHERE id=$1', [id]).then(data => {
        console.log("data", data);
        return data
    })
    return data
}

async function getContacts(args) {
    let data = await db.many('SELECT * FROM contacts').then(data => {
        console.log("data", data);
        return data
    })
    return data
}
async function getContact(args) {
    let id = args.id;

    let data = await db.one('SELECT * FROM contacts WHERE id=$1', [id]).then(data => {
        console.log("data", data);
        return data
    })
    return data
}

async function createPhone(args) {
    let data = await db.one('INSERT INTO phones(phone,contact_id) VALUES($1,$2) RETURNING *', [args.phone,args.contact_id])
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
async function editPhone(args) {
    let data = await db.one('UPDATE phones SET phone = $1 WHERE id = $2 RETURNING *', [args.phone,args.id])
        .then(data => {
            return data
        })
    console.log(data)
    return data
}

async function editContact(args) {
    let data = await db.one('UPDATE contacts SET name = $1 WHERE id = $2 RETURNING *', [args.name,args.id])
        .then(data => {
            return data
        })
    console.log(data)
    return data
}
async function deleteContact(args) {
    let data = await db.one('DELETE FROM contacts WHERE id = $1 RETURNING *', [args.id])
        .then(data => {
            return "deleted"
        })
    console.log(data)
    return data
}
async function deletePhone(args) {
    let data = await db.one('DELETE FROM phones WHERE id = $1 RETURNING *', [args.id])
        .then(data => {
            return "deleted"
        })
    console.log(data)
    return data
}
async function searchContacts(args) {
    let data = await db.many(`SELECT DISTINCT contacts.id,contacts.name 
            FROM contacts
             LEFT JOIN phones ON contacts.id = phones.contact_id
            WHERE contacts.name LIKE $1
            OR phones.phone LIKE $1
            `,
        '%'+args.search+'%').then(data => {
        console.log("data", data);
        return data
    }).catch(err=>{})
    return data
}

module.exports = {
    getPhone,
    getPhones,
    createPhone,
    getContact,
    getContacts,
    createContact,
    editPhone,
    editContact,
    deleteContact,
    deletePhone,
    searchContacts
}