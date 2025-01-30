import style from "../../SignPage/ui/style.module.scss";
import { SignForm } from "../../../features/SignForm";

export const SignPage = () => {
    return (
        <section>
            <div className={style.container}>
                <SignForm />
            </div>

        </section>
    )
}