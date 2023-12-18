import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { NavigationBar } from "@/components/mypage";
import { useLoginStore } from "@/stores/useLoginStore";
import { patchUserLogout } from "@/apis/patchUserLogout";
import MenuIcon from "@/assets/menu.svg?react";
import NavbarCloseIcon from "@/assets/navbar-close.svg?react";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = () => {
  const { userState, setUserState } = useLoginStore();
  const [isMyPageNavbarShow, setIsMyPageNavbarShow] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isInMyPage = useMemo(() => location.pathname === "/mypage", [location.pathname]);

  useEffect(() => {
    setIsMyPageNavbarShow(false);
  }, [searchParams]);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setIsMyPageNavbarShow(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "auto";
    setIsMyPageNavbarShow(false);
  };

  const handleLogout = async () => {
    const res = patchUserLogout();
    if ((await res).ok) {
      setUserState({ isLogin: false, login_id: "", user_name: "", user_role: "" });
      navigate("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-wrapper"]}>
        <h1 className={styles["header-txt"]}>
          <Link to={"/"}>BETA</Link>
        </h1>

        <div className={styles["button-group"]}>
          {userState.login_id === "" ? (
            <Link to="/login" className={styles["button-login"]}>
              로그인
            </Link>
          ) : (
            <>
              <button type="button" className={cx("button-logout", isInMyPage && "my-page")} onClick={handleLogout}>
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
          <div className={styles["mypage-navbar"]}>
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
