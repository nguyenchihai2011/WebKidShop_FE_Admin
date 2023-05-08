import classNames from "classnames/bind";
import styles from "./OrderDetailsItem.module.scss";

// eslint-disable-next-line
const cx = classNames.bind(styles);

function OrderDetailsItem(props) {
  const { id, name, price, quantity, amount } = props;

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{quantity}</td>
        <td>{amount}</td>
      </tr>
    </>
  );
}

export default OrderDetailsItem;
