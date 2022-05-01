const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAllUsers,
    registerUser,
    deleteUser,
    updateUser
};

async function getAllUsers() {
    return await db.User.findAll();
}

async function registerUser(params) {
    if (await db.User.findOne( { where: { email: params.email } } )) {
        throw `User with email ${params.email} is already registered.`;
    }

    const user = new db.User(params);

    user.passwordHash = await bcrypt.hash(params.password, 10);
    console.log('UserService: registerUser()');

    await user.save();
}

async function getUserById(userid) {
    const user = await db.User.findByPk(userid);
    if (!user) {
        throw `User with userid: ${userid} not found.`;
    }
    return user;
}

async function deleteUser(userid) {
    const user = await getUserById(userid);
    await user.destroy();
}

async function updateUser(userid, userObject) {
    const user = await getUserById(userid);
    if (userObject.email && userObject.email !== user.email) {
        throw `Email cannot be changed.`;
    }
 

    console.log(user);
    if (userObject.password) {
        user.passwordHash = await bcrypt.hash(userObject.password, 10);
    }
    console.log(user);

    Object.assign(user, userObject);
    console.log(user);
    await user.save();
}