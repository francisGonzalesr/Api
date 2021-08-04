const { request, response } = require('express');
const admin = require('../config/firebase-admin');

const getUsers = async (req = request, res = response) => {

    try {
        const resp = await admin.auth().listUsers();
        let data = [];
        return res.json(resp.users);

        if (resp.users.length > 0) {
            resp.users.forEach(element => {
                if (element.UserRecord.email) {
                    let correo = element.UserRecord.email.split('@');
                    console.log(correo);
                    if (correo[1] == 'allinone.com') {
                        data.push(element);
                    }
                }
            });

        }
        res.json(data);
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
            photoURL: body.photoURL,
            disabled: false,
        });

        res.json({ mensaje: 'Usuario creado', ok: true });

    } catch (error) {
        res.status(200).json({ mensaje: error, ok: false });
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
            phoneNumber: body.phoneNumber,
            displayName: body.displayName,
         
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

const cambiarEstado = async (req = request, res = response) => {

    try {
        const { uid } = req.params;
        const user = await admin.auth().getUser(String(uid));


        await admin.auth().updateUser(uid, {
            disabled: !user.disabled,
        })
        res.json({ ok: true, data: !user.disabled });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    cambiarEstado
}
