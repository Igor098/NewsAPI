import style from "./style.module.scss";

export const RegisterForm = () => {
    return (
        <form className={style.registerForm}>
            <h1 className={style.title}>Регистрация</h1>
            <label className={style.formField}>
                Имя пользователя
                <input
                    className={style.formInput}
                    type={"text"}
                    name={"username"}/>
            </label>

            <label className={style.formField}>
                Введите Email
                <input
                    className={style.formInput}
                    type={"email"}
                    name={"email"}/>
            </label>

            <label className={style.formField}>
                Введите пароль
                <input
                    className={style.formInput}
                    type={"password"}
                    name={"password"}/>
            </label>

            <label className={style.formField}>
                Подтвердите пароль
                <input
                    className={style.formInput}
                    type={"password"}
                    name={"confirmPassword"}/>
            </label>

            <button className={style.buttonSubmit} type={"submit"}>Зарегистрироваться</button>

        </form>
    )
}