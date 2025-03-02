import React, {useState} from "react";

interface SvgProps {
  text: string;
  setActiveLabel: React.Dispatch<React.SetStateAction<string>>;
  activeLabel: string;
}

export const MyIcon: React.FC<SvgProps> = ({text, activeLabel, setActiveLabel}) => {
  const [toggleSortingOrder, setToggleSortingOrder] = useState(false);

  const handleActive = (name: string) => {
    setActiveLabel(name)
    setToggleSortingOrder(prevState => !prevState)
  };

  return (
    <span className={`flex hover:cursor-pointer ${(activeLabel === text) && "font-extrabold"}`}
          onClick={() => handleActive(text)}>{text}
      {toggleSortingOrder ?
        <svg data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20" fill="none"
             stroke-width={`${(activeLabel === text) ? "3" : "2"}`}
             stroke="currentColor" aria-hidden="true" className="w-3 h-3">
          <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 20" fill="none"
                      stroke-width={`${(activeLabel === text) ? "3" : "2"}`}
                      stroke="currentColor" aria-hidden="true" className="w-3 h-3">
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"/>
        </svg>}
    </span>
  )
}

