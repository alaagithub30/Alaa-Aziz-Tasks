const fs = require('fs')

const readFile = function () {
    try {
        customers = JSON.parse(fs.readFileSync('customers.json').toString())
    } catch (e) {
        customers = []
    }

    return customers
}
const writeFile = function (customers) {
    fs.writeFileSync('customers.json', JSON.stringify(customers))
}
const addNewCustomer = function (customer) {
    customers = readFile()
    customers.push(customer)
    writeFile(customers)
}
const showCustomerData = function (customer) {
    customers = readFile()
    customer = customers.findIndex(cust => {
        if (cust.id == customer.id) {
            console.log(`id is ${cust.id} and name is ${cust.name} and balance is ${cust.balance}`)
        }
    })

}
const addCustomerBalance = function (addextraBalance) {
    customers = readFile()
    addextraBalance = customers.findIndex(cust => {
        if (cust.id == addextraBalance.id) {
            cust.balance += addextraBalance.extraBalance
            console.log(`id is ${cust.id} and name is ${cust.name} and new balance is ${cust.balance}`)
        }
    })
    writeFile(customers)
}
const deleteCustomer = function (customer) {
    customers = readFile()
    customer = customers.findIndex(cust => {
        if (cust.id == customer) {
            console.log(cust)
            return cust
        }
    })
    customers.splice(customer, 1)
    writeFile(customers)

}
const readApi = function (apiname, id) {
    const https = require('https')

    if (apiname == 'todos')  url = `https://jsonplaceholder.typicode.com/todos`
    else if (apiname == 'albums') url = `https://jsonplaceholder.typicode.com/albums`
        const myRequest = https.request(url, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data = data + chunk.toString()
            })
            response.on('end', () => {
                const body = JSON.parse(data)
                if(!id){ console.log(body)
                } else {
                const findID = body.findIndex(ids => {
                    if (ids.id == id) console.log(ids)
                })
                }

            })
        })
        myRequest.on('error', (error) => console.log('error'))
        myRequest.end()

}
const showapibyid = function () {

}


module.exports = {
    addNewCustomer,
    showCustomerData,
    addCustomerBalance,
    deleteCustomer,
    readApi,
    showapibyid
}