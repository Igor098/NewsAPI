import style from "../../SignForm/ui/style.module.scss";
import {FormEvent, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { loginRequest } from "../../../store/slices/authSlice.ts";
import {ILoginModel} from "../../../types/types.ts";
import {RootDispatch, RootState} from "../../../store/store.ts";
import {useNavigate} from "react-router-dom";

export const SignForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    const errRef = useRef(null);
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch: RootDispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const body: ILoginModel = {
                email: email,
                password: password,
            }
            await dispatch(loginRequest(body)).unwrap();
        }
        catch (e) {
            setErrMsg("Неверный логин или пароль")
            console.error(e)
        }
    }

    return (
        <>
            <form className={style.signForm} onSubmit={handleLogin}>
                <h1 className={style.title}>Вход</h1>

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
                            `${style.formInput}`
                        }
                        type={"email"}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrMsg("");
                        }}
                        required
                    />
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
                            `${style.formInput}`
                        }
                        type={"password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrMsg("");
                        }}
                        required
                    />
                </fieldset>

                <button className={`${style.buttonSubmit} btnReset`} type={"submit"}>Вход</button>

                <p
                    ref={errRef}
                    className={errMsg ? style.errmsg : style.offscreen}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
            </form>
        </>
    )
}