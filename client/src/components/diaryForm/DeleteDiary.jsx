import { postsContext } from "contexts/postsContext";
import React, { useContext } from "react";
import { BsFillTrashFill as TrashCanIcon } from "react-icons/bs";

const DeleteDiary = ({_id}) => {
  const { deleteSinglePost, getAllMyPosts } = useContext(postsContext);
  const deleteDiary = async () => {
      try {
          const res = await deleteSinglePost(_id);
          if (res.success) {
            await getAllMyPosts(); 
          }
      } catch (error) {
          console.log(error.message);
      }
  }
  return <><TrashCanIcon onClick={deleteDiary}/></>;
};

export default DeleteDiary;
