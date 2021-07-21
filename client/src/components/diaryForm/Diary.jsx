import React, { useContext, useEffect } from "react";
import { postsContext } from "../../contexts/postsContext";
import { authContext } from "./../../contexts/authContext";
import { displayContext } from "./../../contexts/displayContext";
import Loading from "../loading/Loading";
import ShowAndFixSingleDiary from "./ShowAndFixSingleDiary";
import EmptyDiary from "./EmptyDiary";
import AddDiary from "./AddDiary";
const Diary = () => {
  const {
    authState: { user },
  } = useContext(authContext);
  const {
    dataPosts: { isLoading, posts },
    getAllMyPosts,
  } = useContext(postsContext);
  const { setIsShowChangeInfo, showDetail, setShowDetail } =
    useContext(displayContext);
  useEffect(() => getAllMyPosts(), []);
  let body;
  if (isLoading) {
    body = <Loading />;
  } else if (posts.length === 0) {
    body = <EmptyDiary />;
  } else {
    body = <ShowAndFixSingleDiary posts={posts} user={user} />;
  }
  return (
    <div
      className="diary"
      onClick={() => {
        setIsShowChangeInfo(false);
        showDetail !== 0 && setShowDetail(0);
      }}
    >
      <h2 className="diary_header">Nhật ký của bạn</h2>
      {body}
      <AddDiary />
    </div>
  );
};

export default Diary;
