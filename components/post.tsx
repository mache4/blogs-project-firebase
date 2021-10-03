import type { NextPage } from 'next';
interface Props {
    name: string,
    content: string,
    author: {
        email: string,
        id: string,
        date: number
    },
    date: number,
    post: () => void,
    user?: () => void
}

const Post: NextPage<Props> = (props) => {
    const fun = (number: number | string) => {
        if (number < 10)
            number = '0' + number;
        return number;
    }

    let date = new Date(props.date);
    let seconds = fun(date.getSeconds());
    let minutes = fun(date.getMinutes());
    let hours = fun(date.getHours());
    let day = fun(date.getDate());
    let month = fun(date.getMonth() + 1);
    let year = fun(date.getFullYear());

    return (
        <div className="post">
            <p className="post__author" onClick={props.user}>{props.author.email}</p>
            <p className="post__name" onClick={props.post}>{props.name}</p>
            <p className="post__content">{props.content.length < 150 ? props.content : props.content.slice(0, 150) + '...'}</p>
            <p className="post__date">{day}.{month}.{year}<span>{hours}:{minutes}:{seconds}</span></p>
        </div>
    );
}

export default Post;