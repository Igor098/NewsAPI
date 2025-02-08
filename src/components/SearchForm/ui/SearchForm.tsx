import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {RootDispatch} from "../../../store/store.ts";
import {searchNews} from "../../../store/slices/news/newsSlice.ts";
import style from "./style.module.scss";


export const SearchForm = () => {
    const dispatch: RootDispatch = useDispatch();

    const [query, setQuery] = useState<string>("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        console.log(query)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query) {
            console.log("Запрос", query)
            dispatch(searchNews(query))
            setQuery("")
        }
        else {
            console.log("Запрос пустой")
        }
    }
    return (
        <form className={style.searchForm} onSubmit={onSubmit}>
            <input
                className={style.searchField}
                type="text"
                placeholder="Поиск"
                value={query}
                onChange={onChange}/>
            <button className={style.searchBtn}>
                <svg className={style.searchBtnImage} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"/>
                </svg>
            </button>
        </form>
    )
}