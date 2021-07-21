import React, { useContext } from "react";
import { authContext } from "./../../../contexts/authContext";
import { displayContext } from "./../../../contexts/displayContext";
import ShowDetail from "./showDetail";
import {
  BiDownArrow as IconArrowDown,
  BiLogOutCircle as IconLogout,
} from "react-icons/bi";
import {
  AiFillWarning as IconWarning,
  AiFillSetting as IconSetting,
} from "react-icons/ai";
import { BsFillBrightnessHighFill as IconScreen } from "react-icons/bs";
import noAvt from "../../../assets/noAvt.png";
import "./header.css";

const Header = () => {
  const {
    authState: { user },
    userLogout,
  } = useContext(authContext);
  const {
    isShowChangeInfo,
    setIsShowChangeInfo,
    theme,
    showDetail,
    setShowDetail,
  } = useContext(displayContext);
  const style = theme.isDark ? theme.dark.header : theme.light.header;
  const styleHeader = {
    background: style.background,
    color: style.color,
    borderBottom: style.borderBottom,
  };
  const styleHeaderLi = { background: style.backgroundIconNav };
  // const turnOffChangeInfo = (e) => {
  //   if (e.target.className.baseVal !== "header-nav-icon") {
  //     setIsShowChangeInfo(false);
  //   }
  // };
  return (
    <div className="header" style={styleHeader}>
      <ul className="header-nav">
        <li>Xin chào: {user.name}</li>
        <li
          style={styleHeaderLi}
          className={isShowChangeInfo ? "header-nav-force" : ""}
        >
          <IconArrowDown
            className="header-nav-icon"
            onClick={() => {
              setIsShowChangeInfo(!isShowChangeInfo);
              showDetail !== 0 && setShowDetail(0);
            }}
          />

          {showDetail === 0 && (
            <>
              <div
                className={
                  isShowChangeInfo ? "feature-change" : "feature-change none"
                }
              >
                <div className="feature-change-info">
                  <img src={noAvt} alt="noAvt" />
                  <div className="feature-change-info-text">
                    <p className="feature-change-info-name">{user.name}</p>
                    <p className="feature-change-info-title">
                      Xem trang cá nhân của bạn
                    </p>
                  </div>
                </div>
                <div className="feature-change-warning">
                  <div className="feature-change-warning-icon">
                    <IconWarning />
                  </div>
                  <div className="feature-change-warning-text">
                    <p>Đóng góp ý kiến</p>
                    <p>Chúng tôi sẽ cải tiện phiên bản mới hơn</p>
                  </div>
                </div>

                <div className="feature-change-setting">
                  <div className="feature-change-setiing-icon">
                    <IconSetting />
                  </div>
                  <div className="feature-change-setting-text">
                    Cài đặt và quyền riêng tư
                  </div>
                </div>

                <div className="feature-change-screen">
                  <div className="feature-change-screen-icon">
                    <IconScreen />
                  </div>
                  <div
                    className="feature-change-screen-text"
                    onClick={() => setShowDetail(4)}
                  >
                    Thay đổi màu sáng màn hình
                  </div>
                </div>

                <div className="logout" onClick={userLogout}>
                  <div className="logout-icon">
                    <IconLogout />
                  </div>
                  <div className="logout-text">Logout</div>
                </div>
                <div className="feature-change-end">
                  &copy; Copyright 2021: Ngô Quang Thái
                </div>
              </div>
            </>
          )}
          {showDetail !== 0 && (
            <div
              className={
                isShowChangeInfo ? "feature-change" : "feature-change none"
              }
            >
              <ShowDetail />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
