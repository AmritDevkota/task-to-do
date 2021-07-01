const express = require('express');

const isAuth = require('../auth/is-auth.js');

const homeController = require("../controller/home.js");
const taskController = require("../controller/task.js");
const userController = require("../controller/user.js");

const router = express.Router();

router.get("/", homeController.getHomePage);
router.get("/new-task", taskController.getCreateTask);
router.post("/new-task", taskController.postCreateTask);
router.get("/all-tasks", taskController.getAllTask);
router.get("/task-detail/:id", taskController.getATask);
router.get("/task-delete/:id", taskController.deleteATask); // to-do delete

router.get("/sign-up", userController.getSignUpPage);
router.post("/sign-up", userController.postSignUp);
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.getLogout);

router.get("/me", isAuth, userController.getMe);

module.exports = router;