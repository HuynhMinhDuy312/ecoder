import clsx from 'clsx';
import styles from './PaginationItem.module.scss';

function PaginationItem({ setCurrentPage, currentPage, page, width }) {
    return (
        <div
            className={clsx(styles.page)}
            style={{ width }}
            onClick={() => setCurrentPage(page)}
        >
            <span
                className={clsx(styles.pageText, {
                    [styles.pageSelected]: currentPage === page,
                })}
            >
                {page}
            </span>
        </div>
    );
}

export default PaginationItem;
