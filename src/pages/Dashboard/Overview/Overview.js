import Col from "react-bootstrap/esm/Col";

import classNames from "classnames/bind";
import styles from "./Overview.module.scss";

const cx = classNames.bind(styles);

function Overview({ name, quantity, children }) {
  return (
    <Col className={cx("overview")}>
      <span className={cx("overview-icon")}>{children}</span>
      <span className={cx("overview-name")}>{name}</span>
      <p className={cx("overview-quantity")}>{quantity}</p>
    </Col>
  );
}

export default Overview;
