//const cors = require('cors');
const express = require('express');
const routerApi_v1 = require('./routes');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(express.json());

whiteList_ApiKeys = ["test1",];

whiteList_Users = ["admin"];

app.use(cors({ origin: true }));

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
        //console.log('Error:', e.stack);
    }
});

//---------------------------------- END --------------------------------------
app.listen(port, () => {
    console.log('Server running in PORT:' + port);
});
