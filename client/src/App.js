import './App.css'
import { useEffect, useState } from 'react'
import {useSocket } from "./utils/socket.js"
import NameModal from './components/NameModal.js'
import { appendMessage } from './utils/appendMessage.js'

function App() {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!name) return;

    socket.emit('new-user-joined', name);

    socket.on('user-joined', async (name) => {
      await appendMessage(`${name} joined the chat`, 'right');
      scrollToBottom();
    });

    socket.on('recieve-message', async (data) => {
      await appendMessage(`${data.name}: ${data.message}`, 'left');
      scrollToBottom();
    });

    socket.on('user-left', async (name) => {
      await appendMessage(`${name} left the chat`, 'right');
      scrollToBottom();
    });

    return () => {
      socket.off('user-joined');
      socket.off('recieve-message');
      socket.off('user-left');
      socket.disconnect();
    }
  }, [name, socket]);

  const scrollToBottom = () => {
    const container = document.querySelector('.container');
    container.scrollTop = container.scrollHeight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    await appendMessage(`You: ${trimmedMessage}`, 'right');
    scrollToBottom();
    socket.emit('send', trimmedMessage);
    setMessage('');
  }

  return (
    <>
      {!name && <NameModal onNameSubmit={setName} />}
      <h1 className='text-yellow-300'>Welcome to iChat</h1>
      <div className="container"></div>
      <form className='form-container mt-5 md:mt-2' onSubmit={handleSubmit}>
        <input type="text" value={message} placeholder="Message" className='messageInput' onChange={e => setMessage(e.target.value)} />
        <button type='submit' className='cursor-pointer py-1 px-4 border-2 border-solid border-black rounded-lg bg-yellow-300'>send</button>
      </form>
    </>
  );
}

export default App