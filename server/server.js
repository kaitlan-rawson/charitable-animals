require ('dotenv').config();

const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
    , { joesPennyFunction } = require('./joesPennyFunction')
    , path = require('path')

const {
    SERVER_PORT,
    SESSION_SECRET, 
    DOMAIN, 
    CLIENT_ID, 
    CLIENT_SECRET, 
    CALLBACK_URL,
    CONNECTION_STRING,
    REACT_APP_HOMEPAGE

} = process.env

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//--------Passport--------//
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use((req, res, next) => {
    next();
})

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope:'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    //database calls
    const db = app.get('db');

    const { sub, name, picture, given_name } = profile._json;
    db.users.find_user([sub]).then(response=>{
        if (response[0]) {
            done(null, response[0].id)
        } else {
            db.users.create_user([name,picture,sub, given_name]).then(response => {
                done(null, response[0].id)
            })
        }
    })
}));

passport.serializeUser((id, done ) => {
    done(null, id);
} )

passport.deserializeUser((id, done )=> {
    const db = app.get('db');
    db.users.find_logged_in_user([id])
    .then (res=>{
        done(null,res[0])
    })
    })

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: REACT_APP_HOMEPAGE
}))


//--------Stripe--------//
app.post('/api/payment', (req, res, next) => {
    const amountArray = req.body.amount.toString().split('');
    const convertedAmt = joesPennyFunction(amountArray);
    const charge = stripe.charges.create(
        {
            amount: convertedAmt,
            currency: 'usd',
            source: req.body.token.id,
            description: 'Stripe Checkout test charge'
        },
        function(err, charge) {
            if (err) {
                console.log("ERR", err)
                return res.status(500).send(charge)
            }
            else return res.sendStatus(200);
        }
    );
});

//--------Logout/Login Axios Call--------//
app.get('/auth/me', (req,res)=>{
    if (!req.user){
        res.status(200).send(null)
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect(REACT_APP_HOMEPAGE)
})

//--------Main/Home Page Axios Calls--------//
app.get('/api/main/animals', (req,res)=>{
    const db = app.get('db');
    db.animals.get_animals_main()
    .then(resp=>{
        res.status(200).send(resp)
    })
})

//--------Dropdown Axios Calls--------//
app.get('/api/all/animals', (req,res)=>{
    const db = app.get('db')
    db.animals.get_all_animals()
    .then(resp=>{
        res.status(200).send(resp)
    })
})

app.get('/api/endangered/animals', (req,res)=>{
    const db = app.get('db')
    db.animals.get_endangered_animals()
    .then(resp=>{
        res.status(200).send(resp)
    })
})

app.get('/api/extinct/animals', (req,res)=>{
    const db = app.get('db')
    db.animals.get_extinct_animals()
    .then(resp=>{
        res.status(200).send(resp)
    })
})

app.get('/api/animal/:name', (req,res)=>{
    const db = app.get('db')
    let search = req.params.name.split('_').join(' ')
    db.animals.get_animal_info(search)
    .then(resp=>{
        res.status(200).send(resp[0])
    })
})

//--------User Axios Calls--------//
app.post('/api/animal/subscribe', (req,res)=>{
    const db = app.get('db')
    db.animals.add_subscribed_animal(req.body.animalID, req.user.id)
    .then(resp=>{
        res.status(200).send(resp[0])
    })
})

app.put('/api/monthly/donation', (req,res)=>{
    const db = app.get('db')
    db.animals.findOne({
        name: req.body.animalName
    })
    .then(resp=>{
        id = resp.id
        db.animals.monthly_donation(id, req.user.id)
        .then(resp=>{
            res.status(200).send(resp)
        })
    })
})

app.get('/api/user/subscribed', (req,res)=>{
    const db = app.get('db')
    db.subscribed_animals.find({user_id: req.user.id}) 
    .then(resp=>{
        res.status(200).send(resp.map(c=>c.animal_id))
    })
})

app.get('/api/favAnimals', (req,res)=>{
    const db = app.get('db')
    db.animals.get_fav_animals([req.user.id])
    .then(resp=>{
        res.status(200).send(resp)
    })
})

app.delete('/api/delete/favAnimals/:id', (req,res)=>{
    const db = app.get('db')
    db.animals.unsubscribe([req.params.id, req.user.id])
    .then(resp=>{
        res.status(200).send(resp)
    })
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


//--------Listen--------//

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})