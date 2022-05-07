import {
    faCircleExclamation,
    faXmark,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import clsx from 'clsx';

import './ToastMessage.scss';
import * as Constant from './Constant';

const ToastMessage = ({ open, setOpen }) => {
    // open = {isVisible, type, msg: {title, duration, desc}}

    React.useEffect(() => {
        let timeout = 0;

        if (open.isVisible) {
            timeout = setTimeout(() => {
                timeout = 0;
                handleClose();
            }, open.msg.duration);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [open]);

    const handleClose = () => {
        setOpen({
            isVisible: false,
            type: '',
            msg: {},
        });
    };

    return (
        <React.Fragment>
            {open.isVisible && (
                <div
                    className={clsx('toast', {
                        error: open.type === Constant.Type.ERROR,
                        success: open.type === Constant.Type.SUCCESS,
                    })}
                >
                    <div className="toast__left">
                        {open.type === Constant.Type.ERROR ? (
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                className="toast__icon"
                            />
                        ) : open.type === Constant.Type.SUCCESS ? (
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="toast__icon"
                            />
                        ) : (
                            ''
                        )}
                        <div className="toast__content">
                            <div className="toast__title">
                                {open.msg.title}
                            </div>
                            <div className="toast__desc">
                                {open.msg.desc}
                            </div>
                        </div>
                    </div>
                    <div className="toast__right">
                        <FontAwesomeIcon
                            className="toast__close"
                            icon={faXmark}
                            onClick={handleClose}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default React.memo(ToastMessage);
