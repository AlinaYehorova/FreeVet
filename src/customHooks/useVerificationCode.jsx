import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const useVerificationCode = (initialSeconds = 90) => {
  const { handleSubmit, control, setValue, watch, reset } = useForm();
  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef(null));
  const [isFormValid, setIsFormValid] = useState(false);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorTimer, setErrorTimer] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const watchAllFields = watch();

  const fetchVerificationCode = async () => {
    try {
      const response = await axios.get("/api/verification-code"); // Заменить на реальный API
      setVerificationCode(response.data.code);
    } catch (error) {
      console.error("Error fetching verification code:", error);
    }
  };

  useEffect(() => {
    fetchVerificationCode();
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(watchAllFields).every((val) => val && val.length === 1);
    setIsFormValid(allFieldsFilled);
  }, [watchAllFields]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendAvailable(true);
    }
  }, [seconds]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length === 1) {
      setValue(`digit${index}`, value);
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (value === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (e.target.value === "") {
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
      } else {
        setValue(`digit${index}`, "");
      }
    }
  };

  const handleResendCode = async () => {
    setSeconds(initialSeconds);
    setResendAvailable(false);
    await fetchVerificationCode();
  };

  const validateCode = (code) => {
    // поменять "123456" на verificationCode
    if (code !== "123456") {
      setCodeError(true);
      setErrorVisible(true);
      if (errorTimer) {
        clearTimeout(errorTimer);
      }
      const newTimer = setTimeout(() => setErrorVisible(false), 5000);
      setErrorTimer(newTimer);
      reset();
      setIsFormValid(false);
      inputRefs[0].current.focus();
      return false;
    } else {
      setCodeError(false);
      return true;
    }
  };

  return {
    control,
    setValue,
    handleSubmit,
    inputRefs,
    isFormValid,
    seconds,
    resendAvailable,
    codeError,
    errorVisible,
    handleInputChange,
    handleKeyDown,
    handleResendCode,
    validateCode,
  };
};

export default useVerificationCode;
