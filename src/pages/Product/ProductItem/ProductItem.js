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
import styles from "./ProductItem.module.scss";

const cx = classNames.bind(styles);

function ProductItem(props) {
  const {
    productID,
    image,
    productName,
    productSize,
    productColor,
    price,
    stock,
    arrivalDate,
  } = props;
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{productID}</td>

      <td>{productName}</td>
      <td>{productSize}</td>
      <td>{productColor}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <img src={image} alt="" />
      </td>
      <td>{arrivalDate}</td>

      <td>
        <button className={cx("product-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("product-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className={cx("product-form-group")}
              controlId="exampleForm.ControlInput1"
            >
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Name
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Size
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Color
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Price
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Stock
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="area"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Description
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Image
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="http://www.example.com"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3} className={cx("product-form-lable")}>
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
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  ArrivalDate
                </Form.Label>
                <Col xs={9} className={cx("product-form-col")}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Brand
                </Form.Label>
                <Col xs={9}>
                  <Form.Select
                    aria-label="Default select example"
                    className={cx("product-form-input")}
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Category
                </Form.Label>
                <Col xs={9}>
                  <Form.Select
                    aria-label="Default select example"
                    className={cx("product-form-input")}
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  ProductType
                </Form.Label>
                <Col xs={9}>
                  <Form.Select
                    aria-label="Default select example"
                    className={cx("product-form-input")}
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Promotion
                </Form.Label>
                <Col xs={9}>
                  <Form.Select
                    aria-label="Default select example"
                    className={cx("product-form-input")}
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={cx("product-form-btn")}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={cx("product-form-btn")}
              onClick={handleClose}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button className={cx("product-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
