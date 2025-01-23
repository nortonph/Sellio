const Message = require('../models/Message.js');


const getMessage = async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages || message.length === 0) {
      throw new Error('No messages found');
    } 
    res.status(200).send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send({ message: 'Error fetching messages', error });
  }
}


const postOneMessage = async (req, res) => {
  try {
    const { content, sender, recipient } = req.body
    
    if(!content || !sender || !recipient) {
      throw new Error('content, sender, or receiver missing');
    }
    
    const newMessage = new Message({
      content,
      sender, 
      recipient, 
      timestamp: new Date(),
    })

    const savedMessage = await newMessage.save();

    res.status(201).send(savedMessage);
  } catch (error) {
    console.error('Cant save message', error);
    res.send(500).send({message: error})
  }
};

module.exports = {
  postOneMessage,
  getMessage
}