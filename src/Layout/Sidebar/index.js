import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <ul>
        <Link to={"/"}>Home</Link>
        <Link to={"/donecontent"}>Done</Link>
      </ul>
    </div>
  );
}

export default Sidebar;
