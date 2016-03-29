import graphql, {
  GraphQLObjectType as ObjectType,
  GraphQLString as String,
  GraphQLSchema as Schema
} from 'graphql'

const data = {
  '1': {
    id: '1',
    name: 'Dan'
  },
  '2': {
    id: '2',
    name: 'Lee'
  },
  '3': {
    id: '3',
    name: 'Nick'
  }
}

const userType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: String },
    name: { type: String }
  }
})

export const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: String }
        },
        resolve: (_, args) => data[args.id]
      }
    }
  })
})
