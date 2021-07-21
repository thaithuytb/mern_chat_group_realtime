import React, { useContext } from "react";
import { displayContext } from "./../../../contexts/displayContext";
import {
  BsArrowBarLeft as IconBack,
  BsFillBrightnessHighFill as IconScreen,
  BsFillInboxFill as IconCollapse,
} from "react-icons/bs";
import { FaKeyboard as IconKeyboard } from "react-icons/fa";
import "./showDetail.css";
const ShowDetail = () => {
  const { theme, setTheme, showDetail, setShowDetail} = useContext(displayContext);
  let body = null;
  switch (showDetail) {
    case 1: {
      body = null;
      break;
    }
    case 2: {
      body = null;
      break;
    }
    case 3: {
      body = null;
      break;
    }
    case 4: {
      body = (
        <>
          <div className="showDetail-title">
            <div
              className="showDetail-title-icon-wp"
              onClick={() => setShowDetail(0)}
            >
              <IconBack className="showDetail-title-icon" />
            </div>

            <div className="showDetail-title-text">Màn hình và trợ năng</div>
          </div>

          <div className="showDetail-screen">
            <div className="showDetail-screen-icon">
              <IconScreen />
            </div>
            <div className="showDetail-screen-text">
              <div className="showDetail-screen-text-header">Chế độ tối</div>
              <div className="showDetail-screen-text-content">
                Điều chỉnh giao diện của App để giảm độ chói và cho đôi mắt được
                nghỉ ngơi.
              </div>
              <div className="showDetail-screen-turnOff">
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
              <div className="showDetail-screen-turnOn">
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
            <div className="showDetail-screen-icon">
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
              <div className="showDetail-screen-turnOff">
                <span>Tắt</span>
                <span />
              </div>
              <div className="showDetail-screen-turnOn">
                <span>Bật</span>
                <span />
              </div>
            </div>
          </div>
          {/* Tương tự như thay đổi màu sắc màn hình  */}

          <div className="showDetail-screen keyboard-2">
            <div className="showDetail-screen-icon keyboard">
              <IconKeyboard />
            </div>
            <div className="showDetail-screen-text">Bàn Phím</div>
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
