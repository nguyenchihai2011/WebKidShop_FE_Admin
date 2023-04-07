import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
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
import styles from "./PromotionItem.module.scss";

const cx = classNames.bind(styles);

function PromotionItem(props) {
  const { promotionID, dayStart, dayEnd, discount } = props;
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{promotionID}</td>

      <td>{dayStart.toDateString()}</td>
      <td>{dayEnd.toDateString()}</td>
      <td>{discount}</td>

      <td>
        <button className={cx("promotion-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("promotion-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
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
                    selected={startDate}
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
        <button className={cx("promotion-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default PromotionItem;
