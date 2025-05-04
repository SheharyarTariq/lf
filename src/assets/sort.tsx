import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

interface SvgProps {
  text: string;
  setActiveLabel: React.Dispatch<React.SetStateAction<string>>;
  activeLabel: string;
  updateParams: (key: string, value: string) => void;
}

export const MyIcon: React.FC<SvgProps> = ({
                                             text,
                                             activeLabel,
                                             setActiveLabel,
                                             updateParams
                                           }) => {
  const [toggleSortingOrder, setToggleSortingOrder] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (activeLabel !== text) {
      setToggleSortingOrder(false)
    }
  }, [activeLabel]);

  const handleActive = (name: string) => {
    setActiveLabel(name);
    setToggleSortingOrder(prevState => {
      const newToggleState = !prevState;

      let value = "";
      if (text === "Order#") value = "number";
      else if (text === "Status") value = "status";
      else if (text === "Created At") value = "created_at";
      else if (text === "Pickup") value = "pickup_date";
      else if (text === "Dropoff") value = "dropoff_date";

      // Single call to setSearchParams — no stale prev
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);

        if (value) {
          params.set("orderBy", value);
        } else {
          params.delete("orderBy");
        }

        const isSameLabel = text === activeLabel;
        const direction = isSameLabel
          ? (newToggleState ? "desc" : "asc")
          : "desc";

        params.set("orderDirection", direction);

        params.delete("page");

        return params;
      });

      return newToggleState;
    });
  };

  return (
    <span className={`flex hover:cursor-pointer ${(activeLabel === text) && "font-extrabold"}`}
          onClick={() => handleActive(text)}>{text}
      {toggleSortingOrder ?
        <svg data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20" fill="none"
             strokeWidth={`${(activeLabel === text) ? "3" : "2"}`}
             stroke="currentColor" aria-hidden="true" className="w-3 h-3">
          <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/>
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 20" fill="none"
             strokeWidth={`${(activeLabel === text) ? "3" : "2"}`} stroke="currentColor" aria-hidden="true"
             className="w-3 h-3">
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"/>
        </svg>
      }
    </span>
  )
}