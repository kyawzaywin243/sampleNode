
let passgen = require('../helper/passgen');
let User = require('../database/user');
module.exports = (express, jwt) => {
    let router = express.Router();

    router.post('/api/login', (req, res) => {
        let email = req.body.email;
        let pass = req.body.password;

        User.findByEmail(email)
            .then(user => {
                passgen.compare(pass, user.password)
                    .then(result => {
                        let payload = { email: user.email, name: user.name };
                        let token = jwt.sign(payload, process.env.SECRET);
                        res.send({ con: true, token: token,msg:user });
                    })
                    .catch(err => res.send({ con: false, msg: err }))
            })
            .catch(err => res.send({ con: false, msg: err }))

    });

    router.post('/api/register', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        passgen.encrypt(password)
            .then(pass => {
                let uObj = {
                    "name": name,
                    "email": email,
                    "password": pass
                };
                User.save(uObj)
                    .then(user => res.send({ con: true, msg: user }))
                    .catch(err => res.send({ con: false, msg: err }))
            }).catch(err => res.send({ con: false, msg: err }))
    });

     return router;
}