import style from "./style.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { RootDispatch } from "../../../store/store.ts";
import { registerRequest } from "../../../store/slices/authSlice.ts";
import { IRegisterModel } from "../../../types/types.ts";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_-]).{8,24}$/;

export const RegisterForm = () => {

    // const { error, loading } = useSelector((state: RootState) => state.auth);
    const dispatch: RootDispatch = useDispatch();

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()

        const testUsername = USER_REGEX.test(name);
        const testEmail = EMAIL_REGEX.test(email);
        const testPassword = PWD_REGEX.test(password);
        const testConfirm = password === confirm;

        if (testUsername && testEmail && testPassword && testConfirm) {
            const body: IRegisterModel = {
                username: name,
                email: email,
                password: password,
                confirm_password: confirm,
            }
            dispatch(registerRequest(body))
        }
    }

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
        <form className={style.registerForm} onSubmit={handleRegister}>
            <h1 className={style.title}>Регистрация</h1>
            <fieldset className={style.formField}>
                <label className={
                    `${style.formLabel}
                     ${name && style.active}`
                    }
                >
                    Имя пользователя
                </label>
                <input
                    ref={userRef}
                    className={
                        `${style.formInput} 
                         ${name && !nameFocus && !validName ? style.notValid : ""}`
                    }
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
                <p
                    id="nameHelp"
                    className={
                        name && !nameFocus && name && !validName ? style.instructions : style.offscreen
                    }
                >
                    От 4 до 24 символов. Должен начинаться с буквы.
                </p>
            </fieldset>

            <fieldset className={style.formField}>
                <label className={
                    `${style.formLabel}
                     ${email && style.active}`
                }
                >
                    Введите Email
                </label>
                <input
                    className={
                        `${style.formInput} 
                            ${email && !emailFocus && !validEmail ? style.notValid : ""}`
                    }
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
                <p
                    id="helpEmail"
                    className={
                        email && !emailFocus && !validEmail ? style.instructions : style.offscreen
                    }
                >
                    Не менее 8 символов. Должен начинаться с буквы и содержать спец. символ:{' '}
                    <span aria-label="at">@</span>{' '}
                </p>
            </fieldset>

            <fieldset className={style.formField}>
                <label className={
                    `${style.formLabel}
                     ${password && style.active}`
                }
                >
                    Введите пароль
                </label>
                <input
                    className={
                        `${style.formInput} 
                            ${password && !passwordFocus && !validPassword ? style.notValid : ""}`
                    }
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
                <p
                    id="helpPassword"
                    className={
                        password && !passwordFocus && !validPassword ? style.instructions : style.offscreen
                    }
                >
                    От 8 до 24 символов. Должен содержать заглавную и прописную буквы, цифры и спец. символ.
                    Поддерживаемые спец. символы:{' '}
                    <span aria-label="exclamation mark">!</span>{' '}
                    <span aria-label="at symbol">@</span>{' '}
                    <span aria-label="hashtag">#</span>{' '}
                    <span aria-label="dollar sign">$</span>{' '}
                    <span aria-label="percent">%</span>
                    <span aria-label="underline">_</span>
                    <span aria-label="line">-</span>
                </p>
            </fieldset>

            <fieldset className={style.formField}>
                <label className={
                    `${style.formLabel}
                     ${confirm && style.active}`
                }
                >
                    Подтвердите пароль
                </label>
                <input
                    className={
                        `${style.formInput} 
                            ${confirm && !confirmFocus && !validConfirm ? style.notValid : ""}`
                    }
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
                <p
                    id="helpConfirm"
                    className={
                        confirm && !confirmFocus && !validConfirm ? style.instructions : style.offscreen
                    }
                >
                    Должно совпадать с первым полем ввода пароля.
                </p>
            </fieldset>

            <button className={`${style.buttonSubmit} btnReset`} type={"submit"}>Зарегистрироваться</button>

        </form>
    )
}