const http = require('http')
const {registerAcc, login, exists} = require("./account")

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/register") {
        // POST ENDPOINT
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            const data = JSON.parse(body);
            const created = await registerAcc(data.username, data.password);
            if (!created) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Username already exists" }));
            } else {
                registerAcc(data.username, data.password);
                // this is where you would save the data
                console.log(data);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Account Created Successfully!" }));
            }
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})