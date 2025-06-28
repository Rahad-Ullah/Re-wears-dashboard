/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const TablePagination = ({ table, meta }) => {
  const page = meta?.page;
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
      {/* <div className="md:absolute text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex justify-center flex-1">
        <Pagination className="text-[#A7A7A7]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  updateSearchParams("page", page > 1 ? `${page - 1}` : "1")
                }
                className={page <= 1 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>

            {getPageNumbers(page, meta?.totalPage, 10).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => updateSearchParams("page", `${pageNumber}`)}
                  className={`transition-colors duration-500 ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "text-gray-400"
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  updateSearchParams(
                    "page",
                    page < meta?.totalPage
                      ? `${page + 1}`
                      : `${meta?.totalPage}`
                  )
                }
                className={
                  page >= meta?.totalPage ? "cursor-not-allowed opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;

function getPageNumbers(currentPage, totalPages, windowSize = 10) {
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (end - start + 1 < windowSize) {
    if (start === 1) {
      end = Math.min(totalPages, end + (windowSize - (end - start + 1)));
    } else if (end === totalPages) {
      start = Math.max(1, start - (windowSize - (end - start + 1)));
    }
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
