import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import BrandItem from "./BrandItem/BrandItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Brand.module.scss";

const cx = classNames.bind(styles);

function Brand() {
  const [show, setShow] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState({
    logo: "",
    fileLogo: null,
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const onChooseImg = (e) => {
    var file = e.target.files[0];
    const formData = new FormData();
    formData.append("fileLogo", file);
    console.log(formData);
    setBrand({ ...brand, fileLogo: file });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/brand", brand)
      .then((res) => {
        setBrand({
          logo: "",
          name: "",
          description: "",
        });
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brand")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.log("Error from BrandList");
      });
  }, [brands]);
  return (
    <div className={cx("brand")}>
      <Row className={cx("brand-header")}>
        <Col xl={3}>
          <p className={cx("brand-lable")}>Brand</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
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
                      name="logo"
                      value={brand.logo}
                      onChange={onChange}
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
                      onChange={onChooseImg}
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
                      name="name"
                      value={brand.name}
                      onChange={onChange}
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
                      name="description"
                      value={brand.description}
                      onChange={onChange}
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
                onClick={handleSubmit}
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
            {brands.map((brand) => {
              return (
                <BrandItem
                  key={brand._id}
                  brandID={brand._id}
                  brandLogo={brand.logo}
                  brandName={brand.name}
                  brandDesc={brand.description}
                />
              );
            })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Brand;
