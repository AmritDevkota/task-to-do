const TaskData = require('../data/task');
const Task = require('../model/task');

module.exports.getCreateTask = (req, res, next) => {
    res.render('new-task');
}

module.exports.postCreateTask = async (req, res, next) => {
    // console.log(req.body);
    // console.log("On Post Create Task");

    let title = req.body.title;
    let body = req.body.body;

    // let task = TaskData.insert(title, body);
    
    let newTask = new Task({
        title: title,
        body: body
    })

    let task = await newTask.save();


    res.render('task-created', {
        task:task
    });
}

module.exports.getAllTask = async (req, res, next) => {
    
    // let tasks = TaskData.getAll();
    let tasks = await Task.find({});
    res.render('all-tasks', {
        tasks:tasks
    });
}

module.exports.getATask = async (req, res, next) => {
    
    let taskId = req.params.id;
    
    // let task = TaskData.getById(postId);
    let task = await Task.findOne({_id: taskId});

    if (task){
        res.render('task-detail', {
            task: task
        });
    } else {
        res.render('404')
    }
    
}