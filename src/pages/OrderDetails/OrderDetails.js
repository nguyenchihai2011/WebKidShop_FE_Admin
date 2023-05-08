import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./OrderDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";

import OrderDetailsItem from "./OrderDetailsItem/OrderDetailsItem";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
const cx = classNames.bind(styles);

function OrderDetails() {
  const [order, setOrder] = useState({});
  const { idOrder } = useParams();

  useEffect(() => {
    console.log(idOrder);

    axios
      .get(`http://localhost:8080/api/checkout/${idOrder}`)
      .then((res) => {
        setOrder(res.data.order);
      })
      .catch((err) => console.log(err));
  }, [idOrder]);

  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleBack = (e) => {
    e.preventDefault();

    auth.staff ? navigate("/staff/orders") : navigate("/admin/orders");
  };

  return (
    <div className={cx("orders")}>
      <Row className={cx("orders-row")}>
        <Col xl={3} className={cx("orders-col")}>
          <p className={cx("orders-lable")}>Orders</p>
        </Col>
        <Col xl={7}>
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className={cx("orders-table")}>
          <thead className={cx("orders-header")}>
            <tr>
              <th>ProductID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className={cx("orders-body")}>
            {order.order?.map((product) => {
              return (
                <OrderDetailsItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  amount={product.price * product.quantity}
                />
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col className={cx("back-btn")}>
          <button onClick={handleBack}>Back to orders</button>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetails;
