import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {RootDispatch} from "../../../store/store.ts";
import {searchNews} from "../../../store/slices/news/newsSlice.ts";


export const SearchForm = () => {
    const dispatch: RootDispatch = useDispatch();

    const [query, setQuery] = useState<string | null>("");
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
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Поиск"
                onChange={onChange}/>
            <button className="searchBtn">Поиск</button>
        </form>
    )
}