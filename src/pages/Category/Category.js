import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import CategoryItem from "./CategoryItem/CategoryItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

function Category() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/category", category)
      .then((res) => {
        setCategory({
          name: "",
          description: "",
        });
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in Category!");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("Error from CategoryList");
      });
  }, [categories]);

  return (
    <div className={cx("category")}>
      <Row className={cx("category-header")}>
        <Col xl={3}>
          <p className={cx("category-lable")}>Category</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
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
                      name="name"
                      value={category.name}
                      className={cx("category-form-input")}
                      onChange={onChange}
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
                      name="description"
                      value={category.description}
                      className={cx("category-form-input")}
                      onChange={onChange}
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
                onClick={handleSubmit}
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
            {categories.map((category) => {
              return (
                <CategoryItem
                  key={category._id}
                  categoryID={category._id}
                  categoryName={category.name}
                  categoryDesc={category.description}
                />
              );
            })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Category;
