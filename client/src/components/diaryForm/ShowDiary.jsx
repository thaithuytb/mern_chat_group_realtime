import React from 'react';
import './diary.css';

const ShowDiary = ({posts}) => {
    return (
        <ul className="showDiary_list">
            { posts.map((post)=> {
                return (<li className="showDiary_item" key={post._id}>
                    <div className="showDiary_item-title">{post.title}</div>
                    <div className="showDiary_item-desc">{post.description}</div>
                </li>);
            })}
        </ul>
    )
}

export default ShowDiary;
