import React from "react";
import {Button, IconButton} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPage, setCurrentPage}) => {
  const getItemProps = (index: number) => ({
    variant: currentPage === index ? "filled" : "text",
    onClick: () => setCurrentPage(index),
  } as any);

  const next = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (

    <div className="flex items-center gap-4 ">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({length: totalPage}, (_, index) => (
          <IconButton key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}

      </div>

      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPage}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
      </Button>
    </div>
  );
};

export default Pagination;
