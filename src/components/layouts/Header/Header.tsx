import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NavigationBar } from "@/components/mypage";
import MenuIcon from "@/assets/menu.svg?react";
import NavbarCloseIcon from "@/assets/navbar-close.svg?react";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = () => {
  const [isLogined, setIsLogined] = useState(true);
  const [isMyPageNavbarShow, setIsMyPageNavbarShow] = useState(false);
  const [searchParams] = useSearchParams();

  const isInMyPage = useMemo(() => location.pathname === "/mypage", [location.pathname]);

  useEffect(() => {
    setIsMyPageNavbarShow(false);
  }, [searchParams]);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setIsMyPageNavbarShow(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "overflow";
    setIsMyPageNavbarShow(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-wrapper"]}>
        <h1 className={styles["header-txt"]}>
          <Link to={"/"}>BETA</Link>
        </h1>

        <div className={styles["button-group"]}>
          {!isLogined && (
            <Link to="/login" className={styles["button-login"]}>
              로그인
            </Link>
          )}

          {isLogined && (
            <>
              <button type="button" className={cx("button-logout", isInMyPage && "my-page")}>
                로그아웃
              </button>
              {!isInMyPage && (
                <Link to="/mypage" className={styles["button-mypage"]}>
                  마이페이지
                </Link>
              )}
              {isInMyPage && (
                <button type="button" className={cx("button-icon", "button-menu")} onClick={handleOpen}>
                  <span className={"a11y-hidden"}>메뉴 아이콘 버튼</span>
                  <MenuIcon />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isMyPageNavbarShow && (
        <>
          <div className="dim" onClick={handleClose}></div>
          <div className={cx("mypage-navbar", !isMyPageNavbarShow && ".hide")}>
            <button type="button" className={cx("button-icon")} onClick={handleClose}>
              <span className={"a11y-hidden"}>메뉴 닫기</span>
              <NavbarCloseIcon />
            </button>
            <NavigationBar />
            <button type="button" className={styles["button-logout"]}>
              로그아웃
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
