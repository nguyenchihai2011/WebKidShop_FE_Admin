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
import styles from "./ProductTypeItem.module.scss";

const cx = classNames.bind(styles);

function ProductTypeItem(props) {
  const { producttypeID, producttypeName, producttypeDesc } = props;
  const [show, setShow] = useState(false);
  const [producttype, setProducttype] = useState({
    name: producttypeName,
    description: producttypeDesc,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setProducttype({ ...producttype, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8080/api/producttype/${producttypeID}`,
        producttype
      )
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in UpdateProducttypeInfo!");
      });
  };

  const onDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8080/api/producttype/${producttypeID}`)
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in DeleteProducttypeInfo!");
      });
  };
  return (
    <tr>
      <td>{producttypeID}</td>
      <td>{producttypeName}</td>
      <td>{producttypeDesc}</td>

      <td>
        <button className={cx("producttype-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("producttype-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Producttype</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className={cx("producttype-form-group")}
              controlId="exampleForm.ControlInput1"
            >
              <p className={cx("producttype-form-row")}>
                <Form.Label column xs={3}>
                  Name
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={producttype.name}
                    onChange={onChange}
                    className={cx("producttype-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("producttype-form-row")}>
                <Form.Label column xs={3}>
                  Description
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={producttype.description}
                    onChange={onChange}
                    className={cx("producttype-form-input")}
                  />
                </Col>
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("producttype-form-btn")}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={cx("producttype-form-btn")}
              onClick={onSubmit}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button className={cx("producttype-body-action")} onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default ProductTypeItem;
