import {INewsItemState} from "../../../types/types.ts";
import {addNews} from "../../../store/slices/favouritesSlice.ts";
import {RootDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";

export const NewsItem = ({title, description, url, content, source, image, publishedAt}: INewsItemState) => {
    const dispatch: RootDispatch = useDispatch();
    const onClick = () => {
        dispatch(addNews({title, description, url, content, source, image, publishedAt}));
    }

    return (
        <div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            <span>{url}</span>
            <button className="addFavourite" onClick={onClick}>Добавить</button>
        </div>
    )
}