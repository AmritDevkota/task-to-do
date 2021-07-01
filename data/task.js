let tasks = [];

module.exports.insert = (title, body) => {
    let id = 0;
    if(tasks.length > 0){
        id = tasks[tasks.length -1].id + 1;
    }

    let task = {
        id: id,
        title: title,
        body: body
    }

    tasks.push(task);

    return task;
}

module.exports.getAll = () => {
    let allTasks = [...posts];
    return allTasks;
}

module.exports.getById = (id) => {
    let task = tasks.find(item => {
        return item.id == id;
    })

    return task;
}