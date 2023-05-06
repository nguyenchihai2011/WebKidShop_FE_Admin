import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";

import OrderItem from "./OrderItem/OrderItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Orders() {
  const [orders, setOrders] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [curOrders, setCurOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/checkout")
      .then((res) => {
        setOrders(res.data.orders);
        setCurOrders(res.data.orders.slice(0, 10));
        setPageCount(Math.ceil(res.data.orders.length / 10));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 10) % orders.length;
    const endOffset = newOffset + 10;
    setCurOrders(orders.slice(newOffset, endOffset));
    setPageCount(Math.ceil(orders.length / 10));
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
              <th>OrderID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("orders-body")}>
            {curOrders.map((order) => {
              return (
                <OrderItem
                  key={order._id}
                  idOrder={order._id}
                  dateOrder={order.orderDate}
                  customerID={order.user?._id}
                  statusOrder={order.status}
                  amount={order?.order.reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0)}
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

export default Orders;
