import React, { useState, useContext } from "react";
import { GiCrucifix as FixPostsIcon } from "react-icons/gi";
import { BiX as IconClose } from "react-icons/bi";
import { Form } from "react-bootstrap";
import DeleteDiary from "./DeleteDiary";
import { postsContext } from "../../contexts/postsContext";
import { displayContext } from './../../contexts/displayContext';
import "./diary.css";

const ShowAndFixSingleDiary = ({ posts }) => {
  const [isShowFixPost, setIsShowFixPost] = useState({
    status: false,
    fixTitle: "",
    fixDescription: "",
    _id: null
  });
  const { status, fixTitle, fixDescription, _id} = isShowFixPost;
  const { putSinglePost, getAllMyPosts } = useContext(postsContext);
  const { theme } = useContext(displayContext);
  const styleBackgroundChild = { background: theme.isDark ? theme.dark.component.backgroundChild : theme.light.component.backgroundChild};
  let formFixPost;

  const onChangeValueForm = (e) => {
    setIsShowFixPost({
      ...isShowFixPost,
      [e.target.name]: e.target.value
    })   
  }
  const onSubmitFormFixSingleDiary = async (e) => {
    e.preventDefault();
    try {
      const res = await putSinglePost({title: fixTitle, description: fixDescription, _id});
      if (res.success) {
        await getAllMyPosts();
        setIsShowFixPost({
          ...isShowFixPost,
          status: false,
          fixTitle: "",
          fixDescription: "",
          _id: null
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (status) {
    formFixPost = (
      <div className="Form-addDiary" style={styleBackgroundChild}>
        <h3>Sửa nhật ký</h3>
        <Form className="addDiaryForm" onSubmit={onSubmitFormFixSingleDiary} >
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Title</label>
            <input
              className="input-addDiary"
              type="text"
              placeholder="title"
              name="fixTitle"
              value={fixTitle}
              onChange={onChangeValueForm}
            />
          </Form.Group>
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Description</label>
            <textarea
              className="input-addDiary textarea-addDiary"
              type="textarea"
              placeholder="description"
              name="fixDescription"
              value={fixDescription}
              onChange={onChangeValueForm}
            />
          </Form.Group>
          <button className="add-diary-button" type="submit">
            Add diary
          </button>
        </Form>
        <IconClose
          className="closeModalAddDiary"
          onClick={() => {
            setIsShowFixPost({ ...isShowFixPost, status: false });
          }}
        />
      </div>
    );
  }
  return (
    <>
      {status && (
        <div
          className={ theme.isDark ? "overlay-true": "overlay-false"}
          onClick={() => {
            setIsShowFixPost({ ...isShowFixPost, status: false });
          }}
        />
      )}
      <ul className="showDiary_list">
        {posts.map((post) => {
          return (
            <li style={styleBackgroundChild} className="showDiary_item" key={post._id}>
              <div className="showDiary-icons">
                <span className={ theme.isDark ? "showDiary-icon-true" : "showDiary-icon-false" }>
                  <DeleteDiary _id={post._id}/>
                </span>
                <span className={ theme.isDark ? "showDiary-icon-true" : "showDiary-icon-false" }>
                  <FixPostsIcon
                    onClick={() => {
                      setIsShowFixPost({
                        ...isShowFixPost,
                        status: true,
                        fixTitle: post.title,
                        fixDescription: post.description,
                        _id: post._id
                      });
                    }}
                  />
                </span>
              </div>

              <div className="showDiary_item-title">{post.title}</div>
              <div className="showDiary_item-desc">{post.description}</div>
            </li>
          );
        })}
      </ul>
      {formFixPost}
    </>
  );
};

export default ShowAndFixSingleDiary;
