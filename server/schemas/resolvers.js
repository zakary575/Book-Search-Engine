
const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (_, __, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('books');

            return userData;
        }
        
        throw new AuthenticationError('Not logged in');
      }         
    }

};
  
module.exports = resolvers;
