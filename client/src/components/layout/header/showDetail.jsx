import React, { useContext } from "react";
import { displayContext } from "./../../../contexts/displayContext";
import { Redirect } from "react-router-dom";
import {
  BsArrowBarLeft as IconBack,
  BsFillBrightnessHighFill as IconScreen,
  BsFillInboxFill as IconCollapse,
} from "react-icons/bs";
import { FiSettings as IconSetting } from "react-icons/fi";
import { FaKeyboard as IconKeyboard } from "react-icons/fa";
import "./showDetail.css";
const ShowDetail = () => {
  const { theme, setTheme, showDetail, setShowDetail } =
    useContext(displayContext);
  const style = theme.isDark ? theme.dark.header : theme.light.header;
  let body = null;
  switch (showDetail) {
    case 1: {
      body = <Redirect to="/dashboard" />;
      break;
    }
    case 2: {
      body = null;
      break;
    }
    case 3: {
      body = (
        <>
          <div className="showDetail-title">
            <div
              className={`showDetail-title-${theme.isDark} showDetail-title-icon-wp`}
              onClick={() => setShowDetail(0)}
            >
              <IconBack className="showDetail-title-icon" />
            </div>

            <div className="showDetail-title-text">
              Cài đặt và quyền riêng tư
            </div>
          </div>
          <div className={`feature-change-${theme.isDark} showDetail-screen`}>
            <div
              style={{ border: style.borderAllElementLi }}
              className="showDetail-screen-icon"
            >
              <IconSetting />
            </div>
            <div className="showDetail-screen-text">
              Cài đặt (Chưa hoàn thiện).
            </div>
          </div>
        </>
      );
      break;
    }
    case 4: {
      body = (
        <>
          <div className="showDetail-title">
            <div
              className={`showDetail-title-${theme.isDark} showDetail-title-icon-wp`}
              onClick={() => setShowDetail(0)}
            >
              <IconBack className="showDetail-title-icon" />
            </div>

            <div className="showDetail-title-text">Màn hình và trợ năng</div>
          </div>

          <div className="showDetail-screen">
            <div
              style={{ border: style.borderAllElementLi }}
              className="showDetail-screen-icon"
            >
              <IconScreen />
            </div>
            <div className="showDetail-screen-text">
              <div className="showDetail-screen-text-header">Chế độ tối</div>
              <div className="showDetail-screen-text-content">
                Điều chỉnh giao diện của App để giảm độ chói và cho đôi mắt được
                nghỉ ngơi.
              </div>
              <div
                className={`feature-change-${theme.isDark} showDetail-screen-turnOff`}
              >
                <span>Tắt</span>
                <span
                  className={theme.isDark ? "" : "showDetail-screen-active"}
                  onClick={() =>
                    setTheme({
                      ...theme,
                      isDark: false,
                    })
                  }
                />
              </div>
              <div
                className={`feature-change-${theme.isDark} showDetail-screen-turnOn`}
              >
                <span>Bật</span>
                <span
                  className={!theme.isDark ? "" : "showDetail-screen-active"}
                  onClick={() =>
                    setTheme({
                      ...theme,
                      isDark: true,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {/* Tương tự như thay đổi màu sắc màn hình  */}
          <div className="showDetail-screen">
            <div
              style={{ border: style.borderAllElementLi }}
              className="showDetail-screen-icon"
            >
              <IconCollapse />
            </div>
            <div className="showDetail-screen-text">
              <div className="showDetail-screen-text-header">
                Chế độ Thu gọn
              </div>
              <div className="showDetail-screen-text-content">
                Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn
                hình. (Chưa hoàn thiện).
              </div>
              <div
                className={`feature-change-${theme.isDark} showDetail-screen-turnOff`}
              >
                <span>Tắt</span>
                <span />
              </div>
              <div
                className={`feature-change-${theme.isDark} showDetail-screen-turnOn`}
              >
                <span>Bật</span>
                <span />
              </div>
            </div>
          </div>
          {/* Tương tự như thay đổi màu sắc màn hình  */}

          <div className={`feature-change-${theme.isDark} showDetail-screen keyboard-2`}>
            <div
              style={{ border: style.borderAllElementLi }}
              className="showDetail-screen-icon keyboard"
            >
              <IconKeyboard />
            </div>
            <div className="showDetail-screen-text">
              Bàn Phím (Chưa hoàn thiện).
            </div>
          </div>
        </>
      );
      break;
    }
    case 5: {
      body = null;
      break;
    }
    default: {
      body = null;
    }
  }
  return <>{body}</>;
};

export default ShowDetail;
