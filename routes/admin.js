let multer = require('multer');
let User = require('../database/user');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})
var upload = multer({ storage: storage });
module.exports = (express, passport) => {
    let router = express.Router();

   
    router.get('/user/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        User.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })


    router.post('/image/upload/:email', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
       let ppName=req.file.filename;
       let email=req.params.email;
       
        let obj = {
            "ppName": ppName,
            "email": email
        };
        console.log(email);
        console.log(ppName)
        User.update(obj)
            .then(result => res.json({ con: true, msg: req.file.filename }))
            .catch(err => res.json({ con: false, msg: err }));
    });


 


 
     return router;

}