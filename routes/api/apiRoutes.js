const db = require("../../models")
const config = require('../../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Load database from config file
const loadDB = (finalRes) =>{
  createItem = (config) =>{
    config.forEach(item =>{
      db.Item.create(item)
      .then(res =>{
        console.log(res)
      });
    });
  };
  
  db.Item.remove().then(res => {
    console.log(res)
    createItem(config).then(response =>{
      finalRes.json(response)
    });
  });
}
 
module.exports = function(app) {
    app.get("/loadb", (req, res) =>{
        console.log('db load request is gotten')
        loadDB(res);
      })

    app.get('/api', (req, res) =>{
        db.Item.find().then(response =>{
          let promise = new Promise((resolve, reject) => {
            let count = 0;
            response.map(item => {
              db.Review.find({itemId: item.id})
                .then(reviews =>{
                  item.reviews = reviews;
                  count++
                  if(count === response.length - 1){
                    resolve(response)
                  }
                })
            })
          })
          promise.then(result => {
              res.json(result)
          })
        })
    });

    app.get('/api/catalog/:param', (req, res) =>{
        db.Item
            .find({category: req.params.param})
            .then(response =>{
                let promise = new Promise((resolve, reject) => {
                  let count = 0;
                  response.map(item => {
                    db.Review.find({itemId: item.id})
                      .then(reviews =>{
                        item.reviews = reviews;
                        count++
                        if(count === response.length - 1){
                          resolve(response)
                        }
                      })
                  })
                })
                promise.then(result => {
                    res.json(result)
                })
            })
    });
    app.get('/api/:itemId', (req, res) =>{
        db.Item
            .find({id: req.params.itemId})
            .then( itemResponse => {
              db.Review
                .find({itemId: req.params.itemId})
                .then(
                  reviewResponse =>{
                    itemResponse[0].reviews = reviewResponse
                    console.log(itemResponse)

                    res.json(itemResponse)
                })
            })
    });

    app.post('/register' , (req, res) => {
        db.User.findOne({
            email: req.body.email
        }).then(result =>{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
              req.body.password = hash
              //console.log(req.body.password)
              //console.log(req.body)
              if(!result){
                db.User.create(req.body).then( newUser => {
                    console.log(newUser)
                    req.session.user = newUser
                    res.json(newUser)
                })
              } else {
                  res.json("exists")
              }
            });
        })

    })

    app.post('/addreview' , (req, res) =>{
      db.Review.create(req.body.review)
        .then( () => {
          db.Review.find({itemId: req.body.review.itemId})
            .then(result => {
              console.log(result)
              res.json(result);
            })
        })
    })

}



