import Conversation from '../model/conversations.model.js'
import Message from '../model/messages.model.js'

export const createConversation = async(req,res)=>{
    try{
        const userID = req.headers['x-user-id']
        console.log('header sy userID:',userID)
        const conversation = await Conversation.create({
            userID,
        })
        return res.status(201).json({message:'Conversation created successfully',conversation})
    }
    catch(err){
       return res.status(500).json({message:err.message})
    }
}

export const getConversation = async(req,res)=>{
    try{
        const userID = req.headers['x-user-id']
        console.log('header sy userID:',userID)
        const conversation = await Conversation.find({
            userID,
        })
        return res.status(200).json({message:'Conversation found successfully',conversation})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const saveMessage = async(req,res)=>{
    try{
        const {conversationId,role,content} = req.body
        const messages = await Message.create({
            conversationId,
            role,
            content,
        })
        if(!messages){
            return res.status(404).json({message:'Conversation not found'})
        }
        return res.status(200).json({message:'Message saved successfully',messages})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const updateMessage = async(req,res)=>{
    try{
       const {id,title} = req.body
       const messages = await Message.findByIdAndUpdate(id,{
            title,
       })
        return res.status(200).json({message:'Message updated successfully',messages})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const getMessage = async(req,res)=>{
    try{
        const conversationId = req.params.conversationId
        const messages = await Message.find({
            conversationId:conversationId,
        }).sort({
            createdAt:-1
        })
        return res.status(200).json({message:'Message found successfully',messages})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}