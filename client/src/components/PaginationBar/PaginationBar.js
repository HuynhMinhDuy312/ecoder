import React from 'react';

import { PaginationItem } from '@components';
import {
    faAngleLeft,
    faAngleRight,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PaginationBar.module.scss';

import clsx from 'clsx';

function PaginationBar({
    currentPage,
    setCurrentPage,
    totalPage,
    className,
    columnWidth,
    noPages,
}) {
    const [columns, setColumns] = React.useState(0);
    const [visiblePages, setVisiblePages] = React.useState([]);

    React.useEffect(() => {
        if (totalPage < noPages) {
            noPages = totalPage;
        }

        setColumns(columnWidth * (noPages + 2.4));
    }, [totalPage]);

    React.useEffect(() => {
        // Handle the page shown
        if (totalPage > noPages) {
            let half = Math.round((noPages - 1) / 2);
            let left = currentPage - half;

            let right = currentPage + half;
            let newVisiblePages = [];

            // Left > 1  [1, 0]
            // Right < totalPage: [1,0, c-2, c-1, c, c+1, c+2, 0, totalPage]
            // Right >= totalPage: [1, 0, totalPage - 6, ... totalPage]

            // Left <= 1: [1, 2, ..., currentPage] (remain = - left + 1)
            // Right + remain <= totalPage: [1, 2, ..., currentPage,  (7 - currentPage), 0, totalPage]

            if (left > 1) {
                if (right < totalPage) {
                    newVisiblePages = [
                        1,
                        0,
                        ...Array(noPages - 4)
                            .fill('')
                            .map(
                                (_, index) =>
                                    currentPage - (half - 2) + index
                            ),
                        0,
                        totalPage,
                    ];
                } else {
                    newVisiblePages = [
                        1,
                        0,
                        ...Array(noPages - 2)
                            .fill('')
                            .map(
                                (_, index) =>
                                    totalPage -
                                    (noPages - 2) +
                                    index +
                                    1
                            ),
                    ];
                }
            } else {
                newVisiblePages = [
                    ...Array(noPages - 2)
                        .fill('')
                        .map((_, index) => index + 1),
                    0,
                    totalPage,
                ];
            }

            setVisiblePages(newVisiblePages);
        } else if (visiblePages.size !== totalPage) {
            setVisiblePages(
                Array(totalPage)
                    .fill('')
                    .map((_, index) => index + 1)
            );
        }
    }, [totalPage, currentPage]);

    return (
        <div
            className={clsx(styles.paginationWrapper, { className })}
            style={{
                width: columns,
            }}
        >
            <div
                className={clsx(styles.icon, styles.page, {
                    [styles.disabled]: currentPage === 1,
                })}
                style={{ width: columnWidth }}
                onClick={() => {
                    currentPage > 1 &&
                        setCurrentPage(currentPage - 1);
                }}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>

            {visiblePages.map((page, index) =>
                page ? (
                    <PaginationItem
                        key={`page_${index}`}
                        currentPage={currentPage}
                        page={page}
                        width={columnWidth}
                        setCurrentPage={setCurrentPage}
                    />
                ) : (
                    <div
                        className={clsx(styles.page)}
                        key={`page_${index}`}
                        style={{ width: columnWidth }}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className={clsx(styles.icon)}
                        />
                    </div>
                )
            )}

            <div
                className={clsx(styles.icon, styles.page, {
                    [styles.disabled]: currentPage === totalPage,
                })}
                onClick={() => {
                    currentPage < totalPage &&
                        setCurrentPage(currentPage + 1);
                }}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
}

export default PaginationBar;
