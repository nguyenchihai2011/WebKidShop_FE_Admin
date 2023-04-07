import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./OrderItem.module.scss";

const cx = classNames.bind(styles);

function OrderItem(props) {
  const {
    urlProduct,
    nameProduct,
    idOrder,
    dateOrder,
    customerName,
    statusOrder,
    amount,
  } = props;
  return (
    <tr>
      <td>
        <img className={cx("orders-body-image")} src={urlProduct} alt="" />
        <span>{nameProduct}</span>
      </td>
      <td>{idOrder}</td>
      <td>{dateOrder}</td>
      <td>{customerName}</td>
      <td>{statusOrder}</td>
      <td>{amount}</td>
      <td>
        <div className={cx("orders-body-actions")}>
          <button className={cx("orders-body-action")}>
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
          {statusOrder === "Pending" && (
            <div>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={cx("orders-action-check")}
                />
              </button>
              <button className={cx("orders-body-action")}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={cx("orders-action-xmark")}
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
