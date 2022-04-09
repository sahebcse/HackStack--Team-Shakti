const socketio=require('socket.io')
const defaultValue = "";
const { addChat }= require('../utils/helper')

module.exports=(io, socket)=>
{
   
    //FUCK AROUND->FIND OUT

      socket.on('join-room',(roomId, userId)=>{
        console.log(`inside room on server ${roomId} ${userId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected',userId);

        socket.on('disconnect', ()=>{
            console.log('This user disconnected')
            socket.broadcast.to(roomId).emit("user-disconnected",userId)
        })


        socket.on("meeting-closed", ()=>{
            socket.broadcast.to(roomId).emit("meeting-closed-exit")
        })


        socket.on("giving-back-id",(peerId, peerName, peerResume)=>{
            socket.broadcast.to(roomId).emit("get-back-id", peerId, peerName, peerResume)
        })

    })





    //------------CHAT
    socket.on("join_chat_room",(data)=>{
        socket.join(data.room_name);
    })

    socket.on("send_message",(data)=>{
        let {room_name,msg,appointmentId,senderId,room,model}=data
        io.in(room_name).emit("receive_message",data);
        addChat({
            msg,
            appointment:appointmentId,
            senderId,
            room,
            onModel:model
        })
    })

    socket.on("typing",(data)=>{
        socket.broadcast.to(data.room_name).emit("typing",data)
    })

    socket.on("not_typing",(data)=>{
        socket.broadcast.to(data.room_name).emit("not_typing",data)
    })

}