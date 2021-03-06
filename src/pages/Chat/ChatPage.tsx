import React, { useEffect } from 'react'
import { useState } from 'react'

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = () => {

  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  //let wsChannel: WebSocket;

  useEffect(() => {

    let ws: WebSocket | null = null;
    const closeHandler = ()=> {
      setTimeout(createChannel, 3000);
    }

    function createChannel() {

      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = new WebSocket( "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
      wsChannel?.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }

    createChannel();

    return () => {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();
    }
    
  }, []);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {

    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    } 

    wsChannel?.addEventListener('message', messageHandler);

    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }
  }, [wsChannel]);

  return (
    <div style={{height: '400px', overflowY: 'auto'}}>
      Messages
      {messages.map((m:ChatMessageType, index) => <Message key={index} message={m} />)}
    </div>
  )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
  return (
    <div>
      <img src={message.photo} style={{width: '30px'}} /> <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  )
}

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    }
    wsChannel?.addEventListener('open', openHandler);
    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    }
  }, [wsChannel]);

  const sendMessage = () => {
    if(!message) {
      return
    }
    wsChannel?.send(message)
    setMessage('')
  }
  return (
    <div>
      <div>
        <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
      </div>
      <div>
      <button 
        onClick={sendMessage}
        disabled={wsChannel === null || readyStatus !== 'ready'}
      >
        Send
      </button>
      </div>
    </div>
  )
}

export default ChatPage