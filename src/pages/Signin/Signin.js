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

import classNames from "classnames/bind";
import styles from "./Signin.module.scss";

const cx = classNames.bind(styles);

function Signin() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Log in for staff", value: "1" },
    { name: "Log in for admin", value: "2" },
  ];
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
                <Form.Group
                  className={cx("signin-form-group")}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faUser}
                      className={cx("signin-form-lable")}
                    />
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className={cx("signin-form-input")}
                  />
                </Form.Group>
                <Form.Group
                  className={cx("signin-form-group")}
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faLock}
                      className={cx("signin-form-lable")}
                    />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="******"
                    className={cx("signin-form-input")}
                  />
                </Form.Group>
                <button className={cx("signin-form-btn")}>Sign In</button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signin;
