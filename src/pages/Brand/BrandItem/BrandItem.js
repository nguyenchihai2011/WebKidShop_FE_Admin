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

import classNames from "classnames/bind";
import styles from "./BrandItem.module.scss";

const cx = classNames.bind(styles);

function BrandItem(props) {
  const { brandID, brandLogo, brandName, brandDesc } = props;
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{brandID}</td>
      <td>
        <img src={brandLogo} alt="" />
      </td>
      <td>{brandName}</td>
      <td>{brandDesc}</td>

      <td>
        <button className={cx("brand-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("brand-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className={cx("brand-form-group")}
              controlId="exampleForm.ControlInput1"
            >
              <p className={cx("brand-form-row")}>
                <Form.Label column xs={3}>
                  Logo
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="http://www.example.com"
                    className={cx("brand-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("brand-form-row")}>
                <Form.Label column xs={3} className={cx("brand-form-lable")}>
                  hoặc
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                    className={cx("brand-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("brand-form-row")}>
                <Form.Label column xs={3}>
                  Name
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    className={cx("brand-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("brand-form-row")}>
                <Form.Label column xs={3}>
                  Description
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={cx("brand-form-input")}
                  />
                </Col>
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("brand-form-btn")}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={cx("brand-form-btn")}
              onClick={handleClose}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button className={cx("brand-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default BrandItem;
