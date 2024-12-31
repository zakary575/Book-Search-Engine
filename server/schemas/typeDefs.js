const typeDefts = `
type User{
    _id:ID
    username:String
    email:String
    password:String
    savedBooks:[Book]
}
    
type Book{
    _id:ID
    authors:String
    description:String
    bookId:String
    image:String
    link:String
    title:String
}

type Auth {
    token: ID!
    user: User
}

  input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }`