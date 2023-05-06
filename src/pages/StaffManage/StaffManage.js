import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

import StaffManageItem from "./StaffManageItem/StaffManageItem";
import SearchBar from "../../layouts/components/SearchBar/SearchBar";

import classNames from "classnames/bind";
import styles from "./StaffManage.module.scss";

const cx = classNames.bind(styles);

function StaffManage() {
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const [show, setShow] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [staffmanages, setstaffmanages] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(0);
  const [staffmanage, setstaffmanage] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: new Date(),
    address: "",
    email: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChange = (e) => {
    setstaffmanage({ ...staffmanage, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (staffmanage.password !== passwordConfirm) {
      alert("Mật khẩu xác nhận chưa chính xác!");
      return;
    }

    setstaffmanage({
      ...staffmanage,
      address: `${selectedWard} ${selectedDistrict} ${selectedProvince}`,
    });

    axios
      .post("http://localhost:8080/api/admin/staff/create", staffmanage)
      .then((res) => {
        setstaffmanage({
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: new Date(),
          address: "",
          email: "",
          password: "",
        });
        setPasswordConfirm("");
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in staffmanage!");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/staff")
      .then((res) => {
        setstaffmanages(res.data);
      })
      .catch((err) => {
        console.log("Error from staffmanageList");
      });
  }, [staffmanages]);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/d/")
      .then((res) => {
        let data = res.data;
        data = data.filter((dis) => dis.province_code === selectedProvince);
        setDistricts(data);
      })
      .catch((err) => console.log(err));
  }, [selectedProvince]);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/w/")
      .then((res) => {
        let data = res.data;
        data = data.filter((w) => w.district_code === selectedDistrict);
        setWards(data);
      })
      .catch((err) => console.log(err));
  }, [selectedDistrict]);

  return (
    <div>
      <div className={cx("staffmanage")}>
        <Row className={cx("staffmanage-header")}>
          <Col xl={3}>
            <p className={cx("staffmanage-lable")}>Staffmanage</p>
          </Col>
          <Col xl={7}>
            <SearchBar />
          </Col>
          <Col xl={2}>
            <Button
              className={cx("staffmanage-add-btn")}
              variant="primary"
              onClick={handleShow}
            >
              Add staffmanage
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Staffmanage</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className={cx("staffmanage-form-group")}>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      FirstName
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={staffmanage.firstName}
                        onChange={onChange}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      LastName
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={staffmanage.lastName}
                        onChange={onChange}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      Gender
                    </Form.Label>
                    <Col xs={9} className={cx("staffmanage-form-col")}>
                      <Select
                        placeholder="Gender"
                        options={gender}
                        onChange={(gender) => {
                          setstaffmanage({
                            ...staffmanage,
                            gender: gender.value,
                          });
                        }}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      DateOfBirth
                    </Form.Label>
                    <Col xs={9} className={cx("staffmanage-form-col")}>
                      <DatePicker
                        selected={dateOfBirth}
                        onChange={(date) => {
                          setDateOfBirth(date);
                          setstaffmanage({ ...staffmanage, dateOfBirth: date });
                        }}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      Address
                    </Form.Label>
                    <Col xs={9}>
                      <Select
                        placeholder="Province"
                        options={provinces}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.code}
                        onChange={(provinces) =>
                          setSelectedProvince(provinces.code)
                        }
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}></Form.Label>
                    <Col xs={9}>
                      <Select
                        placeholder="District"
                        options={districts}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.code}
                        onChange={(districts) =>
                          setSelectedDistrict(districts.code)
                        }
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}></Form.Label>
                    <Col xs={9}>
                      <Select
                        placeholder="Ward"
                        options={wards}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.code}
                        onChange={(wards) => setSelectedWard(wards.code)}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      Email
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={staffmanage.email}
                        onChange={onChange}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      Password
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control
                        type="password"
                        name="password"
                        value={staffmanage.password}
                        onChange={onChange}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                  <p className={cx("staffmanage-form-row")}>
                    <Form.Label column xs={3}>
                      Pwd Confirm
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className={cx("staffmanage-form-input")}
                      />
                    </Col>
                  </p>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className={cx("staffmanage-form-btn")}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  className={cx("staffmanage-form-btn")}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover className={cx("staffmanage-table")}>
            <thead className={cx("staffmanage-table-header")}>
              <tr>
                <th>StaffID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>DateOfBirth</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={cx("staffmanage-table-body")}>
              {staffmanages.map((staffmanage) => {
                return (
                  <StaffManageItem
                    key={staffmanage._id}
                    id={staffmanage._id}
                    firstName={staffmanage.firstName}
                    lastName={staffmanage.lastName}
                    gender={staffmanage.gender}
                    dateOfBirth={staffmanage.dateOfBirth}
                    address={staffmanage.address}
                    email={staffmanage.email}
                    password={staffmanage.password}
                  />
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>
    </div>
  );
}

export default StaffManage;
