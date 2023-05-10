import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./OrderItem.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/getUsers").then((res) => {
      setCustomer(res.data.users);
    });
  });

  const setCustomerName = (customerID) => {
    const data = customer.filter((cus) => {
      return cus._id === customerID;
    });
    return `${data[0]?.firstName} ${data[0]?.lastName}`;
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
      <td>{setCustomerName(customerID)}</td>
      <td>{statusOrder}</td>
      <td>{amount}</td>

      <td>
        <div className={cx("orders-body-actions")}>
          {auth.staff ? (
            <Link to={`/staff/orders/${idOrder}`}>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip>Details</Tooltip>}
              >
                <button className={cx("orders-body-action")}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </OverlayTrigger>
              {/* <button className={cx("orders-body-action")}>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button> */}
            </Link>
          ) : (
            <Link to={`/admin/orders/${idOrder}`}>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip>Details</Tooltip>}
              >
                <button className={cx("orders-body-action")}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </OverlayTrigger>
              {/* <button className={cx("orders-body-action")}>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button> */}
            </Link>
          )}

          {statusOrder === "Pending" && (
            <div>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip>Accept</Tooltip>}
              >
                <button className={cx("orders-body-action")}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={cx("orders-action-check")}
                    onClick={handleConfirm}
                  />
                </button>
              </OverlayTrigger>
              {/* <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={cx("orders-action-check")}
                  onClick={handleConfirm}
                />
              </button> */}
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip>Reject</Tooltip>}
              >
                <button className={cx("orders-body-action")}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={cx("orders-action-xmark")}
                    onClick={handleReject}
                  />
                </button>
              </OverlayTrigger>
              {/* <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={cx("orders-action-xmark")}
                  onClick={handleReject}
                />
              </button> */}
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
