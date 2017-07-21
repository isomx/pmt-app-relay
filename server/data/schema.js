/* eslint-disable */
import assign from 'lodash/assign';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import { attributeFields } from 'graphql-sequelize';
import { relay, resolver } from 'graphql-sequelize';

import { GroupAdmins } from '../databases/Nodes';

const {
  nodeInterface,
  nodeField,
  nodeTypeMapper
} = relay.sequelizeNodeInterface(GroupAdmins);


  //id: globalIdField('group_admins'),
  //interfaces: [nodeInterface],
const GroupAdminsType = new GraphQLObjectType({
  name: 'GroupAdmins',
  description: 'The admins for the group.',
  fields: {
    groupId: {
      type: GraphQLInt,
      description: 'The Id of the group.',
    },
    userId: {
      type: GraphQLInt,
      description: 'The id of the user.',
    },
    primary: {
      type: GraphQLBoolean,
      description: 'Whether or not this user is the primary admin for this groups.',
    }
  },

});

nodeTypeMapper.mapTypes({
  'group_admins': GroupAdminsType,
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootType',
    fields: {
      groupAdmins: {
        type: GroupAdminsType,
        args: {
          groupId: {
            type: new GraphQLNonNull(GraphQLInt)
          },
        },
        resolve: resolver(GroupAdmins, {
          before: (findOptions, args, context) => {
            console.log('findOptions = ', findOptions);
            console.log('findOptions.where = ', findOptions.where);
            console.log('findOptions.attributes = ', findOptions.attributes);
            console.log('args = ', args);
            console.log('context = ', context);
            findOptions.attributes = ['groupId', 'userId'];
            return findOptions;
          },
        }),
        //resolve: getGroupAdmins,
      }
    }
  })
})

export default schema;
