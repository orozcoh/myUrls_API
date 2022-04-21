//const cors = require('cors');
const express = require('express');
const routerApi_v1 = require('./routes');
const app = express();

const port = 3000;

app.use(express.json());

routerApi_v1(app);
// -------------------------------- START ------------------------------------



app.get('/', (req,res) => {
    try {  
        var fs = require('fs');
        var tree_data = fs.readFileSync('api_tree.html', 'utf8');
        tree_data = tree_data.toString()
        //console.log(tree_data.toString());  
        res.send(tree_data);  
    } catch(e) {
        console.log('Error:', e.stack);
    }
});

app.get('/cv', (req,res) => {
    res.send('Soy el Curriculum Vitae de Santiago Orozco H<p>Posible redireccionamiento a LinkedIn</p>');
});

//---------------------------------- END --------------------------------------
app.listen(port, () => {
    console.log('Server running in port:' + port);
});