const { Router } = require("express");
const { getUsers, createUser, updateUser, getUser, deleteUser } = require("../controller/users.controllers");
const router = Router();


router.get('/', getUsers);

router.post('/', createUser);

router.get('/:uid', getUser);

router.put('/:uid', updateUser);

router.delete('/:uid', deleteUser);






module.exports = router;