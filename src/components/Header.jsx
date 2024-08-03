import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../assets/context/Context";
// import Logo from "../assets/images/quizLogo.jpg";
const Header = () => {
  let { cookie } = useContext(LoginContext);
  let navigate = useNavigate();
  //   setCookie(true);
  //   setIsLoggedIn(true);
  
  return (
    <div className="w-full h-[50px] border-b-2 p-[5px_30px] bg-white flex justify-between items-center">
      <div className="h-full">
        {/* <img src={Logo} alt="Logo" w={40} h={40} /> */}
        <Link to="/">
          <span className="text-[25px] text-[slate-500] font-extrabold cursor-pointer">
            Quiz
          </span>
        </Link>
      </div>
      <div className="w-[30%] flex justify-around items-center p-[0_10px]">
        <Link to="/admin">
          <span className="font-semibold">Quiz Questions</span>
        </Link>
        {cookie === false ? (
          <button
            className="w-[100px] h-[30px] rounded-[5px] border-2 text-slate-600 border-slate-500 hover:bg-gradient-to-r from-slate-800 to-bg-slate-300 hover:text-white hover:border-slate-200
          "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="w-[100px] h-[30px] rounded-[5px] border-2 text-slate-600 border-slate-500 hover:bg-gradient-to-r from-slate-800 to-bg-slate-300 hover:text-white hover:border-slate-200
      "
            onClick={() => navigate("/login")}
          >
            {" "}
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
