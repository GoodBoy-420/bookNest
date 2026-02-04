import Left from "../assets/left_arrow.svg";
import Right from "../assets/right_arrow.svg";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1)
    return (
      <div className="col-span-full flex justify-center">
        <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            type="button"
            aria-label="prev"
            className="rounded-full bg-slate-200/50"
          >
            <img src={Left} alt="Left Arrow" className="w-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className="h-10 w-10 flex items-center justify-center aspect-square"
                // {page === i + 1 ? "font-bold" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            type="button"
            aria-label="next"
            className="rounded-full bg-slate-200/50"
          >
            <img src={Right} alt="Right Arrow" className="w-5" />
          </button>
        </div>
      </div>
    );
};

export default Pagination;
