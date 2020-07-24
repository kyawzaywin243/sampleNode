
require('dotenv').config();
let port= process.env.PORT || 8080;
let express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    path = require('path'),
	User = require('./database/user');
let cors = require('cors');
let http= require('http'),
    server = http.createServer(app),
    io= require('socket.io').listen(server);

    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.SECRET;

    
    let myStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
        let email = payload.email;
        let name = payload.name;
        User.findByEmail(email)
            .then(user => {
                if (user.name == name) {
                    done(null, user);
                }
            })
            .catch(err => done(err, null));
    });

    app.use(cors());
    app.use(express.static(path.join(__dirname, './assets')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    passport.use(myStrategy);

    let userRoute = require("./routes/user")(express, jwt);
    let adminRoute = require('./routes/admin')(express, passport);
    let guestRoute = require('./routes/guest')(express);

    app.use("/user", userRoute);
	app.use("/admin", adminRoute);
	app.use("/", guestRoute);


    
    io.on('connection',(socket)=>{
        console.log("socket opened");

        socket.on('new_joinee',(data)=>{
           console.log(data.room + data.sender)
            socket.join(data.room);
            socket.in(data.room).broadcast.emit('server_new_joinee',{
                msg : data.name+' successfully joined room '+data.room,
                user: data.name,
                date: new Date()
            })
           })
    })

	
    app.listen(process.env.PORT, () => {
    console.log(`Server is running along at ${process.env.PORT}` );
});
