var express = require('express');
var router = express.Router();
const userModel=require('./users');
const postModel=require('./posts');
const passport=require('passport');
const upload =require('./multer');

//en do line se smjo user login hota h
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
 
router.get('/login',function (req,res,next){
 res.render('login',{error:req.flash('error')});
});

router.get('/feed', isLoggedIn,async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user }) 
  const posts = await postModel.find()
  .populate("user")
 res.render('feed',{user,posts});
});


 router.get('/profile',isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({ username: req.session.passport.user })
    .populate("posts")
   console.log(user);
   res.render("profile",{user});
});

router.post('/fileupload', isLoggedIn, upload.single('image'), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile");
});


router.get('/add',isLoggedIn, async function(req,res,next){
  const user=await userModel.findOne({username: req.session.passport.user})
  .populate("posts");
  res.render('add',{user});
});


router.post('/createpost',isLoggedIn,upload.single("postimage"), async function(req,res,next){
  const user = await userModel.findOne({username: req.session.passport.user });
  const post =await postModel.create({
    user: user._id,
    title:req.body.title,
    image:req.file.filename
  })
   user.posts.push(post._id);
   await user.save();
   res.redirect("/profile");
});


router.get('/show/posts',isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({ username: req.session.passport.user })
    .populate("posts")
   res.render("show",{user});
});

//authentication
router.post('/register',function(req,res){
  const {username ,email,fullname,password}=req.body;
  const userData=new userModel({username,email,fullname,password});

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    })
  }) 
})

router.post('/login', passport.authenticate("local",{
  successRedirect:'/profile',
  failureRedirect: '/login',
  failureFlash:true
}), function (req,res){

});

router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
 res.redirect('/login');
}
module.exports = router;  






 

 


 


 


 

 
 

 