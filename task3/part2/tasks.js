const fs = require("fs");
const chalk = require("chalk");
const {
    title
} = require("process");

const loadTasks = () => {
    try {
        const Tasks = JSON.parse(fs.readFileSync("tasks.json"));
        return Tasks;
    } catch (e) {
        return [];
    }
};
const saveNotes = (tasks) => {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
};
const addTask = (title, content) => {
    const tasks = loadTasks();
    const searchVal = tasks.find((task) => task.title == title);

    if (!searchVal) {
        tasks.push({
            title: title,
            content: content,
            status: false,
        });
        saveNotes(tasks);
        console.log(chalk.blue.inverse("task added successfuly"));
    } else {
        console.log(chalk.red.inverse("task title used before"));
    }
};
const deleteTask = (title) => {
    const tasks = loadTasks();
    const findTask = tasks.findIndex((task) => task.title == title);
    if (findTask != -1) {
        tasks.splice(findTask, 1);
        saveNotes(tasks);
        console.log(chalk.red.inverse("task deleted"));
    } else {
        console.log(chalk.blue.inverse("this title is not here"));
    }
};
const editTitle = (title, newTitle, newContent) => {
    const tasks = loadTasks();
    const index = tasks.findIndex((task) => task.title == title);

    if (index == -1) console.log(chalk.red.inverse("task not found"));
    else {
        tasks[index] = {
            title: newTitle,
            content: newContent,
            status: tasks[index].status,
        };
        saveNotes(tasks);
        console.log(chalk.blue.inverse("task edited successfully"));
    }
};
const showTasks = () => {
    const tasks = loadTasks();
    if (tasks.length == 0) console.log(chalk.blue.inverse("no tasks yet"));
    else {
        tasks.forEach((task) => {
            console.log(
                chalk.green.inverse(`title:${task.title} and content: ${task.content} `)
            );
        });
    }
};
const showTask = (title) => {
    const tasks = loadTasks();
    const findTask = tasks.findIndex((task) => task.title == title);
    if (findTask != -1) {
        console.log(
            chalk.green.inverse(
                `title:${tasks[findTask].title} and content: ${tasks[findTask].content} `
            )
        );
    } else {
        console.log(chalk.red.inverse.italic("this task not found"));
    }
};

const editStatus = (title , status) =>{
    const tasks = loadTasks();
    const findTask = tasks.findIndex((task) => task.title == title);
    tasks[findTask].status = status
    console.log(status)
    saveNotes(tasks)
}

module.exports = {
    addTask,
    deleteTask,
    editTitle,
    showTasks,
    showTask,
    editStatus
};