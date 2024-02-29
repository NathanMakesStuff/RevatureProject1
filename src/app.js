// const http = require('http')
// const { registerAcc, login, exists } = require("./accountDAO")

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//     let currentUser = null;
//     if (req.method === "POST" && req.url === "/register") {
//         // POST ENDPOINT
//         let body = "";
//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", async () => {
//             const data = JSON.parse(body);
//             const created = await registerAcc(data.username, data.password);
//             if (!created) {
//                 res.writeHead(400, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: "Username already exists" }));
//             } else {
//                 registerAcc(data.username, data.password);
//                 // this is where you would save the data
//                 console.log(data);
//                 res.writeHead(201, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: "Account Created Successfully!" }));
//             }
//         })
//     } else if (req.method === "POST" && req.url === "/login") {
//         // POST ENDPOINT
//         let body = "";
//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", async () => {
//             const data = JSON.parse(body);
//             const loggedIn = await login(data.username, data.password);
//             if (!loggedIn) {
//                 res.writeHead(400, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: "Invalid Credentials" }));
//             } else {
//                 registerAcc(data.username, data.password);
//                 // this is where you would save the data
//                 console.log(data);
//                 currentUser = data.username;
//                 res.writeHead(202, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: `Account Logged In Successfully! Current User is ${currentUser}` }));
//             }
//         })
//     }
// })

// server.listen(PORT, () => {
//     console.log(`Server is listening on http://localhost:${PORT}`);
// })

const express = require("express");
const app = express();
const accountRouter = require("./controller/accountRouter");
const ticketRouter = require("./controller/ticketRouter");

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Incoming ${req.method} : ${req.url}`);
    next();
});

const logger = require("./util/logger");

const PORT = 3000;

app.use("/account", accountRouter);
// app.use("/register", accountRouter);
// app.use("/login", accountRouter);
app.use("/tickets", ticketRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
