import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Otpscreen.css'
import styled from 'styled-components';
import backimg from '../../Signup/image 6.png'

function OtpScreen() {
    
  const navigate = useNavigate();
   
    let url="https://google.com"
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Login Successfully`);
         navigate('/addDetails');
      }
      const Button = styled.button`
      background-color: #1968FF;
      color: white;
      font-size: 14px;
      padding: 10px 80px;
      outline:none;
      border: none;
      border-radius: 4px;
      width:75%;
      cursor: pointer;
      margin-top:2.5em;
    `;
   
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
   
  return (
    <div classname='otp-bg'>
      {/* <div className='login-main'></div> */}
      <img  className='backimgstyle-otp' src={backimg}></img>
      <div className='otp-main'>
        <div className='otp-heading'>
          <h1>Enter Otp</h1>
        </div>
        <div className='login-subtitle-otp'>
         
            <p>An 6 digit code has been sent to subhranshushekhar27@gmail.com </p>
          </div>
          
          
         
        
    <div className='otp-Container'>
    
    <form className='Otp-submit' onSubmit={handleSubmit}>
    <div className="formField-otp">
    {otp.map((data, index) => {
                        return (
    
    <input  id="standard-basic" variant="standard"
    
     className="formFieldInput-otp"   
     name="otp"
     type="text"
     key={index}
     value={data}
     maxLength="1"
     onChange={e => handleChange(e.target, index)}
     onFocus={e => e.target.select()}/>
     );
    })} 
    </div>
    <Button className="formFieldButton" type='submit'>Continue</Button>
</form>
    </div>
   
      </div>
        
    
      {/* <Button className="formFieldButton" type='submit'>Continue</Button> */}
      <div className='otp-footer'>
        <div className='otp-footer1'>
        <p>Didn’t recieve code?</p>
        </div>
        <a href={url} className='resend-code'>Resend Code</a>
      </div>
      </div>
      
  
    
  )
}

export default OtpScreen