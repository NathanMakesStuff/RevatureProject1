const accountDAO = require('../src/repo/accountDAO')
const accountService = require('../src/service/accountService')


jest.mock('../src/repo/accountDAO')



describe('Register tests', () => {


    let daoOutput = `{
            "httpStatusCode": 200,
            "requestId": "GSD6C77QA99KAO6EGT6ORJD0ORVV4KQNSO5AEMVJF66Q9ASUAAJG",
            "attempts": 1,
            "totalRetryDelay": 0
        }`

    accountDAO.registerAcc.mockReturnValue(daoOutput)

    beforeEach(() => accountDAO.registerAcc.mockClear())

    test(`accountService.register() should use accountDAO.register to create an account
        using req.body with 3 parameters and return value from DAO to controller`, async () => {
        let body = ({
            username: "name",
            password: "password",
            role: "role"
        })

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


        const result = await accountService.register(body)

        expect(accountDAO.registerAcc).toHaveBeenCalledWith(body.username, body.password, "Employee");
        expect(result).toBe(daoOutput)
    })
})
