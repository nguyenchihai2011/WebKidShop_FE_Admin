import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import ProductTypeItem from "./ProductTypeItem/ProductTypeItem";

import classNames from "classnames/bind";
import styles from "./ProductType.module.scss";

const cx = classNames.bind(styles);

function ProductType() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("producttype")}>
      <Row xl={10} className={cx("producttype-header")}>
        <Col>
          <p className={cx("producttype-lable")}>Product-type</p>
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
                onClick={handleClose}
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
            <ProductTypeItem
              producttypeID="#0001"
              producttypeName="Váy"
              producttypeDesc=""
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default ProductType;
