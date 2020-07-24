let User = require('../database/user');

module.exports = (express) => {
    let router = express.Router();


router.get('/usersinfo', (req, res) => {
        User.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    });
router.get('/getinfo',(req,res)=>{
    res.json({name:"mg mg",age:21})
})

 return router;

}