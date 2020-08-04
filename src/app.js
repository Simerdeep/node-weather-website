const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { geocode, forecast } = require('./Utils');
const e = require('express');

const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('',(req,res) => {
    res.render('index',{
        title: "Weather",
        createdBy: "Simer"
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help",
        createdBy: "Simer"
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About Us",
        createdBy: "Simer"
    });
});

app.get('/weather',(req,res) => {

    const address = req.query.address;

    if(!address) {
        return res.send({
            error: "No address"
        })
    }

    console.log(address)

    geocode(address, (error,response) => {
        if(error) {
            res.send({ error:"Unable to connect to location service"});
        }
        else if(response.body.features.length === 0){
            res.send({ error:"Unable to find location"})
        }
        else {
            const cityData = response.body.features[0];
            const latLng = cityData.center;
            const longitude = latLng[0];
            const latitude = latLng[1];
            
            forecast(latitude,longitude,(error,response) => {

                if(error) 
                    res.send({error});
                else {
                    res.send(
                        response.body
                    );
                }    
                
            })

           
            //forecast(longitude,latitude);
        }
    })

});

app.get('/products',(req,res) => {

    if(!req.query.search){
        res.send({
            error: "You must provide search term"
        })
    }

    else {

        res.send({
            products: []
        })

    }
   
});

app.get('*',(req,res) => {
    res.send("404 Page")
});

app.listen(port, () => {
    console.log("Server is started")
});