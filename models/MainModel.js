import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    image:String,
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [
        {
            user: { type: String, required: true },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

const BlogModel = mongoose.model('blogs', blogSchema);
export default BlogModel;