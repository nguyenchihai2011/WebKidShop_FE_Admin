import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./StaffManageItem.module.scss";

const cx = classNames.bind(styles);

function StaffManageItem(props) {
  const { id, firstName, lastName, gender, dateOfBirth, address, email } =
    props;
  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const [show, setShow] = useState(false);
  const [dateOfBirths, setDateOfBirth] = useState(new Date(dateOfBirth));
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [wards, setWards] = useState([]);
  // eslint-disable-next-line
  const [selectedWard, setSelectedWard] = useState(0);
  const [staffmanage, setstaffmanage] = useState({
    firstName,
    lastName,
    gender,
    dateOfBirth: new Date(dateOfBirth),
    address,
    email,
  });

  const [provinceStr, setProvinceStr] = useState("");
  const [districtStr, setDistrictStr] = useState("");
  const [wardStr, setWardStr] = useState("");

  const onChange = (e) => {
    setstaffmanage({ ...staffmanage, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => {
        setProvinces(res.data);
      })
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

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${address.split(" ")[2]}`)
      .then((res) => {
        setProvinceStr(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [address]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/d/${address.split(" ")[1]}`)
      .then((res) => {
        setDistrictStr(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [address]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/w/${address.split(" ")[0]}`)
      .then((res) => {
        setWardStr(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [address]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/admin/staff/${id}`, staffmanage)
      .then((res) => {
        setstaffmanage({
          firstName,
          lastName,
          gender,
          dateOfBirth: new Date(dateOfBirth),
          address,
          email,
        });
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in staffmanage!");
      });
  };

  const onDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8080/api/admin/staff/${id}`)
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        console.log("Error in DeleteStaff!");
      });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{gender}</td>
      <td>
        {staffmanage.dateOfBirth.getDate() +
          "-" +
          (staffmanage.dateOfBirth.getMonth() + 1) +
          "-" +
          staffmanage.dateOfBirth.getFullYear()}
      </td>

      <td>{`${wardStr} - ${districtStr} - ${provinceStr}`}</td>

      <td>
        <button className={cx("staffmanage-body-action")}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button className={cx("staffmanage-body-action")} onClick={handleShow}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Promotion</Modal.Title>
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
                    options={genders}
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
                    selected={dateOfBirths}
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
                    onChange={(province) => {
                      setSelectedProvince(province.code);
                      setstaffmanage({
                        ...staffmanage,
                        address: province.code,
                      });
                    }}
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
                    onChange={(district) => {
                      setSelectedDistrict(district.code);
                      setstaffmanage({
                        ...staffmanage,
                        address: district.code + " " + staffmanage.address,
                      });
                    }}
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
                    onChange={(ward) => {
                      setSelectedWard(ward.code);
                      setstaffmanage({
                        ...staffmanage,
                        address: ward.code + " " + staffmanage.address,
                      });
                    }}
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
                    readOnly
                    type="email"
                    name="email"
                    value={staffmanage.email}
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
              onClick={onSubmit}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button onClick={onDelete} className={cx("staffmanage-body-action")}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default StaffManageItem;
