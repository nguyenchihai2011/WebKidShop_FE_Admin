import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Overview from "./Overview/Overview";
import Revenue from "./Revenue/Revenue";
import DonutChart from "react-donut-chart";
import axios from "axios";
import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/checkout")
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orders]);

  //lay danh sach khach hang
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/getUsers")
      .then((res) => {
        setCustomers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customers]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/revenue")
      .then((res) => {
        setRevenue(res.data);
      })
      .catch((err) => console.log(err));
  }, [revenue]);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div>
      <Row>
        <Overview name="Total orders" quantity={orders.length}>
          <FontAwesomeIcon icon={faStar} />
        </Overview>
        <Overview
          name="Total sales"
          quantity={VND.format(
            revenue.reduce((total, reve) => {
              return total + reve.revenue;
            }, 0)
          )}
        >
          <FontAwesomeIcon icon={faMoneyBill} />
        </Overview>
        <Overview name="Total customers" quantity={customers.length}>
          <FontAwesomeIcon icon={faUsers} />
        </Overview>
      </Row>
      <Row>
        <Col xl={8}>
          <div className={cx("dashboard-chart")}>
            <p className={cx("dashboard-chart-name")}>Revenue</p>
            <Revenue />
          </div>
        </Col>
        <Col xl={4}>
          <div className={cx("dashboard-chart")}>
            <p className={cx("dashboard-chart-name")}>Sales by product</p>
            <DonutChart
              className={cx("dashboard-salechart")}
              height={200}
              width={300}
              data={[
                {
                  label: "a",
                  value: 25,
                },
                {
                  label: "b",
                  value: 75,
                },
                {
                  label: "c",
                  value: 50,
                },
                {
                  label: "d",
                  value: 5,
                },
              ]}
              colors={[
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#795548",
                "#607d8b",
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
