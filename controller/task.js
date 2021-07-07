const TaskData = require('../data/task');
const Task = require('../model/task');

module.exports.getCreateTask = (req, res, next) => {
    res.render('new-task', {
        loginUser: req.session.user
    });
}

module.exports.postCreateTask = async (req, res, next) => {
    // console.log(req.body);
    // console.log("On Post Create Task");

    let title = req.body.title;
    let body = req.body.body;
    let visibility = req.body.visibility;
    
    let userId = req.session.user._id;

    // let task = TaskData.insert(title, body);
    
    let newTask = new Task({
        title: title,
        body: body,
        taskBy: userId,
        visibility: visibility
    })

    let task = await newTask.save();


    res.render('task-created', {
        task:task,
        loginUser: req.session.user
    });
}

module.exports.getAllTask = async (req, res, next) => {
    
    let query = {};

    if (!req.session.user){
        // not login
        query = {
            visibility: "public" // only public task are visible.
        }
    } else {
        // logined in
        query = {
            visibility: ["public", "circle"] // only public and circle task visible.
        }
    }
    // let tasks = TaskData.getAll();
    let tasks = await Task.find(query).populate('taskBy', 'name');
    res.render('all-tasks', {
        tasks:tasks,
        loginUser: req.session.user
    });
}

module.exports.getATask = async (req, res, next) => {
    
    let taskId = req.params.id;
    
    // let task = TaskData.getById(postId);
    let task = await Task.findOne({_id: taskId}).populate('taskBy', 'name');

    if (task){
        res.render('task-detail', {
            task: task,
            loginUser: req.session.user
        });
    } else {
        res.render('404', {
            loginUser: req.session.user
        })
    }
    
}

module.exports.deleteATask = async (req, res, next) => {
    
    let taskId = req.params.id;
    
    // let task = TaskData.getById(postId);
    let task = await Task.findOneAndDelete({_id: taskId, taskBy: req.session.user._id});

    res.redirect('/all-tasks');
    
}
