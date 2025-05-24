import './App.css'
import { useEffect, useMemo, useState} from 'react'
import { io } from 'socket.io-client'
import { appendMessage } from './utils/appendMessage'

function App() {
  const soket = useMemo(() => io('https://chat-app-api-peach-nu.vercel.app/'), []);

  const [message, setMessage] = useState('');

  useEffect(() => {
    let name;
    while (!name) {
      const input = prompt('Enter your name to join:');
      if (input && input.trim() !== '') name = input.trim();
    }
    soket.emit('new-user-joined', name);

    soket.on('user-joined', async (name) => {
      await appendMessage(`${name} joined the chat`, 'right');
      scrollToBottom();
    });

    soket.on('recieve-message', async (data) => {
      await appendMessage(`${data.name}: ${data.message}`, 'left');
      scrollToBottom();
    });

    soket.on('user-left', async (name) => {
      await appendMessage(`${name} left the chat`, 'right');
      scrollToBottom();
    });

    return  ()=> {
      soket.disconnect();
    }
  }, []);

  const scrollToBottom = () => {
    const container = document.querySelector('.container');
    container.scrollTop = container.scrollHeight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await appendMessage(`You: ${message}`, 'right');
    scrollToBottom();
    soket.emit('send', message);
    setMessage('');
  }
  
  return (
    <>
    <h1 className='text-yellow-300'>Welcome to iChat</h1>
    <div className="container"></div>
    <form className='form-container mt-5 md:mt-2' onSubmit={handleSubmit}>
      <input type="text" value={message}  placeholder="Message" className='messageInput' onChange={e => setMessage(e.target.value)}/>
      <button type='submit' className='cursor-pointer py-1 px-4 border-2 border-solid border-black rounded-lg bg-yellow-300'>send</button>
    </form>
    </>
  );
}

export default App