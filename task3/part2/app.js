// console.log(process.env.name)
const yargs = require('yargs')
const chalk = require('chalk')
const tasks = require('./tasks')

yargs.command({
    command: 'add',
    describe: 'add new task',
    builder: {
        title: {
            type: 'string',
            demandCommand: true,
            describe: 'task title'
        },
        content: {
            type: 'string',
            demandCommand: true,
            describe: 'task content'
        }
    },
    handler: function (argv) {
        tasks.addTask(argv.title, argv.content)

    }
})
yargs.command({
    command: 'del',
    describe: 'delete task using task title',
    builder: {
        title: {
            type: 'string',
            demandCommand: true,
            describe: 'task title'
        }
    },
    handler: function (argv) {
        tasks.deleteTask(argv.title)
    }


})
yargs.command({
    command: 'edit',
    describe: 'edit the title',
    builder: {
        title: {
            type: 'string',
            demandCommand: true,
            describe: 'task title'
        },
        newTitle: {
            type: 'string',
            demandCommand: true,
            describe: 'new Title'
        },
        newContent: {
            type: 'string',
            demandCommand: true,
            describe: 'new content'
        }
    },
    handler: function (argv) {
        tasks.editTitle(argv.title, argv.newTitle, argv.newContent)
    }
})
yargs.command({
    command: 'show',
    handler: function () {
        tasks.showTasks();
    }
})
yargs.command({
    command: 'showOne',
    builder: {
        title: {
            type: 'string',
            demandCommand: true,
            describe: 'task title'
        }
    },
    handler: function (argv) {
        tasks.showTask(argv.title);
    }

})
yargs.command({
    command: 'editStatus',
    describe: 'add new task',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'task title'
          
        },
        status: {
            type: 'string',
            demandOption: true,
            describe: 'task status'
        }
    },
    handler: function (argv) {
        tasks.editStatus(argv.title, argv.status)

    }
})
yargs.parse()