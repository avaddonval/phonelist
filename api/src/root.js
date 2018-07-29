var actions =require('./actions')
var root = {
    phone: actions.getPhone,
    phones: actions.getPhones,
    createPhone: actions.createPhone,
};
module.exports=root