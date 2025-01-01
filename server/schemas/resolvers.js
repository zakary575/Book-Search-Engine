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
        
        throw new Error('Not logged in');
      }         
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new Error('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new Error('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { book }, context) => {
            if (context.user) {          
              const user= await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: book } },
                { new: true }
              );
          
              return user;
            }
          
            throw new Error('You need to be logged in!');
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {          
                const user= await User.findByIdAndUpdate(
                  { _id: context.user._id },
                  { $pull: { savedBooks: {bookId: bookId} } },
                  { new: true }
                );
            
                return user;
            }

              throw new Error('You need to be logged in!');
            
        }
    }

};
  
module.exports = resolvers;
