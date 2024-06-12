import Post from '../models/postModel.js';
import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!req.file) {
            throw new Error('No file uploaded');
        }


        console.log('Uploading file buffer:', req.file.buffer);

     const result = await cloudinary.uploader.upload(req.file.path,
    { resource_type: 'auto' });
    (error, result) => {
        if (error) {
            console.error('Error uploading to Cloudinary:', error);
        } else {
            console.log('Upload successful. Cloudinary response:');
            console.log('Video URL:', result.secure_url); 
            resolve(result);
        }
    }
;



        const post = new Post({
            ...req.body,
            vid: result.secure_url,
            postedBy: user.name,
        });

        await post.save();
        res.status(201).send(post);
    } catch (error) {
        console.error('Error posting:', error);
        res.status(400).send({ error: error.message });
    }
};