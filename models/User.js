const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    rights: {
        type:Boolean,
        require: true
    }
})

UserSchema.set("collection", "users")

const User = mongoose.model("users", UserSchema)

module.exports = User