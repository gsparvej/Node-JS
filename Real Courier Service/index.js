const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');




const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


// item
app.use("/api/items", require("./routes/itemRoutes"));



// vendor
app.use("/api/vendor" , require("./routes/vendorRoutes"));

// purchase order
app.use("/api/po", require("./routes/purchaseRoutes"));









app.get('/' , (req, res) =>{
    res.send('<p> Welcome my Page</p>');
})














app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});