import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

function SearchBar() {
  return (
    <div className={cx("searchbar-search")}>
      <button className={cx("searchbar-search-btn")}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={cx("searchbar-search-icon")}
        />
      </button>
      <input
        type="text"
        placeholder="Search here..."
        className={cx("searchbar-search-input")}
      />
    </div>
  );
}

export default SearchBar;
