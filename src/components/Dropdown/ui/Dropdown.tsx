import style from "../../Header/ui/style.module.scss";
import { useState } from "react";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = () => {
        setIsOpen((prevState) => !prevState);
    }

    return (
        <div className="dropdown">
            <button className={`${style.dropdownToggle} btn-reset`} onClick={openDropdown}>Группировка: по имени</button>

            <div className={`${style.dropdownMenu} ${isOpen ? style.open : ""}`}>
                <button className={`${style.dropdownItem} btnReset`} data-group="name">имя</button>
                <button className={`${style.dropdownItem} btnReset`} data-group="date">дата</button>
            </div>

        </div>
    )
}