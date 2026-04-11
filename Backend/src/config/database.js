const mongooose = require("mongoose")

function connectToDb(){

    mongooose.connect(process.env.MONGO_URI)
    .then( ()=>{
        console.log("Connected to Database")
    })
    .catch(err =>{
        console.log("Error Connecting to  Database", err)
    })
}

module.exports = connectToDb