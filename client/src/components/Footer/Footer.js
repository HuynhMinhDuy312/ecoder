import { faFacebookSquare, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.scss";

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__information">
                <div className="footer__group">
                    <span className="footer__name">
                        <img alt="logo" src={require("./img/logo.jpg")} className="footer__logo" />
                        ECoder
                    </span>
                    <span className="footer__text">Điện thoại: 0909080809</span>
                    <span className="footer__text">Email: contact@ecoder.com</span>
                    <span className="footer__text">Địa chỉ: 210 Nguyễn Văn Cừ Thành phố Hồ Chí Minh</span>
                </div>
                <div className="footer__group">
                    <span className="footer__name">Về ECoder</span>
                    <span className="footer__text">Giới thiệu</span>
                    <span className="footer__text">Đối tác</span>
                </div>
                <div className="footer__group">
                    <span className="footer__name">Hỗ trợ</span>
                    <span className="footer__text">Liên hệ</span>
                    <span className="footer__text">Bảo mật</span>
                    <span className="footer__text">Điều khoản</span>
                </div>
                <div className="footer__group">
                    <span className="footer__name">Chứng chỉ</span>
                    <span className="footer__text">Hoàn thành khóa Javascript</span>
                    <span className="footer__text">Hoàn thành khóa C#</span>
                    <span className="footer__text">Hoàn thành khóa C++</span>
                </div>
            </div>
            <div className="footer__misc">
                <div className="footer__text">© 2022 - ECoder Foundation</div>
                <div className="footer__socials">
                    <FontAwesomeIcon icon={faFacebookSquare} className="footer__fb" />
                    <FontAwesomeIcon icon={faYoutubeSquare} className="footer__ytb" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
