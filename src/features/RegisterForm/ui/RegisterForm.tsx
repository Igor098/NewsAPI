import style from "./style.module.scss";
import {FormEvent, useEffect, useRef, useState} from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

export const RegisterForm = () => {

    const userRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirm, setConfirm] = useState("");
    const [validConfirm, setValidConfirm] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const onClick = (e: FormEvent) => {
        e.preventDefault();
        console.log(`${name}, ${email}, ${password}, ${confirm}`);
    }

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirm(password === confirm)
    }, [confirm, password]);

    return (
        <form className={style.registerForm} onSubmit={onClick}>
            <h1 className={style.title}>Регистрация</h1>
            <div className={style.formField}>
                <label className={style.formLabel}>
                    Имя пользователя
                    <input
                        ref={userRef}
                        className={style.formInput}
                        type={"text"}
                        name={"username"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        required
                        aria-invalid={validName}
                        aria-describedby="nameHelp"
                    />
                </label>
                <p
                    id="nameHelp"
                    className={
                        name && !nameFocus && name && !validName ? style.instructions : style.offscreen
                    }
                >
                    4 to 24 characters.
                    <br/>
                    Must begin with a letter.
                    <br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>

            <div className={style.formField}>
                <label className={style.formLabel}>
                    Введите Email
                    <input
                        className={style.formInput}
                        type={"email"}
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        required
                        aria-invalid={validEmail}
                        aria-describedby="helpEmail"
                    />
                </label>
                <p
                    id="helpEmail"
                    className={
                        email && !emailFocus && !validEmail ? style.instructions : style.offscreen
                    }
                >
                    8+ characters.
                    <br/>
                    Must begin with a letter.
                    <br/>
                    Need special character:{' '}
                    <span aria-label="at">@</span>{' '}
                </p>
            </div>

            <div className={style.formField}>
                <label className={style.formLabel}>
                    Введите пароль
                    <input
                        className={style.formInput}
                        type={"password"}
                        name={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required
                        aria-invalid={validPassword}
                        aria-describedby="helpPassword"
                    />
                </label>
                <p
                    id="helpPassword"
                    className={
                        password && !passwordFocus && !validPassword ? style.instructions : style.offscreen
                    }
                >
                    8 to 24 characters.
                    <br/>
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br/>
                    Allowed special characters:{' '}
                    <span aria-label="exclamation mark">!</span>{' '}
                    <span aria-label="at symbol">@</span>{' '}
                    <span aria-label="hashtag">#</span>{' '}
                    <span aria-label="dollar sign">$</span>{' '}
                    <span aria-label="percent">%</span>
                    <span aria-label="underline">_</span>
                </p>
            </div>

            <div className={style.formField}>
                <label className={style.formLabel}>
                    Подтвердите пароль
                    <input
                        className={style.formInput}
                        type={"password"}
                        name={"confirmPassword"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        onFocus={() => setConfirmFocus(true)}
                        onBlur={() => setConfirmFocus(false)}
                        required
                        aria-invalid={validConfirm}
                        aria-describedby="helpConfirm"
                    />
                </label>
                <p
                    id="helpConfirm"
                    className={
                        confirm && !confirmFocus && !validConfirm ? style.instructions : style.offscreen
                    }
                >
                    Must match the first password input field.
                </p>
            </div>

            <button className={style.buttonSubmit} type={"submit"}>Зарегистрироваться</button>

        </form>
    )
}