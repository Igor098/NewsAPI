import { RegisterForm } from "../../../features/RegisterForm";
import style from "./style.module.scss";

export const RegisterPage = () => {
    return (
        <section>
            <div className={style.container}>
                <RegisterForm />
            </div>

        </section>
    )
}