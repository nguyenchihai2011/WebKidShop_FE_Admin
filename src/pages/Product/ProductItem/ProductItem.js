import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";

const cx = classNames.bind(styles);

function ProductItem(props) {
  const {
    productID,
    productName,
    productSize,
    productColor,
    price,
    stock,
    description,
    productPic,
    arrivalDate,
    brand,
    category,
    productType,
    promotion,
  } = props;
  const [show, setShow] = useState(false);
  const [arrDay, setArrDay] = useState(new Date(arrivalDate));
  const [product, setProduct] = useState({
    name: productName,
    size: productSize,
    color: productColor,
    price,
    stock,
    description,
    productPic,
    arrivalDate: new Date(arrivalDate),
    brand,
    category,
    productType,
    promotion,
  });
  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const [productTypes, setProductTypes] = useState([]);

  const [promotions, setPromotions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [promotionL, setPromotionL] = useState([]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/product/${productID}`, product)
      .then((res) => {
        setProduct({
          name: productName,
          size: productSize,
          color: productColor,
          price,
          stock,
          description,
          productPic,
          arrivalDate: new Date(arrivalDate),
          brand,
          category,
          productType,
          promotion,
        });
        setShow(false);
        window.location.reload(true);
        alert("Updated successfully");
      })
      .catch((err) => console.log(err));
  };

  const onDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Do you want to delete?")) {
      axios
        .delete(`http://localhost:8080/api/product/${productID}`)
        .then((res) => {
          setShow(false);
          window.location.reload(true);
          alert("Deleted successfully");
        })
        .catch((err) => {
          console.log("Error in DeletePromotionInfo!");
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brand")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/producttype")
      .then((res) => {
        setProductTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/promotion")
      .then((res) => {
        setPromotionL(res.data);
        var data = res.data.filter((item) => {
          return new Date(item.startDay) >= new Date();
        });
        setPromotions(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const setDiscount = (promotionID) => {
    const data = promotionL.filter((promo) => {
      return promo._id === promotionID;
    });
    return data[0]?.discount;
  };

  return (
    <tr>
      <td>{productID}</td>

      <td>{productName}</td>
      <td>{productSize}</td>
      <td>{productColor}</td>
      <td>{price}</td>
      <td>
        {setDiscount(promotion)
          ? (price * setDiscount(promotion)) / 100
          : price}
      </td>
      <td>{stock}</td>
      <td>
        {arrDay.getDate() +
          "-" +
          (arrDay.getMonth() + 1) +
          "-" +
          arrDay.getFullYear()}
      </td>
      <td>{setDiscount(promotion) ? `${setDiscount(promotion)}%` : ""}</td>

      <td>
        <button className={cx("product-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("product-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
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
                    name="name"
                    value={product.name}
                    onChange={onChange}
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
                    name="size"
                    value={product.size}
                    onChange={onChange}
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
                    name="color"
                    value={product.color}
                    onChange={onChange}
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
                    name="price"
                    value={product.price}
                    onChange={onChange}
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
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={onChange}
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
                    name="description"
                    value={product.description}
                    onChange={onChange}
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
                    name="productPic"
                    value={product.productPic}
                    onChange={onChange}
                    placeholder="http://www.example.com"
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3} className={cx("product-form-lable")}>
                  hoặc
                </Form.Label>
                <Col xs={9}>
                  <Form.Control
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
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
                    selected={arrDay}
                    onChange={(date) => {
                      setArrDay(date);
                      setProduct({
                        ...product,
                        arrivalDate: date,
                      });
                    }}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Brand
                </Form.Label>
                <Col xs={9}>
                  <Select
                    placeholder="Brand"
                    options={brands}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    onChange={(brand) => {
                      setProduct({ ...product, brand: brand._id });
                    }}
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Category
                </Form.Label>
                <Col xs={9}>
                  <Select
                    placeholder="Category"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    onChange={(category) => {
                      setProduct({ ...product, category: category._id });
                    }}
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  ProductType
                </Form.Label>
                <Col xs={9}>
                  <Select
                    placeholder="Producttype"
                    options={productTypes}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    onChange={(productType) => {
                      setProduct({
                        ...product,
                        productType: productType._id,
                      });
                    }}
                    className={cx("product-form-input")}
                  />
                </Col>
              </p>
              <p className={cx("product-form-row")}>
                <Form.Label column xs={3}>
                  Promotion
                </Form.Label>
                <Col xs={9}>
                  <Select
                    placeholder="Promotion"
                    options={promotions}
                    getOptionLabel={(option) => option.discount}
                    getOptionValue={(option) => option._id}
                    onChange={(promotion) => {
                      setProduct({ ...product, promotion: promotion._id });
                    }}
                    className={cx("product-form-input")}
                  />
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
              onClick={handleUpdate}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button onClick={onDelete} className={cx("product-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
