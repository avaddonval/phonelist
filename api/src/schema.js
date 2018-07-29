var { buildSchema} = require('graphql');
var schema = buildSchema(`
    type Query {
        phone(id: Int): Phone
        phones: [Phone]
    },
    type Mutation {
        createPhone(phone: String!): Phone
    },
    type Phone {
        id: Int
        phone: String
        contact_id: Int
    }
`);
module.exports=schema