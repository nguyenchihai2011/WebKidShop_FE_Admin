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

import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div>
      <Row>
        <Overview name="Total orders" quantity="2625">
          <FontAwesomeIcon icon={faStar} />
        </Overview>
        <Overview name="Total sales" quantity="2625">
          <FontAwesomeIcon icon={faMoneyBill} />
        </Overview>
        <Overview name="Total customers" quantity="2625">
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
