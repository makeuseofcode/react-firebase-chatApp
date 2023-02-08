import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase-config'
import SendMessage from './SendMessage'
import { collection, query,limit, orderBy, onSnapshot} from "firebase/firestore";
import '../App.css'
import SignOut from './SignOut'

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const { userID } = auth.currentUser
  

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages)   
      
    });
    return () => data;
   
  }, []);
 
    return (
        <div className="container">
            <SignOut />
            <div className="msgs">

        
              {messages && messages.map((message, id, uid, photoURL) => 
                <div>
                <div key={id} className={`msg ${userID === auth.currentUser.uid ? 'received' : 'sent'}`}>
                  <img src={message.photoURL} />
                  <p>{message.text}</p>

                </div>
                </div>
              )}     
           </div>
          
          
          <SendMessage />

        </div>
    )
}

export default Chat