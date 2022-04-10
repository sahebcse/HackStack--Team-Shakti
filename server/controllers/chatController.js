const Chat=require('../models/chatModel');

module.exports.add=async (req,res)=>{
    try{
        let newChat=new Chat(req.body);
        await newChat.save();
        return res.status(200).json({
            chat:newChat 
        })
    }
    catch(err){
        console.log(error)
        return res.status(404).json(error)
    }
}


module.exports.getChats=async (req,res)=>{
    try{
        let chats=await Chat.find({appointment:req.params.appointmentId});
        return res.status(200).json({
            chats
        }) 
    }
    catch(err){
        console.log(err);
        return res.status(404).json(error)
    }
}