import Sidebar from "../Sidebar";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

export default MainLayout;
