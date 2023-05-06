import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import classNames from "classnames/bind";
import styles from "./Signin.module.scss";

const cx = classNames.bind(styles);

function Signin() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Log in for staff", value: "1" },
    { name: "Log in for admin", value: "2" },
  ];

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let urlString = "";
    urlString =
      radioValue === "1"
        ? "http://localhost:8080/api/staff/login"
        : "http://localhost:8080/api/admin/login";
    axios
      .post(urlString, account)
      .then((res) => {
        setAuth({ ...auth, staff: res.data.staff });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        if (radioValue === "1") navigate("/staff/dashboard");
        else navigate("/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx("signin")}>
      <Container>
        <Row className={cx("signin-row")}>
          <Col xl={3} className={cx("signin-background")}>
            <ButtonGroup className={cx("signin-background-btn-group")}>
              {radios.map((radio, idx) => (
                <ToggleButton
                  className={cx("signin-background-btn")}
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
          <Col xl={9} className={cx("signin-form-wrapper")}>
            <div className={cx("signin-form")}>
              <img
                className={cx("signin-form-logo")}
                src="//bizweb.dktcdn.net/100/117/632/themes/157694/assets/favicon.png?1564585558451"
                alt=""
              />
              <h2 className={cx("signin-form-title")}>Welcome to WebKidShop</h2>
              <Form>
                <Form.Group className={cx("signin-form-group")}>
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faUser}
                      className={cx("signin-form-lable")}
                    />
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={account.email}
                    placeholder="name@example.com"
                    onChange={onChange}
                    className={cx("signin-form-input")}
                  />
                </Form.Group>
                <Form.Group className={cx("signin-form-group")}>
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faLock}
                      className={cx("signin-form-lable")}
                    />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="******"
                    name="password"
                    value={account.password}
                    onChange={onChange}
                    className={cx("signin-form-input")}
                  />
                </Form.Group>
                <button onClick={handleLogin} className={cx("signin-form-btn")}>
                  Sign In
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signin;
