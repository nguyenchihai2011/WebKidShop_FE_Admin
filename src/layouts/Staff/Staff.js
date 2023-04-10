import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import React from "react";

import { useLocation, NavLink, Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Staff.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faB,
  faBell,
  faBlog,
  faC,
  faCartShopping,
  faGear,
  faRectangleAd,
  faStore,
  faT,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Staff({ children }) {
  let location = useLocation();
  let title = location.pathname.slice(location.pathname.lastIndexOf("/"));
  title = title.slice(1);

  return (
    <div className="staff">
      <Row className={cx("staff-header")}>
        <Col xl={2} className={cx("header-logo")}>
          <img
            className={cx("logo-img")}
            src="https://bizweb.dktcdn.net/100/117/632/themes/157694/assets/favicon.png?1564585558451"
            alt=""
          />
          <span className={cx("logo-name")}>WebKidShop</span>
        </Col>
        <Col xl={10}>
          <Row>
            <Col xl={3} className={cx("header-title")}>
              <span className={cx("header-title-name")}>{title}</span>
            </Col>
            <Col xl={7} className={cx("header-search-wrapper")}></Col>
            <Col xl={2} className={cx("header-info-wrapper")}>
              {/* <FontAwesomeIcon icon={faBell} /> */}
              <div className={cx("header-info")}>
                <span className={cx("header-info-name")}>Alex Mora</span>
                <img
                  className={cx("header-info-avatar")}
                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={cx("staff-container")}>
        <Col xl={2} className={cx("container-nav")}>
          <div className={cx("nav-link")}>
            <NavLink
              to="/staff/dashboard"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon
                icon={faTableColumns}
                className={cx("nav-icon")}
              />
              <span className={cx("nav-name")}>Dashboard</span>
            </NavLink>
            <NavLink
              to="/staff/orders"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className={cx("nav-icon")}
              />
              <span className={cx("nav-name")}>Orders</span>
            </NavLink>
            <NavLink
              to="/staff/category"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon icon={faC} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>Category</span>
            </NavLink>
            <NavLink
              to="/staff/product-type"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon icon={faT} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>ProductType</span>
            </NavLink>
            <NavLink
              to="/staff/brand"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon icon={faB} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>Brand</span>
            </NavLink>
            <NavLink
              to="/staff/product"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon icon={faStore} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>Product</span>
            </NavLink>
            <NavLink
              to="/staff/promotion"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon
                icon={faRectangleAd}
                className={cx("nav-icon")}
              />
              <span className={cx("nav-name")}>Promotion</span>
            </NavLink>
            <NavLink
              to="/staff/blog"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? cx("nav-active")
                  : cx("nav-normal")
              }
            >
              <FontAwesomeIcon icon={faBlog} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>Blog</span>
            </NavLink>
          </div>
          <div className={cx("nav-setting")}>
            <Link to="" className={cx("nav-normal")}>
              <FontAwesomeIcon icon={faGear} className={cx("nav-icon")} />
              <span className={cx("nav-name")}>Setting</span>
            </Link>
            <Link to="/" className={cx("nav-normal")}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={cx("nav-icon")}
              />
              <span className={cx("nav-name")}>Logout</span>
            </Link>
          </div>
        </Col>
        <Col xl={10} className={cx("container-body")}>
          {children}
        </Col>
      </Row>
    </div>
  );
}

export default Staff;
