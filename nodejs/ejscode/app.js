let express = require('express');
let app = express();
let port = 9001;

app.use(express.static(__dirname+'/public'))
app.set('views','./src/views');
app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.render('index',{title:'Code With Node'})
})

app.listen(port)