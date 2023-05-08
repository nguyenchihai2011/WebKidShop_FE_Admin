import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./OrderItem.module.scss";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const cx = classNames.bind(styles);

function OrderItem(props) {
  const { idOrder, dateOrder, customerID, statusOrder, amount } = props;

  const [auth] = useAuth();

  // eslint-disable-next-line
  const [date, setDate] = useState(new Date(dateOrder));

  const handleConfirm = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:8080/api/checkout/${idOrder}/status`, {
        status: "Confirmed",
      })
      .then((res) => {
        alert("Đơn hàng được duyệt thành công!");
        window.location.reload();
      })
      .catch((err) => {
        handleReject();
      });
  };

  const handleReject = (e) => {
    // e.preventDefault();

    axios
      .patch(`http://localhost:8080/api/checkout/${idOrder}/status`, {
        status: "Reject",
      })
      .then((res) => {
        alert(
          "Không đủ điều kiện đáp ứng đơn hàng! Đơn hàng bị huỷ thành công!"
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{idOrder}</td>
      <td>
        {date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear()}
      </td>
      <td>{customerID}</td>
      <td>{statusOrder}</td>
      <td>{amount}</td>

      <td>
        <div className={cx("orders-body-actions")}>
          {auth.staff ? (
            <Link to={`/staff/orders/${idOrder}`}>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
            </Link>
          ) : (
            <Link to={`/admin/orders/${idOrder}`}>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
            </Link>
          )}

          {statusOrder === "Pending" && (
            <div>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={cx("orders-action-check")}
                  onClick={handleConfirm}
                />
              </button>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={cx("orders-action-xmark")}
                  onClick={handleReject}
                />
              </button>
            </div>
          )}
          {statusOrder === "Confirm" && (
            <div>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={cx("orders-action-xmark")}
                  onClick={handleReject}
                />
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default OrderItem;
