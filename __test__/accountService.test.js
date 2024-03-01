const accountDAO = require('../src/repo/accountDAO')
const accountService = require('../src/service/accountService')
const jwt = require('jsonwebtoken')

jest.mock('../src/repo/accountDAO')



describe('Register tests', () => {


    let daoOutput = `{
            "httpStatusCode": 200,
            "requestId": "GSD6C77QA99KAO6EGT6ORJD0ORVV4KQNSO5AEMVJF66Q9ASUAAJG",
            "attempts": 1,
            "totalRetryDelay": 0
        }`

    beforeEach(() => accountDAO.registerAcc.mockClear())

    test(`accountService.register() should use accountDAO.register to create an account
        using req.body with 3 parameters and return value from DAO to controller`, async () => {
        let body = ({
            username: "name",
            password: "password",
            role: "role"
        })
        accountDAO.registerAcc.mockReturnValue(daoOutput)

        const result = await accountService.register(body)

        expect(accountDAO.registerAcc).toHaveBeenCalledWith("name", "password", "role");
        expect(result).toBe(daoOutput)
    })


    test(`accountService.register() should use accountDAO.register to create an account
        using req.body with 2 parameters and return value from DAO to controller`, async () => {
        let body = ({
            username: "name",
            password: "password",
        })
        accountDAO.registerAcc.mockReturnValue(daoOutput)


        const result = await accountService.register(body)

        expect(accountDAO.registerAcc).toHaveBeenCalledWith(body.username, body.password, "Employee");
        expect(result).toBe(daoOutput)
    })
    test(`accountService.register() should return null if username is already in use`, async () => {
        let body = ({
            username: "name",
            password: "password",
        })
        accountDAO.registerAcc.mockReturnValue(null)
       
        const result = await accountService.register(body)

        expect(accountDAO.registerAcc).toHaveBeenCalledWith(body.username, body.password, "Employee");
        expect(result).toBe(null)
    })
})


describe('Login tests', () => {




    beforeEach(() => accountDAO.login.mockClear())

    test(`accountService.login() should use accountDAO.login to login to an account
            and sign with jwt`, async () => {
        let body = ({
            username: "username",
            password: "password",
        })
        const secretKey = "asdjsahdsajkdashj"
        let daoOutput = { password: 'password', username: 'username', role: 'Employee' }
        accountDAO.login.mockReturnValue(daoOutput)



        const result = await accountService.login(body)
        let accountData = jwt.verify(result, secretKey)


        expect(accountDAO.login).toHaveBeenCalledWith("username", "password");
        expect(accountData.username).toBe(`username`)
        expect(accountData.role).toBe(`Employee`)
    })

    test(`accountService.login() should return null if username/password pair 
            is not in db`, async () => {
        let body = ({
            username: "username",
            password: "password",
        })
        let daoOutput = null // not in db/wrong password
        accountDAO.login.mockReturnValue(daoOutput)


        const result = await accountService.login(body)


        expect(accountDAO.login).toHaveBeenCalledWith("username", "password");
        expect(result).toBe(null)
    })
})