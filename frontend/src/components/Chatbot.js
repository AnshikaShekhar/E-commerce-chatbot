import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Sample product data
  const productList = {
    laptops: [
      { name: 'Laptop 1', price: '$500', description: 'A high-performance laptop with 8GB RAM and 256GB SSD.' },
      { name: 'Laptop 2', price: '$800', description: 'A gaming laptop with 16GB RAM and 512GB SSD.' },
      { name: 'Laptop 3', price: '$1200', description: 'A premium laptop with 32GB RAM and 1TB SSD.' },
    ],
    smartphones: [
      { name: 'Smartphone 1', price: '$300', description: 'A budget smartphone with 4GB RAM and 64GB storage.' },
      { name: 'Smartphone 2', price: '$600', description: 'A mid-range smartphone with 6GB RAM and 128GB storage.' },
      { name: 'Smartphone 3', price: '$1000', description: 'A flagship smartphone with 8GB RAM and 256GB storage.' },
    ],
  };

  const sendMessage = async () => {
    if (input.trim()) {
      // Add the user's message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: input },
      ]);

      // Handle different cases based on user input
      const lowerCaseInput = input.toLowerCase(); // Case-insensitive comparison
      let botResponse = "I'm sorry, I didn't understand that.";

      if (lowerCaseInput.includes('hi') || lowerCaseInput.includes('hello')) {
        botResponse = "Hello! How can I assist you today?";
      } else if (lowerCaseInput.includes('products')) {
        botResponse = "We have a variety of products including laptops, smartphones, and more. What are you looking for?";
      } else if (lowerCaseInput.includes('laptop')) {
        // Show the product list for laptops
        botResponse = "Here are some laptops available:";
        productList.laptops.forEach((product) => {
          botResponse += `\n\n${product.name} - ${product.price}\n${product.description}`;
        });
      } else if (lowerCaseInput.includes('smartphone')) {
        // Show the product list for smartphones
        botResponse = "Here are some smartphones available:";
        productList.smartphones.forEach((product) => {
          botResponse += `\n\n${product.name} - ${product.price}\n${product.description}`;
        });
      } else if (lowerCaseInput.includes('in stock')) {
        botResponse = "Yes, we have products in stock! Which one would you like to inquire about?";
      } else if (lowerCaseInput.includes('suggest a laptop')) {
        botResponse = "Sure! Here are some laptops you might like:";
        productList.laptops.forEach((product) => {
          botResponse += `\n\n${product.name} - ${product.price}`;
        });
      } else if (lowerCaseInput.includes('suggest a smartphone')) {
        botResponse = "Sure! Here are some smartphones you might like:";
        productList.smartphones.forEach((product) => {
          botResponse += `\n\n${product.name} - ${product.price}`;
        });
      } else if (lowerCaseInput.includes('buy') || lowerCaseInput.includes('order')) {
        botResponse = "Please tell me which product you'd like to buy, and I'll help you with the process.";
      } else if (lowerCaseInput.includes('help')) {
        botResponse = "I can help you with product inquiries, order placement, and more. What do you need assistance with?";
      } else if (lowerCaseInput.includes('goodbye') || lowerCaseInput.includes('bye')) {
        botResponse = "Goodbye! Feel free to ask me anything anytime.";
      } else if (lowerCaseInput.includes('laptop 1')) {
        botResponse = "Laptop 1: A high-performance laptop with 8GB RAM and 256GB SSD. Price: $500.";
      } else if (lowerCaseInput.includes('laptop 2')) {
        botResponse = "Laptop 2: A gaming laptop with 16GB RAM and 512GB SSD. Price: $800.";
      } else if (lowerCaseInput.includes('laptop 3')) {
        botResponse = "Laptop 3: A premium laptop with 32GB RAM and 1TB SSD. Price: $1200.";
      } else if (lowerCaseInput.includes('smartphone 1')) {
        botResponse = "Smartphone 1: A budget smartphone with 4GB RAM and 64GB storage. Price: $300.";
      } else if (lowerCaseInput.includes('smartphone 2')) {
        botResponse = "Smartphone 2: A mid-range smartphone with 6GB RAM and 128GB storage. Price: $600.";
      } else if (lowerCaseInput.includes('smartphone 3')) {
        botResponse = "Smartphone 3: A flagship smartphone with 8GB RAM and 256GB storage. Price: $1000.";
      }

      // Add the bot's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botResponse },
      ]);

      // Clear input field
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
