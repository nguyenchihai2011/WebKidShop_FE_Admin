import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import OrderItem from "./OrderItem/OrderItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./Orders.module.scss";

const cx = classNames.bind(styles);

function Orders() {
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
              <th>Product</th>
              <th>OrderID</th>
              <th>Date</th>
              <th>Customer name</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={cx("orders-body")}>
            <OrderItem
              urlProduct="https://bizweb.dktcdn.net/thumb/large/100/117/632/products/giay5-6ad05ccc-be71-4eca-83f8-3e73a5570372-42da6097-d9b3-437a-afe5-66c1be4352b4-8a365fca-ef0a-415a-838e-f172e148cb7c.jpg?v=1473603367000"
              nameProduct="Giầy thể thao buộc dây - F56"
              idOrder="#11232"
              dateOrder="Jun 29,2023"
              customerName="Anastasisa Hasuna"
              statusOrder="Delivered"
              amount="450.000đ"
            />
            <OrderItem
              urlProduct="https://bizweb.dktcdn.net/thumb/large/100/117/632/products/giay5-6ad05ccc-be71-4eca-83f8-3e73a5570372-42da6097-d9b3-437a-afe5-66c1be4352b4-8a365fca-ef0a-415a-838e-f172e148cb7c.jpg?v=1473603367000"
              nameProduct="Giầy thể thao buộc dây - F56"
              idOrder="#11232"
              dateOrder="Jun 29,2023"
              customerName="Anastasisa Hasuna"
              statusOrder="Delivered"
              amount="450.000đ"
            />
            <OrderItem
              urlProduct="https://bizweb.dktcdn.net/thumb/large/100/117/632/products/giay5-6ad05ccc-be71-4eca-83f8-3e73a5570372-42da6097-d9b3-437a-afe5-66c1be4352b4-8a365fca-ef0a-415a-838e-f172e148cb7c.jpg?v=1473603367000"
              nameProduct="Giầy thể thao buộc dây - F56"
              idOrder="#11232"
              dateOrder="Jun 29,2023"
              customerName="Anastasisa Hasuna"
              statusOrder="Pending"
              amount="450.000đ"
            />
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Orders;
