import style from "./style.module.scss";
import { useState } from "react";
import {IDropdownProps} from "../../../types/types.ts";

export const Dropdown = ({mainText, elementsList, activeElement, onClickElement}: IDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = () => {
        setIsOpen((prevState) => !prevState);
    }

    return (
        <div className="dropdown">
            <button className={style.dropdownToggle} onClick={openDropdown}>{mainText}</button>

            <div className={`${style.dropdownMenu} ${isOpen ? style.open : ""}`}>
                {
                    elementsList && elementsList.map((category) => (
                        <button key={category.name}
                                className={`${style.dropdownItem} ${activeElement.includes(category.name) ? style.active : ""}`}
                                onClick={onClickElement}
                        >{category.name}</button>
                    ))
                }
            </div>

        </div>
    )
}