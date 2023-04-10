import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ProductItem from "./ProductItem/ProductItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("product")}>
      <Row className={cx("product-header")}>
        <Col xl={3}>
          <p className={cx("product-lable")}>Product</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
        </Col>
        <Col xl={2}>
          <Button
            className={cx("product-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add product
          </Button>
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
                  <Form.Label
                    column
                    xs={3}
                    className={cx("product-form-lable")}
                  >
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
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("product-table")}>
          <thead className={cx("product-table-header")}>
            <tr>
              <th>ProductID</th>

              <th>Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>ArrivalDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("product-table-body")}>
            <ProductItem
              productID="#0001"
              productName="Góc bé trai"
              productSize=""
              productColor=""
              price=""
              stock=""
              image="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/logo1.png?1564585558451"
              arrivalDate=""
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Product;
