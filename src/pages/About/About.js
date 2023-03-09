import { useState } from "react";
import { useEffect } from "react";
import Logo from './Logo.png'
import './Logo.css'

const About = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const message = "I am a coupon system program written in a full-stack course, \n check me out!";
  
    useEffect(() => {
      const typing = setTimeout(() => {
        setText(prevText => prevText + message[index]);
        setIndex(prevIndex => prevIndex + 1);
      }, 100);
  
      if (index === message.length) {
        clearTimeout(typing);
      }
  
      return () => clearTimeout(typing);
    }, [index, message]);
  
    return (
      <>
        <h1 style={{textAlign: 'center'}}>All about me</h1>
        <p style={{fontSize: '1.5em', textAlign: 'center', whiteSpace: 'pre-line'}}>
          {text}
        </p>
        <img className="rotate" src={Logo} alt="logo" style={{display: 'block', margin: '10 auto', width: '20%' , height: '40%'}} />
        
      </>
    );
  };
  
  export default About;
  