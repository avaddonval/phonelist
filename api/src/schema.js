var { buildSchema} = require('graphql');
var {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,GraphQLNonNull,GraphQLInputObjectType
}= require('graphql');
var actions=require('./actions')
let Phone=new GraphQLObjectType({
    name:'Phone',
    fields:()=>({
        id:{type:GraphQLInt},
        phone: {type:GraphQLString},
        contact_id: {type:GraphQLInt}
    })
})

let Contact=new GraphQLObjectType({
    name:'Contact',
    fields:()=>({
        id:{type:GraphQLInt},
        name: {type:GraphQLString},
        phones: {
            type:GraphQLList(Phone),
            resolve(parent,args){
                return actions.getPhones({contact:parent.id})
            }
        }
    })
})
var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            phones: {
                type: new GraphQLList(Phone),
                resolve() {
                    return actions.getPhones()
                }
            },
            contacts: {
                type: new GraphQLList(Contact),
                resolve() {
                    return actions.getContacts()
                }
            },
            phone: {
                type: Phone,
                args:{
                    id: { type: GraphQLNonNull(GraphQLInt) }
                },
                resolve(parent,args) {
                    return actions.getPhone(args)
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createPhone: {
                type: Phone,
                args:{
                    phone: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve(parent,args) {
                    return actions.createPhone(args)
                }
            },
            createContact: {
                type: Contact,
                args:{
                    name: { type: GraphQLNonNull(GraphQLString) },
                    phones: { type: new GraphQLList(GraphQLString) }
                },
                resolve(parent,args) {
                    return actions.createContact(args)
                }
            }
        }
    })
});


module.exports=schema