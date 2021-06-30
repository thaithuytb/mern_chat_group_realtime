import React, { useState } from "react";
import { BiMessageAdd as Add } from "react-icons/bi";
import { Form } from "react-bootstrap";
import { BiX as IconClose } from "react-icons/bi";
import "./diary.css";

const AddDiary = () => {
  const [showAddDiary, setShowAddDiary] = useState(false);

  let body;
  const hiddenFormAddDiary = () => setShowAddDiary(false);
  const showFormAddDiary = () => setShowAddDiary(true);

  if (showAddDiary) {
    body = (
      <div className="Form-addDiary">
        <h3>Thêm nhật ký</h3>
        <Form className="addDiaryForm">
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Title</label>
            <input
              className="input-addDiary"
              type="text"
              placeholder="title"
              name="title"
            />
          </Form.Group>
          <Form.Group className="formGroup-addDiary">
            <label className="laybel-addDiary">Description</label>
            <textarea
              className="input-addDiary textarea-addDiary"
              type="textarea"
              placeholder="description"
              name="description"
            />
          </Form.Group>
          <button className="add-diary-button">Add diary</button>
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
      {showAddDiary && <div className="blur" onClick={hiddenFormAddDiary} />}
      <span className="addDiary-text">Thêm nhật ký: </span>
      <div className="addDiary">
        <Add className="addDiary-icon" onClick={showFormAddDiary} />
      </div>
      {body}
    </>
  );
};

export default AddDiary;
