import style from "../../SignForm/ui/style.module.scss";
import {FormEvent, useState} from "react";

export const SignForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClick = (e: FormEvent) => {
        e.preventDefault();
        console.log(`Вход выполнен`);
    }

    return (
        <form className={style.signForm} onSubmit={onClick}>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </fieldset>

            <button className={`${style.buttonSubmit} btnReset`} type={"submit"}>Вход</button>

        </form>
    )
}