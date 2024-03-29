import { displayContext } from "contexts/displayContext";
import { postsContext } from "contexts/postsContext";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { BiMessageAdd as Add, BiX as IconClose } from "react-icons/bi";
import "./diary.css";

const AddDiary = () => {
  const [showAddDiary, setShowAddDiary] = useState(false);
  const [valueDiaryForm, setValueDiaryForm ] = useState({
    title: '',
    description: ''
  })

  const { getAllMyPosts, postSinglePost } = useContext(postsContext);
  const { theme } = useContext(displayContext);
  const styleBackgroundChild = { background: theme.isDark ? theme.dark.component.backgroundChild : theme.light.component.backgroundChild};


  const { title, description } = valueDiaryForm;
  const onChangeValueForm = (e) => {
    setValueDiaryForm({
      ...valueDiaryForm,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAddDiary = async (e) => {
    e.preventDefault();
    try {
      const res = await postSinglePost({title, description});
      if (res.success) {
        await getAllMyPosts();
        setShowAddDiary(false);
        setValueDiaryForm({
          title: '',
          description: ''
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  let body;
  const hiddenFormAddDiary = () => setShowAddDiary(false);
  const showFormAddDiary = () => setShowAddDiary(true);

  if (showAddDiary) {
    body = (
      <div className="Form-addDiary" style={styleBackgroundChild}>
        <h3>Thêm nhật ký</h3>
        <Form className="addDiaryForm" onSubmit={submitFormAddDiary}>
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Title</label>
            <input
              className="input-addDiary"
              type="text"
              placeholder="title"
              name="title"
              value={title}
              onChange={onChangeValueForm}
            />
          </Form.Group>
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Description</label>
            <textarea
              className="input-addDiary textarea-addDiary"
              type="textarea"
              placeholder="description"
              name="description"
              value={description}
              onChange={onChangeValueForm}
            />
          </Form.Group>
          <button className="add-diary-button" type='submit'>Add diary</button>
        </Form>
        <IconClose
          className="closeModalAddDiary"
          onClick={hiddenFormAddDiary}
        />
      </div>
    );
  }
  return (
    <>
      {showAddDiary && <div className={theme.isDark ? "overlay-true" : "overlay-false"} onClick={hiddenFormAddDiary} />}
      <span className="addDiary-text">Thêm nhật ký: </span>
      <div className={showAddDiary ? "addDiary-true" : "addDiary-false"} style={styleBackgroundChild}>
        <Add className="addDiary-icon" onClick={showFormAddDiary} />
      </div>
      {body}
    </>
  );
};

export default AddDiary;
