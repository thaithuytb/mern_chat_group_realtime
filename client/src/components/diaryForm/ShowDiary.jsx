import React from "react";
import { BsFillTrashFill as TrashCanIcon } from "react-icons/bs";
import { GiCrucifix as FixPostsIcon } from "react-icons/gi";
import "./diary.css";

const ShowDiary = ({ posts, user}) => {
  console.log(user._id);
  return (
    <ul className="showDiary_list">
      {posts.map((post) => {
        return (
          <li className="showDiary_item" key={post._id}>
            <div className="showDiary-icons">
              <span>
                <TrashCanIcon />
              </span>
              <span>
                <FixPostsIcon />
              </span>
            </div>

            <div className="showDiary_item-title">{post.title}</div>
            <div className="showDiary_item-desc">{post.description}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default ShowDiary;
