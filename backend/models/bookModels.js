import mongoose from "mongoose";

// Don't need id field because it will be handled directly by database
const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Cat', bookSchema)