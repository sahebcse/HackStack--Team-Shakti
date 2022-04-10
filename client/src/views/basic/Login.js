import React, { useEffect, useState } from "react";
import SignupForm from "../../components/Auth/SignupForm";
import LoginForm from "../../components/Auth/LoginForm";
import ForgotPassword from "../../components/Auth/ForgotPassword";

export default function InternForm({ userType }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isLogin, setIsLogin] = useState(1);

  const [selectedCSC, setSelectedCSC] = useState({country:"", state:"", city:"", streetAddress:"", pinCode:1234})

  return (
    <div className="px-4 mt-10 flex w-full justify-center">
      {!user && (
        <>
          {isLogin == 1 ? (
            <LoginForm
              userType={userType}
              selectedCSC={selectedCSC}
              setSelectedCSC = {setSelectedCSC}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          ) : isLogin == 2 ? (
            <SignupForm
              userType={userType}
              selectedCSC={selectedCSC}
              setSelectedCSC = {setSelectedCSC}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          ) : (
            <ForgotPassword
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          )}
        </>
      )}
    </div>
  );
}