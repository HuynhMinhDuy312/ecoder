/**
 * Author: Nam Dinh
 * Created At: Mon Apr 25 2022
 * File name: Input.js
 */

import clsx from 'clsx';

import styles from './Input.module.scss';

function Input({
    inputStyle,
    wrapperStyle,
    className,
    error,
    ...props
}) {
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.onError]: error,
            })}
            style={wrapperStyle}
        >
            <input
                className={styles.input}
                style={inputStyle}
                {...props}
            />

            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

export default Input;
