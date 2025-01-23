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

    const response = await respondToMessage(savedMessage);

    res.status(201).send(response);
  } catch (error) {
    console.error('Cant save message', error);
    res.send(500).send({message: error})
  }
};

const respondToMessage = async (message) => {
  //TODO Adjust this function for proper response
  try {
    const response = await fetch('https://cw-api-1.onrender.com/quotes/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if(!response.ok) {
      throw new Error('No response from https://cw-api-1.onrender.com/quotes/random');
    }

    const data = await response.json();
    
    if (!data || !data.result.text) {
      throw new Error('wrong respone from API');
    }
    
    const responseMessage = new Message({
      content: data.result.text,
      sender: '35883955-7b19-4840-a600-1498ef5e15cb',  //! Needs to be handled properly each conversation should have its own uuid
      recipient: message.sender,                       //! Sender id is the userId working on the frontend
      timestamp: new Date(),
    });

    return responseMessage;
  } catch (error) {
    console.error(error);
    throw new Error('No response from https://cw-api-1.onrender.com/quotes/random');
  }
}

module.exports = {
  postOneMessage,
  getMessage
}