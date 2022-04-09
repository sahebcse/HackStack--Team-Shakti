const Chat=require('../models/chatModel');

module.exports.addChat=async (data)=>{
    try{
        let newChat=new Chat(data);
        await newChat.save();
    }
    catch(err){
        console.log(error)
    }
}
