import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import BlogItem from "./BlogItem/BlogItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Blog.module.scss";

const cx = classNames.bind(styles);

function Blog() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  console.log(typeof startDate);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("blog")}>
      <Row className={cx("blog-header")}>
        <Col xl={3}>
          <p className={cx("blog-lable")}>Blog</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
        </Col>
        <Col xl={2}>
          <Button
            className={cx("blog-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add blog
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group
                as={Row}
                className={cx("blog-form-group")}
                controlId="exampleForm.ControlInput1"
              >
                <p className={cx("blog-form-row")}>
                  <Form.Label column xs={3}>
                    Title
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      className={cx("blog-form-input")}
                    />
                  </Col>
                </p>
                <p className={cx("blog-form-row")}>
                  <Form.Label column xs={3}>
                    Content
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className={cx("blog-form-input")}
                    />
                  </Col>
                </p>
                <p className={cx("blog-form-row")}>
                  <Form.Label column xs={3}>
                    Date
                  </Form.Label>
                  <Col xs={9} className={cx("blog-form-col")}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Col>
                </p>
                <p className={cx("blog-form-row")}>
                  <Form.Label column xs={3}>
                    Image
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="http://www.example.com"
                      className={cx("blog-form-input")}
                    />
                  </Col>
                </p>
                <p className={cx("blog-form-row")}>
                  <Form.Label column xs={3} className={cx("blog-form-lable")}>
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
                      className={cx("blog-form-input")}
                    />
                  </Col>
                </p>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className={cx("blog-form-btn")}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className={cx("blog-form-btn")}
                onClick={handleClose}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("blog-table")}>
          <thead className={cx("blog-table-header")}>
            <tr>
              <th>BlogID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("blog-table-body")}>
            <BlogItem
              blogID="#0001"
              title=""
              content=""
              date={startDate}
              image={selectedImage}
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Blog;
