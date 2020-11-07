import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './style.scss'
import LogoMessage from '../../message.ico'
import { FiX } from "react-icons/fi";

const socket = io.connect('http://localhost:5000')

function Realtime() {
  const [yourId, setYourId] = useState();
  const [state, setStaet] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])
  const [modal,setModel]= useState(true)
 

  useEffect(() => {
    socket.on('your id',id => {
      setYourId(id);
    })
    socket.on('message', ({ name, message,id }) => {
       setChat([...chat, { name, message,id }])
       console.log(chat);
      // receivedMessage({ name, message });
    })
  })
  // function receivedMessage({ name, message }) {
  //   setChat(oldMsgs => [...oldMsgs, { name, message }]);
  // }

  const onTextChange = e => {
    setStaet({ ...state, [e.target.name]: e.target.value })
    
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    const id = yourId;
    socket.emit('message', { name, message,id })
    setStaet({ message: '', name})
   
  }

  // const renderChat = () => {
  //   return chat.map(({ name, message }, index) => (
  //     <div key={index}>
  //       <h3>
  //         {name}: <span>{message}</span>
  //       </h3>
  //     </div>
  //   ))
  // }

  return (
    <div className="card" >
      <form onSubmit={onMessageSubmit} id="card" style={{display: modal ? 'none' : 'block'}}>
        <div className="chat-message">
          <div className="title-message">
            <div className="title">
              <p>Dịch vụ tư vấn</p>
            </div>
            <div className="btnClose">
              {/* <img style={{width: "20px",height:'20px'}} src={FiX} alt="icon-message" onClick={()=>setModel(true)}/> */}
              <FiX style={{width: "30px",height:'30px'}} onClick={()=>setModel(true)}/>
            </div>
          </div>
          <div className="name-field">
            <TextField
              style={{width:'100%'}}
              name="name"
              onChange={e => onTextChange(e)}
              value={state.name}
              label="Tên"
            />
          </div>
          <div className="render-chat">
            {chat.map((render,index)=>{
              if(render.id === yourId){
                return(
                  <div key={index} className="MyRow">
                    <h3>
                    {render.message}
                      </h3>
                  </div>
                )
              }
              return(
                <div key={index} className="PartnerRow">
                    <h3>
                      {render.name}: <span>{render.message}</span>
                      </h3>
                </div>
              )
            })}
          </div>
          <div className="bot-message">
            <div className="text">
              <TextField
                style={{width:'100%'}}
                name="message"
                onChange={e => onTextChange(e)}
                value={state.message}
                id="outlined-multiline-static"
                variant="outlined"
                label="Message"
              />
            </div>
            <button className="btnSend">Gữi</button>
          </div>
        </div>
      </form>
      <div className="icon-message" style={{display: modal ? 'block' : 'none'}}>
        <img style={{width: "70px",height:'70px'}} src={LogoMessage} alt="icon-message" onClick={()=>setModel(false)}/>
      </div>
    </div>
  )
}

export default Realtime;
