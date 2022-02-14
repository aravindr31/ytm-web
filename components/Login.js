import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useRecoilState } from "recoil";
import { Authenticated, cNumber, UserState } from "../atoms/musicAtoms";
import ReactLoading from "react-loading";
import { requestOTP, validateOtp } from "../utils/backendCalls";

function Login() {
  const [isNumber, setIsNumber] = useRecoilState(cNumber);
  const [isOtp, setIsOtp] = useState("");
  const [onOtp, setOnOtp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(Authenticated);
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useRecoilState(UserState);
  const alert = useAlert();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShown(true);
    }, 1500);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const handleNumberChange = (event) => {
    let number = event.target.value;
    setIsNumber(number);
  };
  const handleOTPChange = (event) => {
    let otp = event.target.value;
    setIsOtp(otp);
  };
  const handleNumClick = async () => {
    if (isNumber && isNumber.length == 12) {
      if (!onOtp) {
        const otpRequest = await requestOTP(isNumber);
        if (otpRequest.data) {
          setOnOtp(true);
          alert.show("OTP send succcessfully", {
            type: "success",
          });
        } else {
          setOnOtp(false);
          alert.show("Error. Please try again", {
            type: "error",
          });
        }
      }
    } else {
      alert.show("Validation  Failed", {
        type: "error",
      });
    }
  };
  const handleOtpClick = async () => {
    const validate = await validateOtp(isNumber, isOtp);
    if (validate.status) {
      setIsAuthenticated(true);
      setUser(validate.userId);
      Cookies.set("accessToken", validate.accessToken);
      alert.show("Welcome Back", { type: "success" });
    } else {
      alert.show("Authentication Failed", { type: "error" });
      setOnOtp(false);
      setIsNumber();
    }
  };
  return isShown ? (
    <div className="flex justify-center items-center h-screen">
      <div className="mb-3 xl:w-96">
        {!onOtp ? (
          <input
            type="number"
            pattern="[0-9]"
            title="Please Digits only, No Alphabets or Special charaters are allowed"
            className="
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-solid border-4 border-indigo-600
        rounded-xl
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            placeholder="Telegram Number"
            autoComplete="off"
            autoFocus
            required
            onChange={(e) => handleNumberChange(e)}
            value={isNumber != undefined ? isNumber : ""}
          />
        ) : (
          <input
            type="number"
            className="
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-solid border-4 border-indigo-600
        rounded-xl
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            placeholder="OTP"
            autoComplete="off"
            autoFocus
            required
            onChange={(e) => handleOTPChange(e)}
            value={isOtp != undefined ? isOtp : ""}
          />
        )}
        <div className="flex space-x-2 justify-center py-3">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={!onOtp ? () => handleNumClick() : () => handleOtpClick()}
          >
            {!onOtp ? "Get OTP" : "Authenticate"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    // ):()}
    <div className="absolute inset-x-0 bottom-5 rounded-md m-2 flex justify-center items-center sm:flex-row h-auto z-50">
      <ReactLoading type="bars" color="#4F46E5" height="5%" width="5%" />
    </div>
  );
}

export default Login;
