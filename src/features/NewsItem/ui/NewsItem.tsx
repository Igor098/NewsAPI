import {INewsItemProps} from "../../../types/types.ts";

export const NewsItem = ({title, description, url}: INewsItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span>{url}</span>
        </div>
    )
}