import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import PromotionItem from "./PromotionItem/PromotionItem";

import classNames from "classnames/bind";
import styles from "./Promotion.module.scss";

const cx = classNames.bind(styles);

function Promotion() {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(typeof startDate);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("promotion")}>
      <Row xl={10} className={cx("promotion-header")}>
        <Col>
          <p className={cx("promotion-lable")}>Promotion</p>
        </Col>
        <Col xl={2}>
          <Button
            className={cx("promotion-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add promotion
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group
                as={Row}
                className={cx("promotion-form-group")}
                controlId="exampleForm.ControlInput1"
              >
                <p className={cx("promotion-form-row")}>
                  <Form.Label column xs={3}>
                    Day Start
                  </Form.Label>
                  <Col xs={9} className={cx("promotion-form-col")}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Col>
                </p>
                <p className={cx("promotion-form-row")}>
                  <Form.Label column xs={3}>
                    Day End
                  </Form.Label>
                  <Col xs={9} className={cx("promotion-form-col")}>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </Col>
                </p>
                <p className={cx("promotion-form-row")}>
                  <Form.Label column xs={3}>
                    Discount
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      className={cx("promotion-form-input")}
                    />
                  </Col>
                </p>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className={cx("promotion-form-btn")}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className={cx("promotion-form-btn")}
                onClick={handleClose}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("promotion-table")}>
          <thead className={cx("promotion-table-header")}>
            <tr>
              <th>PromotionID</th>
              <th>Day Start</th>
              <th>Day End</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("promotion-table-body")}>
            <PromotionItem
              promotionID="#0001"
              dayStart={startDate}
              dayEnd={endDate}
              discount="50%"
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Promotion;
