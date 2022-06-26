import { useEffect, useState } from "react";

export interface validations {
  isEmpty: boolean;
  minLenght?: any;
  maxLenght?: any;
  isEmail?: boolean;
  isName?: boolean;
  isPhone?: boolean;
  isDate?: boolean;
  isMassage?: boolean;
}

export const useValidation = (value: string, validations: validations) => {
  const [isEmpty, setEmpry] = useState(true);
  const [minLenghtError, setMinLenghtError] = useState(false);
  const [maxLenghtError, setMaxLenghtError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [massageError, setMassageError] = useState(false);
  const [inputValid, setinputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLenght":
          value.length < validations[validation]
            ? setMinLenghtError(true)
            : setMinLenghtError(false);
          break;
        case "isEmpty":
          value ? setEmpry(false) : setEmpry(true);
          break;
        case "maxLenght":
          value.length > validations[validation]
            ? setMaxLenghtError(true)
            : setMaxLenghtError(false);
          break;
        case "isEmail":
            const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            reEmail.test(String(value).toLowerCase()) ? setEmailError(false) :setEmailError(true)
          break;
        case "isName":
            const reName = /[a-zA-Z]{3,30} [a-zA-Z]{3,30}$/;
            reName.test(String(value).toLowerCase()) ? setNameError(false) :setNameError(true)
          break;
        case "isPhone":
            const rePhone = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
            rePhone.test(String(value).toLowerCase()) ? setPhoneError(false) :setPhoneError(true)
          break;
        case "isDate":
            const date:number = +value.split("-")[0];
            (date > 1970 && date < 2015 ) ? setDateError(false) :setDateError(true) 
          break;
        case "isMassage":
            (value.length > 10 || value.length < 300 ) ? setMassageError(false) :setMassageError(true)
          break;
      }
    }
  }, [value, validations]);

  useEffect( () => {
    if (isEmpty || maxLenghtError || minLenghtError || emailError || phoneError || massageError || nameError || dateError) {
        setinputValid(false)
    } else {
        setinputValid(true)
    }

  },[isEmpty, maxLenghtError, minLenghtError, emailError, nameError, phoneError, dateError, massageError])

  return {
    isEmpty,
    minLenghtError,
    maxLenghtError,
    emailError,
    nameError,
    phoneError,
    dateError,
    massageError,
    inputValid,
  };
};
