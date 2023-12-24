/* eslint-disable no-undef */
import React, { useContext, useEffect } from "react";
import './faceio.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
function FaceIO() {
    const navigate = useNavigate();
    const {loginUser} = useContext(AuthContext)
    const phoneOrEmail = localStorage.getItem("phoneOrEmail")
    const password = localStorage.getItem("password")

  
  let faceioInstance = null;

  useEffect(() => {
    const faceIoScript = document.createElement("script");
    faceIoScript.src = "//cdn.faceio.net/fio.js";
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    document.body.appendChild(faceIoScript);

    return () => {
      document.body.removeChild(faceIoScript);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },);

  const faceIoScriptLoaded = () => {
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioadc5c");
    }
  };
  // Đăng ký khuôn mặt mới vào hệ thống
  const faceRegistration = async () => {
   
    try {
      var userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          phoneOrEmail,
          password
        },
      });
    console.log("userInfo", userInfo);
     
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  // Xác thực một khuôn mặt đã có vào hệ thống
  const faceSignIn = async () => {
    try {
        const userData = await faceioInstance.authenticate({
            locale: "auto",
          });
    const body = {
        phoneOrEmail: userData.payload.phoneOrEmail,
        password: userData.payload.password
    }
       const loginData = await loginUser(body);
       console.log("s", loginData.accessToken);
      if (loginData.accessToken) {
      
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  const handleError = (errCode) => {
    console.log("Er", errCode);
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20}
  //   switch (errCode) {
  //     case fioErrCode.PERMISSION_REFUSED:
  //   //     dispatch({ 
  //   //       type: GLOBALTYPES.ALERT, 
  //   //       payload: {
  //   //           error: "Access to the Camera stream was denied by the end user"
  //   //       } 
  //   //   })
  //       console.log("Access to the Camera stream was denied by the end user");
  //       break;
  //     case fioErrCode.NO_FACES_DETECTED:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   payload: {
  //       //     error: "No faces were detected during the enroll or authentication process"
  //       //   }
  //       // })
  //       console.log(
  //         "No faces were detected during the enroll or authentication process"
  //       );
  //       break;
  //     case fioErrCode.UNRECOGNIZED_FACE:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Unrecognized face on this application's Facial Index"
  //       // })
  //       console.log("Unrecognized face on this application's Facial Index");
  //       break;
  //     case fioErrCode.MANY_FACES:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Two or more faces were detected during the scan process"
  //       // })
  //       console.log("Two or more faces were detected during the scan process");
  //       break;
  //     case fioErrCode.PAD_ATTACK:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Presentation (Spoof) Attack (PAD) detected during the scan process"
  //       // })
  //       console.log(
  //         "Presentation (Spoof) Attack (PAD) detected during the scan process"
  //       );
  //       break;
  //     case fioErrCode.FACE_MISMATCH:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Calculated Facial Vectors of the user being enrolled do not matches"
  //       // })
  //       console.log(
  //         "Calculated Facial Vectors of the user being enrolled do not matches"
  //       );
  //       break;
  //     case fioErrCode.WRONG_PIN_CODE:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Wrong PIN code supplied by the user being authenticated"
  //       // })
  //       console.log("Wrong PIN code supplied by the user being authenticated");
  //       break;
  //     case fioErrCode.PROCESSING_ERR:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Server side error"
  //       // })
  //       console.log("Server side error");
  //       break;
  //     case fioErrCode.UNAUTHORIZED:
  //       // dispatch({
  //       //   type:GLOBALTYPES.ALERT,
  //       //   error: "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
  //       // })

  //       console.log(
  //         "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
  //       );
  //       break;
  //     case fioErrCode.TERMS_NOT_ACCEPTED:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Terms & Conditions set out by FACEIO/host application rejected by the end user"
  //       // })
  //       console.log(
  //         "Terms & Conditions set out by FACEIO/host application rejected by the end user"
  //       );
  //       break;
  //     case fioErrCode.UI_NOT_READY:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
  //       // })
  //       console.log(
  //         "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
  //       );
  //       break;
  //     case fioErrCode.SESSION_EXPIRED:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
  //       // })
  //       console.log(
  //         "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
  //       );
  //       break;
  //     case fioErrCode.TIMEOUT:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
  //       // })
  //       console.log(
  //         "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
  //       );
  //       break;
  //     case fioErrCode.TOO_MANY_REQUESTS:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error:  "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
  //       // })
  //       console.log(
  //         "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
  //       );
  //       break;
  //     case fioErrCode.EMPTY_ORIGIN:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Origin or Referer HTTP request header is empty or missing"
  //       // })
  //       console.log(
  //         "Origin or Referer HTTP request header is empty or missing"
  //       );
  //       break;
  //     case fioErrCode.FORBIDDDEN_ORIGIN:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Domain origin is forbidden from instantiating fio.js"
  //       // })
  //       console.log("Domain origin is forbidden from instantiating fio.js");
  //       break;
  //     case fioErrCode.FORBIDDDEN_COUNTRY:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
  //       // })
  //       console.log(
  //         "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
  //       );
  //       break;
  //     case fioErrCode.SESSION_IN_PROGRESS:
  //       // dispatch({
  //       //   type: GLOBALTYPES.ALERT,
  //       //   error: "Another authentication or enrollment session is in progress"
  //       // })
  //       console.log(
  //         "Another authentication or enrollment session is in progress"
  //       );
  //       break;
  //     case fioErrCode.NETWORK_IO:
  //     default:
  //       console.log(
  //         "Error while establishing network connection with the target FACEIO processing node"
  //       );
  //       break;
  //   }
   };

  return (
    <>
    <ToastContainer/>
    <div className="face-authentication-by-trungquandev flex fdc jcfc aic">
      <h1>ĐĂNG KÍ & ĐĂNG NHẬP KHUÔN MẶT CỦA BẠN</h1>
      <button className="action face-registration" onClick={faceRegistration} style={{backgroundColor:"#E0A800"}}>
        ĐĂNG KÍ KHUÔN MẶT
      </button>
      <button className="action face-sign-in" onClick={faceSignIn}>
        ĐĂNG NHẬP
      </button>

      <div className="trungquandev-author">
        <div className="flex aic gap-10 mb-7 author">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-account-icon-80-80.png"
          />
          <span className="basis-20">Author:</span>
          <div className="basis-70">Manh Cuong & Ngoc Huy</div>
        </div>
        <div className="flex aic gap-10 mb-7 blog">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2021/05/logo-trungquandev-transparent-bg-192x192-1.png"
          />
          <span className="basis-20">Class:</span>
          <div className="basis-70">
            <a
              href="https://trungquandev.com"
              target="_blank"
              rel="noopener noreferrer"
            >
             19IT2
            </a>
          </div>
        </div>
        <div className="flex aic gap-10 mb-7 cv">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-resume-icon-80-80.png"
          />
          <span className="basis-20">ID:</span>
          <div className="basis-70">
            <a
              href="https://cv.trungquandev.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              19IT067 & 19IT084
            </a>
          </div>
        </div>
        <div className="flex aic gap-10 mb-7 youtube">
          {/* <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-youtube-icon-96-96.png"
          /> */}
          {/* <span className="basis-20">YouTube:</span> */}
          {/* <div className="basis-70">
            <a
              href="https://www.youtube.com/c/TrungquandevOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trungquandev Official
            </a>
          </div> */}
        </div>
        {/* <div className="flex aic gap-10 mb-7 facebook">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-facebook-icon-96-96.png"
          />
          <span className="basis-20">Facebook:</span>
          <div className="basis-70">
            <a
              href="https://facebook.com/trungquandev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trung Quân Dev
            </a>
          </div>
        </div> */}
        <div className="flex aic gap-10 mb-7 refer-link">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-link-icon-94-94.png"
          />
          <span className="basis-20">FaceIO:</span>
          <div className="basis-70">
            <a
              href="https://faceio.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://faceio.net
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default FaceIO;
