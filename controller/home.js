const Task = require('../model/task');

module.exports.getHomePage = async (req, res, next) => {
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
    res.render('home', {
        user: req.session.user,
        tasks: tasks
    });
}