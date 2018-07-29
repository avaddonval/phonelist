var actions =require('./actions')
var root = {
    phone: actions.getPhone,
    phones: actions.getPhones,
    contact: actions.getContact,
    contacts: actions.getContacts,
    createPhone: actions.createPhone,
    createContact: actions.createContact,
};
module.exports=root