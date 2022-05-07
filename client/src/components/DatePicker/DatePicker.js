/**
 * Author: Nam Dinh
 * Created At: Mon Apr 25 2022
 * File name: DatePicker.js
 */

import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

function MyDatePicker({ error, setError, ...props }) {
    return (
        <div className={clsx("datepicker__wrapper", {
            "datepicker__has_error": error
        })}>
            <DatePicker {...props} />

            {error && (
                <div className="datepicker__error">{error}</div>
            )}
        </div>
    );
}

export default MyDatePicker;
