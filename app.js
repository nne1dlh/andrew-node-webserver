const xpress = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = xpress();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `Now is : ${now}.....Method:${req.method}path: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err) {
            console.log('unable to append to server log.');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Page Under Construction",
//         welcomeMess: "Page currently under construxction"
//     });
// });
app.use(xpress.static(__dirname + '/public'));


hbs.registerHelper('getCurrYear', () => {
    return new Date().getFullYear() + 'piss';
});

hbs.registerHelper('caps', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) =>{
    //res.send('<h3>hello piss pumpers</h3>');
    res.render('home.hbs', {
        pageTitle: 'HomePage',
        welcomeMess: 'Welcome to my website...,'
        

    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errMess: 'Page not found jerkey-bouy..'
    });
});

app.listen(PORT, () =>{
    console.log(`server is listening on port ${PORT}`);
});