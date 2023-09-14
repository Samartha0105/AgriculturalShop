const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Registrations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}).then(() => {
    console.log(`Connection to the database successful`);
}).catch((e) => {
    console.log(`Error connecting to the database: ${e}`);
});
