import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLFieldConfigMap
} from 'graphql';

const UserFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    firstName: {
        type: GraphQLString,
        description: 'The first name of the user.',
    },
    lastName: {
        type: GraphQLString,
        description: 'The last name of the user.',
    },
    email: {
        type: GraphQLString,
        description: 'The email of this user.',
    },
};

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A single user.',
    fields: () => ({ ...UserFields }),
});

