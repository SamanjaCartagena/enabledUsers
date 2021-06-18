import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import Infobar from '../Infobar/Infobar';
import io from 'socket.io-client';
import './Chat.css';
import Input from '../Input/Input';
let socket;

const Chat = ({location}) =>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage]= useState('');
    const [messages, setMessages]= useState([]);
    const ENDPOINT ='localhost:5000';
    useEffect(() =>{
        const {name, room}= queryString.parse(location.search);
        socket = io(ENDPOINT);
         setName(name);
         setRoom(room);
        socket.emit('join',{name,room}, () =>{

        });
        
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message', (message)=>{
           setMessages([...messages, message]);
        })
    }, [messages]);
    //function for sending messages
    const sendMessage= (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message,()=>setMessage(''));
        }
    }
    console.log(message,messages);

    return (

      <div className="outerContainer">
          <div className="container">
              <Infobar room={room}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

          </div>
      </div>
        )
}
export default Chat;