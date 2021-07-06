const { response, request } = require('express');
const User = require('../model/user');
const Task = require('../model/task');




module.exports.getSignUpPage = (req, res, next) => {
    res.render('user-sign-up');
}

module.exports.postSignUp = async (req, res, next) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let newUser = new User({
        name: name,
        email: email,
        password: password
    })

    let user = await newUser.save();

    res.render('user-created', {
        user:user
    });
}

module.exports.getLogin = (req, res, next) => {
    res.render('user-login');

}

module.exports.postLogin = async (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
        email:email
    }).lean();

    if (!user){
        return res.render('login-user-not-found')
    }

    if (user.password != password) {
        return res.render('login-password-not-match')
    }

    req.session.user = {
        ...user
    }
    req.session.isLogin = true;

    res.render('user-login-successful', {
        loginUser: user
    });
}

module.exports.getMe = async (req, res, next) => {

    res.redirect('/profile/'+req.session.user._id);
    return;
}

module.exports.getUserProfile = async (req, res, next) => {

    let userId = req.params.userId;

    let user = await User.findOne({
        _id: userId
    })
    if (!user){
        res.render('404')
        return;
    }

    let taskQuery = {};

    if (!req.session.user){
        taskQuery = {
            visibility: "public"
        }
    } else {
        if (req.session.user._id == user._id) {
            taskQuery = {
                visibility: ["public", "private", "circle"]
            }
        } else {
            taskQuery = {
                visibility: ["public", "circle"]
            }
        }
    }

    taskQuery.taskBy = user._id

    console.log(taskQuery);

    let tasks = await Task.find(taskQuery).populate('taskBy', 'name');

    res.render('user-profile', {
        user: user,
        tasks: tasks,
        loginUser: req.session.user
    });
}

module.exports.getLogout = (req, res, next) => {
    req.session.user = null;
    req.session.isLogin = false;
    res.redirect("/");
}