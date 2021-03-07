const yagrs = require("yargs");
const myMethods = require('./myFunctions')
yagrs.command({
        command: 'addCustomer',
        builder: {
            id: {
                type: 'numder',
                demandOption: true
            },

            name: {
                type: 'string',
                demandOption: true
            },
            balance: {
                type: 'number',
                demandOption: true
            }
        },
        handler: function (argv) {
            let customer = {
                id: argv.id,
                name: argv.name,
                balance: argv.balance
            }
            myMethods.addNewCustomer(customer)
        }
    }),
yagrs.command({
        command: 'showCustomer',
        builder: {
            id: {
                type: 'numder',
                demandOption: true
            }
        },
        handler: function (argv) {
            let customer = {
                id: argv.id
            }
            myMethods.showCustomerData(customer)
        }

    })
yagrs.command({
        command: 'addBalance',
        builder: {
            id: {
                type: 'number',
                demandOption: true
            }
        },
        handler: function (argv) {
            let addextraBalance = {
               id:argv.id , extraBalance:argv.extraBalance 
            }
            myMethods.addCustomerBalance(addextraBalance)
        }

    })
yagrs.command({
        command: 'deleteCustomer',
        builder: {
            id: {
                type: 'numder',
                demandOption: true
            }
        },
        handler: function (argv) {
            myMethods.deleteCustomer(argv.id)
        }
    })    
yagrs.command({
    command:'showApibyId',
    builder :{
        apiname:  {
              type: 'string',    
    },
    id :{
        type: 'number', 
    }
},
    handler: function (argv) {
        myMethods.readApi(argv.apiname, argv.id)
    }
})
 
yagrs.argv