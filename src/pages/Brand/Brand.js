import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import BrandItem from "./BrandItem/BrandItem";

import classNames from "classnames/bind";
import styles from "./Brand.module.scss";

const cx = classNames.bind(styles);

function Brand() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("brand")}>
      <Row xl={10} className={cx("brand-header")}>
        <Col>
          <p className={cx("brand-lable")}>Brand</p>
        </Col>
        <Col xl={2}>
          <Button
            className={cx("brand-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add brand
          </Button>
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
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("brand-table")}>
          <thead className={cx("brand-table-header")}>
            <tr>
              <th>BrandID</th>
              <th>Brand logo</th>
              <th>Brand name</th>
              <th>Brand description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("brand-table-body")}>
            <BrandItem
              brandID="#0001"
              brandLogo="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/logo1.png?1564585558451"
              brandName="Góc bé trai"
              brandDesc=""
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Brand;
