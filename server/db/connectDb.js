const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://app-mern:1234@app-mern.evhoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;
