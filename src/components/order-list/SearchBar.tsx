import React, {useState} from 'react';
import {Button} from "@material-tailwind/react";

interface SearchBarProps {
  updateParams: (key: string, value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({updateParams}) => {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="w-full min-w-[300px] max-w-[300px] inline-block">
        <div className="relative flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"
               className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
            <path fill-rule="gray"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="gray"/>
          </svg>

          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
               stroke="rgb(48,48,48)"
               className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600 hover:cursor-pointer hover:scale-110"
               onClick={() => {
                 setSearch("");
                 updateParams("search", "")
               }}>

            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#303030CCCCCC"
               stroke-width="0.144"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M19 5L5 19M5.00001 5L19 19" stroke="#303030" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </g>
          </svg>

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search by Order#, Name, Email"
          />

          &nbsp;
        </div>
      </div>
      <Button className="min-w-[80px] px-8" onClick={() => {
        updateParams("search", search)
      }}>
        Search
      </Button>

    </>
  );
}

export default SearchBar;