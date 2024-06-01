const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalName : {
        type : String
    },
    newFileName : {
        type : String
    },
    path : {
        type : String
    }
})

const FileModal = mongoose.model("files", fileSchema)

module.exports = FileModal