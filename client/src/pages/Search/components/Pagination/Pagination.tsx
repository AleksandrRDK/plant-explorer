import './Pagination.sass';

type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
};

const Pagination = ({ page, setPage, hasNextPage }: PaginationProps) => {
    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (hasNextPage) setPage(page + 1);
    };

    return (
        <div className="pagination">
            <button
                className="pagination__button"
                onClick={handlePrev}
                disabled={page === 1}
            >
                ← Назад
            </button>
            <span className="pagination__info">Страница {page}</span>
            <button
                className="pagination__button"
                onClick={handleNext}
                disabled={!hasNextPage}
            >
                Вперёд →
            </button>
        </div>
    );
};

export default Pagination;
