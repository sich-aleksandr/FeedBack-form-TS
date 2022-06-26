import React, { useState, useEffect } from "react";
import { useInput } from "./Custom/useInput";
import { LOAD_STATUSES } from "./constants";
import { Spinner } from "./spinner/spinner";
import "./Form.scss";

interface data {
  name: string;
  email: string;
  phone: string;
  dateBith: string;
  massage: string;
}

export const Form = () => {
  const name = useInput("", { isEmpty: true, isName: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const phone = useInput("", { isEmpty: true, isPhone: true });
  const dateBith = useInput("", { isEmpty: true, isDate: true });
  const massage = useInput("", {
    isEmpty: true,
    minLenght: 10,
    maxLenght: 300,
    isMassage: true,
  });

  const [formSended, setFormSended] = useState(LOAD_STATUSES.UNKNOWN);

  useEffect(() => {
    if (formSended === LOAD_STATUSES.LOADED) {
        name.onClean();
        email.onClean();
        phone.onClean();
        dateBith.onClean();
        massage.onClean();
      setTimeout(() => setFormSended(LOAD_STATUSES.UNKNOWN), 3000);
    }
  }, [formSended]);

  const postDataHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      dateBith: dateBith.value,
      massage: massage.value,
    };

    postForm(data);
  };

  const postForm = (formData: data) => {
    setFormSended(LOAD_STATUSES.LOADING);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch("https://62b82a7af4cb8d63df598cb9.mockapi.io/form/", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (response.status === 201) {
          setFormSended(LOAD_STATUSES.LOADED);
        }

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          setFormSended(LOAD_STATUSES.ERROR);
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        setFormSended(LOAD_STATUSES.ERROR);
      });
  };

  return (
    <>
      <form className="form">
        <span className="form__title">Форма обратной связи</span>
        <span className="form__subhead">Пожалуйста заполните все поля</span>
        <div className="input-container">
          <input
            type="text"
            id="login"
            onChange={name.onChange}
            onBlur={name.onBlure}
            value={name.value.toUpperCase()}
          />
          <label
            className={
              !name.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="login"
          >
            Имя и Фамилия
          </label>

          {name.isDirty && name.isEmpty && (
            <div className="form__allert">Имя не должно быть пустым</div>
          )}
          {name.isDirty && name.nameError && (
            <div className="form__allert">Ошибка при написании имени</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="email"
            id="email"
            onChange={email.onChange}
            onBlur={email.onBlure}
            value={email.value}
          />
          <label
            className={
              !email.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="email"
          >
            Email
          </label>
          {email.isDirty && email.isEmpty && (
            <div className="form__allert">Емайл не может быть пустым</div>
          )}
          {email.isDirty && email.emailError && (
            <div className="form__allert">Не правильный Email</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="tel"
            id="tel"
            onChange={phone.onChange}
            onBlur={phone.onBlure}
            value={phone.value}
          />

          <label
            className={
              !phone.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="tel"
          >
            Телефон: +7(888)-888-88-88
          </label>

          {phone.isDirty && phone.isEmpty && (
            <div className="form__allert">
              Поле c телефоном не может быть пустым
            </div>
          )}
          {phone.isDirty && phone.phoneError && (
            <div className="form__allert">Не правильный номер телефона</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="date"
            name="calendar"
            onBlur={dateBith.onBlure}
            onChange={dateBith.onChange}
            value={dateBith.value}
          />
          <label
            className={
              !dateBith.isDirty
                ? "input-label input-label-date"
                : "input-label input-label-pass"
            }
            htmlFor="bday"
          >
            Дата рождения
          </label>
        </div>
        {dateBith.isDirty && dateBith.isEmpty && (
          <div className="form__allert">
            Поле c датой рождения не может быть пустым
          </div>
        )}
        {dateBith.isDirty && dateBith.dateError && (
          <div className="form__allert">Не верная дата рождения</div>
        )}
        <div className="input-container">
          <textarea
            id="message"
            name="message"
            cols={40}
            rows={3}
            onChange={massage.onChangeArea}
            onBlur={massage.onBlureArea}
            value={massage.value}
          />
          <label
            className={
              !massage.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="message"
          >
            Сообщение
          </label>
          {massage.isDirty && massage.isEmpty && (
            <div className="form__allert">
              Поле c сообщением не может быть пустым
            </div>
          )}
          {massage.isDirty && massage.minLenghtError && (
            <div className="form__allert">Слишком коротко</div>
          )}
          {massage.isDirty && massage.maxLenghtError && (
            <div className="form__allert">Слишком длинно</div>
          )}
        </div>
        <div className="button-container">
          <button
            className="btn"
            disabled={
              !email.inputValid ||
              !name.inputValid ||
              !phone.inputValid ||
              !massage.inputValid ||
              !dateBith.inputValid ||
              formSended === LOAD_STATUSES.LOADING
            }
            onClick={(e) => postDataHandler(e)}
          >
            Отправить
          </button>
          {formSended === LOAD_STATUSES.LOADING && <Spinner />}
        </div>

        {formSended === LOAD_STATUSES.ERROR && (
          <div className="form__massage form__massage-error">
            {LOAD_STATUSES.ERROR}
          </div>
        )}
        {formSended === LOAD_STATUSES.LOADED && (
          <div className="form__massage">{LOAD_STATUSES.LOADED}</div>
        )}
      </form>
    </>
  );
};
