import React, { useContext } from "react";
import { postsContext } from "../../contexts/postsContext";
import Loading from "./../loading/Loading";
import ShowDiary from "./ShowDiary";
import EmptyDiary from "./EmptyDiary";
import AddDiary from "./AddDiary";
const Diary = () => {
  const {
    dataPosts: { isLoading, data },
  } = useContext(postsContext);
  if (isLoading) {
    return <Loading />;
  }
  const body =
    data.posts.length !== 0 ? <ShowDiary posts={data.posts} /> : <EmptyDiary />;
  return (
    <div className="diary">
      <h2 className="diary_header">Nhật ký của bạn</h2>
      {body}
      {/* <AddDiary /> */}
    </div>
  );
};

export default Diary;
