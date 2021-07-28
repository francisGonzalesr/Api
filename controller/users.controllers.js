const { request, response } = require('express');
const admin = require('../config/firebase-admin');

const getUsers = async (req = request, res = response) => {

    try {
        const users = await admin.auth().listUsers();
        res.json(users);
    } catch (error) {
        console.error(error)
    }
}

const createUser = async (req = request, res = response) => {

    const { body } = req;

    try {

        await admin.auth().createUser({
            email: body.email,
            emailVerified: false,
            phoneNumber: body.phoneNumber,
            password: body.password,
            displayName: body.displayName,
            photoURL: 'https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg',
            disabled: false,
        });

        res.json({ mensaje: 'Usuario creado' });

    } catch (error) {
        res.status(500).json(error);
    }

}

const getUser = async (req = request, res = response) => {
    try {
        const { uid } = req.params;

        const user = await admin.auth().getUser(String(uid));
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req = request, res = response) => {

    try {
        const { uid } = req.params;
        const { body } = req;
        await admin.auth().updateUser(uid, {
            email: body.email,
            emailVerified: false,
            phoneNumber: body.phoneNumber,
            password: body.password,
            displayName: body.displayName,
            photoURL: 'https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg',
            disabled: false,
        });
        res.json({ mensaje: 'Usuario editado' });
    } catch (error) {
        res.status(500).json(error);

    }
}

const deleteUser = async (req = request, res = response) => {
    try {
        const { uid } = req.params;

        await admin.auth().deleteUser(uid);
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
