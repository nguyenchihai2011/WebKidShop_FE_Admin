import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
import { useAuth } from "../../context/auth";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import bcrypt from "bcryptjs-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ChangePassword() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [curPassword, setCurPassword] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditInfo = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận chưa chính xác!");
      return;
    }

    const isMatch = bcrypt.compareSync(curPassword, auth.staff.password); // true

    if (!isMatch) {
      alert("Mật khẩu hiện tại không chính xác!");
      return;
    }

    axios
      .put(`http://localhost:8080/api/admin/staff/${auth.staff._id}`, {
        password,
      })
      .then((res) => {
        setCurPassword("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in staffmanage!");
      });
  };

  return (
    <div className={cx("change-password")}>
      <Row className={cx("info-row")}>
        <Col>
          <p className={cx("info-lable")}>Email</p>
          <input
            className={cx("info-input")}
            type="email"
            readOnly
            placeholder="Email"
            value={auth.staff?.email}
          />
        </Col>
      </Row>
      <Row className={cx("info-row")}>
        <Col>
          <p className={cx("info-lable")}>Current password</p>
          <input
            className={cx("info-input")}
            type="password"
            placeholder="Password"
            value={curPassword}
            onChange={(e) => setCurPassword(e.target.value)}
          />
        </Col>
      </Row>
      <Row className={cx("info-row")}>
        <Col>
          <p className={cx("info-lable")}>New password</p>
          <input
            className={cx("info-input")}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Row>
      <Row className={cx("info-row")}>
        <Col>
          <p className={cx("info-lable")}>Confirm new password</p>
          <input
            className={cx("info-input")}
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Col>
      </Row>
      <Row className={cx("info-wrap-btn")}>
        <button className={cx("info-btn")}>Huỷ</button>
        <button className={cx("info-btn")} onClick={handleEditInfo}>
          Lưu
        </button>
      </Row>
    </div>
  );
}

export default ChangePassword;
