import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import classNames from "classnames/bind";
import styles from "./CategoryItem.module.scss";

const cx = classNames.bind(styles);

function CategoryItem(props) {
  const { categoryID, categoryName, categoryDesc } = props;
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({
    name: categoryName,
    description: categoryDesc,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/category/${categoryID}`, category)
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in UpdateCategoryInfo!");
      });
  };

  const onDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Do you want to delete?")) {
      axios
        .delete(`http://localhost:8080/api/category/${categoryID}`)
        .then((res) => {
          setShow(false);
        })
        .catch((err) => {
          console.log("Error in DeleteCategoryInfo!");
        });
    }
  };

  return (
    <tr>
      <td>{categoryID}</td>
      <td>{categoryName}</td>
      <td>{categoryDesc}</td>

      <td>
        <button className={cx("category-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("category-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className={cx("category-form-group")}
              controlId="exampleForm.ControlInput1"
            >
              <p className={cx("category-form-row")}>
                <Form.Label column xs={3}>
                  Name
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={onChange}
                    className={cx("category-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("category-form-row")}>
                <Form.Label column xs={3}>
                  Description
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={category.description}
                    onChange={onChange}
                    className={cx("category-form-input")}
                  />
                </Col>
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("category-form-btn")}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={cx("category-form-btn")}
              onClick={onSubmit}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button onClick={onDelete} className={cx("category-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default CategoryItem;
