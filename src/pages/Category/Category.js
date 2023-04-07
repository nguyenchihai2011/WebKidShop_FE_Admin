import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CategoryItem from "./CategoryItem/CategoryItem";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("category")}>
      <Row className={cx("category-header")}>
        <Col xl={10}>
          <p className={cx("category-lable")}>Category</p>
        </Col>
        <Col xl={2}>
          <Button
            className={cx("category-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add category
          </Button>
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
                onClick={handleClose}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("category-table")}>
          <thead className={cx("category-table-header")}>
            <tr>
              <th>CategoryID</th>
              <th>Category name</th>
              <th>Category description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("category-table-body")}>
            <CategoryItem
              categoryID="#0001"
              categoryName="Góc bé trai"
              categoryDesc=""
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Category;
