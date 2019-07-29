const express = require("express");
const jwt = require("jwt-simple");
const auth = require("./auth")();
const users = require("./users");
const config = require("./config");
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(auth.initialize());

app.get('/', (req, res) => {
    res.json({
        status: "Api Running..."
    });
});

app.post('/token', (req, res) => {
    let { user, password } = req.body;
    
    if (user && password) {
        let u = users.find((u) => u.name === user && u.password === password);
        if (u) {
            let payload = { id: u.id };
            let token = jwt.encode(payload, config.jwtSecret);
            res.json({ token });
        } else 
            res.sendStatus(401);        
    } else {
        res.sendStatus(401);
    }
});

app.listen(port, () => console.log(`server listening on port ${port}`));

module.exports = app;
