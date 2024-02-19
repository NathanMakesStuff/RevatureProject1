

// check if name exists by checking it against names in db
function exists(name) {
    // if name doesn't exist in db return false
    return false;
}

// register an account by creating an account object and then pushing that into the db if
function registerAcc (name, password) {
    if (!exists(name)) {
        let account = {
            name: `${name}`,
            password: `${password}`
        }
        // add account to db
        return account;
    }
}

console.log(registerAcc("hello", "12344"))

// login if name and password matches, no need to check for existance, not matching will result in failure regardless
function login (name, password) {
    if (match(name, password)) {
        // login
        console.log("logged in")
    }
}

function match (name, password) {
    // open up db, check if name and password match a name and password in account
}