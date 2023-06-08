const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');


//fetch user ObjectID and genete cookie ID for brower
passport.serializeUser((user,done)=> {
    done(null,user.id);
});
passport.deserializeUser((id,done)=> {
    User.findById(id,(err,user) => {
        done(err,user);
    });
});

passport.user(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'  
},(email,password,done)=>{
    User.FindOne({email:email})
    .then((user)=> {
        if (!user) {
            return done(null,false);
        }
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }).catch((err)=>{
        console.log(err);
    });
}));