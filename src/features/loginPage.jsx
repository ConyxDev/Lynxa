import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import logoLogin from "../assets/icon/iconLogin.svg";
import Line1 from "../assets/icon/Line1.svg";
import Line2 from "../assets/icon/Line2.svg";
import emailIcon from "../assets/icon/emailIcon.svg";
import lock from "../assets/icon/lock.svg";
import googleIcon from "../assets/icon/googleIcon.svg";
/* header and footer to import  */

const LoginPage = () => {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState (null);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/adminView");
        } catch (error) {
            setError(error.message);
        }
    }

    const handleGoogleLogin = async () => {
      setError(null); // Clear previous errors
      try {
          const result = await signInWithPopup(auth, provider);
          console.log("Google login result:", result.user);
          navigate("/adminView");
      } catch (error) {
          console.error("Google login error: ", error.message);
          setError("Google login failed.");
      }
  };

    return (
    
    <div className="login-container h-screen flex flex-wrap lg bg-customBlue rounded-[10px] " id="login-page">
    {/* Conteneur principal centré */}

    <div className="header-section w-full flex justify-between items-center  ">
      <div className="logo-section flex w-[297px] ml-[178px] mt-[48px] text-customBlue2 text-[48px] font-mona font-medium">LogiSmart</div>
      <div className="version-section flex w-[297px] mr-5 mt-12 text-black text-[24px] font-mona">version 2.4</div>
    </div>
    
    <div className="login-section  w-[654px] h-[720px] mt-[77px] bg-white rounded-[30px] drop-shadow-lg flex items-center flex-col m-auto">
    <img src={logoLogin} alt="iconLogin" className="mt-12 mb-14"/>
    <h1 className="text-customBlack text-[32px] line-height-[22px] mb-16 font-mona font-medium">Sign in with email</h1>
    <form className="">
        {error && <p className="">{error}</p>}
      <div className="relative">
        <img src={emailIcon} alt="emailIcon" className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="flex w-[544px] h-[50px] bg-customBlue rounded-[10px] mb-5 pl-14"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <img src={lock} alt="passwordIcon" className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="flex w-[544px] h-[50px] bg-customBlue rounded-[10px] mb-5 pl-14"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <a href="/forgot-password" className="text-customBlack opacity-75 text-sm font-mona font-medium mt-6">Forgot your password?</a>
      </div>
      <div className="flex justify-center">
      <button onClick={handleLogin} type="submit" className="flex w-[291px] h-[50px] bg-customBlue2 text-white rounded-[10px] mt-12 mb-11 justify-center items-center">Get Started</button>
      </div>
    </form>

    {/* Separator */}
    <div className="flex items-center">
      <img src={Line1} alt="Line1" className="w-[193px] h-[1px] bg-opacity-50 mr-4 customBlack"/>
      <span className="text-customBlack text-[16px] font-mona font-medium">Or sign in with</span>
      <img src={Line2} alt="Line2" className="w-[193px] h-[1px] bg-opacity-50 ml-4 customBlack"/>
    </div>

    {/* Bouton Google */}
    <button id="google-button" onClick={handleGoogleLogin} className="flex items-center justify-center">
      <img src={googleIcon} alt="Google" className="" />
      Sign in with Google
    </button>

  </div>
</div>
    )
}

export default LoginPage;