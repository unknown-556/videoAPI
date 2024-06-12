import Post from "../models/postModel"

export const getvideos = async (req,res) => {
    try{
        const allvideos = await Post.find()
        if(!allvideos){
            res.status(400).json ({message:'No videos found in database'})
        }else {
            console.log({message:'videos found successfully',allvideos})
            return res.status(200).json({ message: 'video found successfully', allvideo });
            // return res.json({allvideos})
        }
    
        }   catch (error) {
            console.error ('Error while getting videos')
            res.status(500).json({message:error.message})
            console.error(error);
        }
}    


export const getvideo = async (req, res) => {
    try {
        const videoId = req.params.id; 
        const video = await Post.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: `No video with ID: ${videoId} found` });
        } else {
            console.log('video found successfully', video);
            return res.status(200).json({ message: 'video found successfully', video });
            // return res.json({article});
            
        }
    } catch (error) {
        console.error('Error while getting article', error);
        return res.status(500).json({ message: error.message });
    }
};
