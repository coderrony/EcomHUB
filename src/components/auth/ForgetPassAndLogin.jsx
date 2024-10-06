"use client";

import { useState } from "react";
import OtpModal from "./OtpModal";
import PasswordForget from "./PasswordForget";
import LoginForm from "./LoginForm";
import ConfirmRestPassword from "./ConfirmRestPassword";

function ForgetPassAndLogin() {
  const [otpModal, setOtpModal] = useState(false);
  const [user, setUser] = useState(null);
  const [forgetOtpVerify, setForgetOtpVerify] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  return (
    <div>
      {otpModal ? (
        <OtpModal
          setOtpModal={setOtpModal}
          otpModal={otpModal}
          user={user}
          forgetPassword={true}
          setForgetOtpVerify={setForgetOtpVerify}
        />
      ) : (
        <div>
          {!isForgetPassword && (
            <p className="text-gray-600 mb-6 text-sm">welcome to EcomHUB</p>
          )}

          {isForgetPassword ? (
            <PasswordForget
              setOtpModal={setOtpModal}
              setIsForgetPassword={setIsForgetPassword}
              setUser={setUser}
            />
          ) : (
            <div>
              {forgetOtpVerify ? (
                <ConfirmRestPassword
                  user={user}
                  setForgetOtpVerify={setForgetOtpVerify}
                />
              ) : (
                <LoginForm setIsForgetPassword={setIsForgetPassword} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ForgetPassAndLogin;
