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




// Merchandiser Manager Part*********

// vendor
app.use("/api/vendor", require("./routes/vendorRoutes"));

//BomStyle
app.use("/api/bomStyle", require("./routes/bomStyleRoutes"));

//BOM
app.use("/api/bom", require("./routes/bomRoutes"));

//UOM
app.use("/api/uom", require("./routes/uomRoutes"));

//Buyer
app.use("/api/buyer", require("./routes/buyerRoutes"));

// Order
app.use("/api/order", require("./routes/orderRoutes"));



// Purchase Manager Part *******

// purchase order
app.use("/api/po", require("./routes/purchaseRoutes"));

// item
app.use("/api/items", require("./routes/itemRoutes"));

// inventory
app.use("/api/inventory", require("./routes/inventoryRoutes"));


// Production Manager Part ***********

// production Order
app.use("/api/productionOrder", require("./routes/productionOrderRoutes"));














app.get('/', (req, res) => {
  res.send('<p> Welcome my Page</p>');
})














app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});