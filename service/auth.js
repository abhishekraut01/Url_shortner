//code for stateful authentication

// const sessionIdToUserMap = new Map();

// function setUser (id,user) {
//     sessionIdToUserMap.set(id,user);
// }
// function getUser (id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }

//code for stateless authentication

const jwt = require("jsonwebtoken");
const secretKey = "Abhishek7555@00**"

function setUser (user) {
    return jwt.sign(
        {
            _id : user._id,
            email : user.email
        },
        secretKey );
}

//this function will make tokens for us

function getUser (token) {
    if(!token) return null;
    try {
        return jwt.verify(token , secretKey)
    } catch (error) {
        return null;
    }
   
}

module.exports = {
    setUser,
    getUser
}
