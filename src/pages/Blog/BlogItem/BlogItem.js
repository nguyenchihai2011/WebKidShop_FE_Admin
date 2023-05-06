import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./BlogItem.module.scss";

const cx = classNames.bind(styles);

function BlogItem(props) {
  const { blogID, title, content, date, image } = props;
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{blogID}</td>

      <td>{title}</td>
      <td>{content}</td>
      <td>{date.toDateString()}</td>
      <td>
        <img src={image} alt="" />
      </td>

      <td>
        <button className={cx("blog-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("blog-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className={cx("blog-form-group")}
              controlId="exampleForm.ControlInput1"
            >
              <p className={cx("blog-form-row")}>
                <Form.Label column xs={3}>
                  Title
                </Form.Label>
                <Col xs={9}>
                  <Form.Control type="text" className={cx("blog-form-input")} />
                </Col>
              </p>
              <p className={cx("blog-form-row")}>
                <Form.Label column xs={3}>
                  Content
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={cx("blog-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("blog-form-row")}>
                <Form.Label column xs={3}>
                  Date
                </Form.Label>
                <Col xs={9} className={cx("blog-form-col")}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Col>
              </p>
              <p className={cx("blog-form-row")}>
                <Form.Label column xs={3}>
                  Image
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="http://www.example.com"
                    className={cx("blog-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("blog-form-row")}>
                <Form.Label column xs={3} className={cx("blog-form-lable")}>
                  hoặc
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                    }}
                    className={cx("blog-form-input")}
                  />
                </Col>
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("blog-form-btn")}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={cx("blog-form-btn")}
              onClick={handleClose}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button className={cx("blog-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default BlogItem;
