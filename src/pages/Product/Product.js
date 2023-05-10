import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "react-datepicker/dist/react-datepicker.css";

import ProductItem from "./ProductItem/ProductItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product() {
  const [show, setShow] = useState(false);

  const [arrDay, setArrDay] = useState(new Date());
  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const [productTypes, setProductTypes] = useState([]);

  const [promotion, setPromotion] = useState([]);

  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    size: "",
    color: "",
    price: "",
    stock: "",
    description: "",
    productPic: "",
    arrivalDate: new Date(),
    brand: "",
    category: "",
    productType: "",
    // promotion: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    axios
      .post("http://localhost:8080/api/product/create", product)
      .then((res) => {
        setProduct({
          name: "",
          size: "",
          color: "",
          price: "",
          stock: "",
          description: "",
          productPic: "",
          arrivalDate: new Date(),
          brand: "",
          category: "",
          productType: "",
          promotion: "",
        });
        setShow(false);
        window.location.reload(true);
        alert("Created successfully");
      })

      .catch((err) => {
        console.log(err.response.data);
      });
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
        var data = res.data.filter((item) => {
          return new Date(item.startDay) >= new Date();
        });
        setPromotion(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product")
      .then((res) => {
        setProducts(res.data);
        setCurrentProducts(res.data.slice(0, 10));
        setPageCount(Math.ceil(res.data.length / 10));
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 10) % products.length;
    const endOffset = newOffset + 10;
    setCurrentProducts(products.slice(newOffset, endOffset));
    setPageCount(Math.ceil(products.length / 10));
  };

  return (
    <div className={cx("product")}>
      <Row className={cx("product-header")}>
        <Col xl={3}>
          <p className={cx("product-lable")}>Product</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
        </Col>
        <Col xl={2}>
          <Button
            className={cx("product-add-btn")}
            variant="primary"
            onClick={handleShow}
          >
            Add product
          </Button>
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
                  <Form.Label
                    column
                    xs={3}
                    className={cx("product-form-lable")}
                  >
                    hoặc
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="file"
                      name="myImage"
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
                      options={promotion}
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
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("product-table")}>
          <thead className={cx("product-table-header")}>
            <tr>
              <th>ProductID</th>
              <th>Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
              <th>Price Discount</th>
              <th>Stock</th>
              <th>ArrivalDate</th>
              <th>Promotion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("product-table-body")}>
            {currentProducts.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  productID={product._id}
                  productName={product.name}
                  productSize={product.size}
                  productColor={product.color}
                  price={product.price}
                  stock={product.stock}
                  description={product.description}
                  productPic={product.productPic}
                  arrivalDate={product.arrivalDate}
                  brand={product.brand}
                  category={product.category}
                  productType={product.productType}
                  promotion={product.promotion}
                />
              );
            })}
          </tbody>
        </Table>
      </Row>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={cx("pagination")}
        pageLinkClassName={cx("page-num")}
        previousLinkClassName={cx("page-num")}
        nextLinkClassName={cx("page-num")}
        activeLinkClassName={cx("active")}
      />
    </div>
  );
}

export default Product;
