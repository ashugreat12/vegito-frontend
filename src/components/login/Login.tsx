import axios from 'axios';
import { useCallback, useState } from 'react';
import wave from "./wave.png"
import bg from "./bg.svg"
import vegito from "./vegito 2-modified.png"
import avatar from "./avatar.svg"
function Login() {
  const [otpSend, setOtpSend] = useState(false);
  const [otp,setOtp]=useState("")
  const [user,setUser]=useState("")
  const [phone, setPhone] = useState("");
  const register = useCallback(async () => {
    setOtpSend(true)
    let result = await axios.post('/api/user/register', {
      phone: phone,
      status: 'unverifed',
    });
    if (result.status == 200) {
        // setOtpSend(true)
        setUser(result.data)
        localStorage.setItem("user",JSON.stringify(result.data))
        window.location.reload()
        return true;
    
    } else {
      return false;
    }
  }, [phone]);
  const verify = useCallback(async () => {
    let result = await axios.post('/api/user/verify-otp', {
      phone: phone,
      otp: otp,
    });
    if (result.status == 200) {
      localStorage.setItem("user",JSON.stringify(user))
      window.location.reload()
        return true;
    
    } else {
      return false;
    }
  }, [user,otp]);

  return (
    <div>
          

      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
          <img src={bg} />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src={vegito}  />
            <h2 className="title">See & Buy Return At same time </h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                {/* <h5>Number</h5> */}
                <input type="text" placeholder="Number" onChange={(e)=>{
                    setPhone(e?.currentTarget.value)
                }} />
              </div>
            </div>
            {/* {otpSend && (
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>OTP Less Login</h5>
                  <input type="password"  onChange={(e)=>{
                    setOtp(e?.currentTarget?.value)
                }}
                placeholder='Enter OTP' className="input" />
                </div>
              </div>
            )} */}
            {/* <a href="#">Forgot Password?</a> */}
            {/* {otpSend && (
              <input
               
                onClick={() => {
                 verify()
                }}
                
                className="btn"
                value="Verify"
              />
            )} */}
          <input
            
              onClick={() => {
            register()
              }}
              className="btn"
              value={`${otpSend?"Just a sec": "OTP Less-Login"}`}
            />
            
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
