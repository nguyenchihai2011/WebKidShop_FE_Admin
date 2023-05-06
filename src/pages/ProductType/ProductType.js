import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import ProductTypeItem from "./ProductTypeItem/ProductTypeItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./ProductType.module.scss";

const cx = classNames.bind(styles);

function ProductType() {
  const [show, setShow] = useState(false);
  const [producttypes, setProducttypes] = useState([]);
  const [producttype, setProducttype] = useState({
    name: "",
    description: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setProducttype({ ...producttype, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/producttype/create", producttype)
      .then((res) => {
        setProducttype({
          name: "",
          description: "",
        });
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in Producttype!");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/producttype")
      .then((res) => {
        setProducttypes(res.data);
      })
      .catch((err) => {
        console.log("Error from Producttypes");
      });
  }, [producttypes]);
  return (
    <div className={cx("producttype")}>
      <Row className={cx("producttype-header")}>
        <Col xl={3}>
          <p className={cx("producttype-lable")}>Product-type</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
        </Col>
        <Col xl={2}>
          <Button
            className={cx("producttype-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add producttype
          </Button>
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
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("producttype-table")}>
          <thead className={cx("producttype-table-header")}>
            <tr>
              <th>ProducttypeID</th>
              <th>Producttype name</th>
              <th>Producttype description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("producttype-table-body")}>
            {producttypes.map((producttype) => {
              return (
                <ProductTypeItem
                  producttypeID={producttype._id}
                  producttypeName={producttype.name}
                  producttypeDesc={producttype.description}
                />
              );
            })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default ProductType;
