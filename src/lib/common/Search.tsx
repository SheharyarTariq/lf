import React, {useCallback, useState} from 'react';
import {ThemeProvider} from "@material-tailwind/react";
import debounce from "lodash/debounce";

interface SearchBarProps {
  updateParams: (key: string, value: string) => void;
}

const Search: React.FC<SearchBarProps> = ({updateParams}) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  }

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      updateParams("search", searchValue)
    }, 300),
    [updateParams]
  );

  return (
    <>
      <label htmlFor="search" className="font-medium text-sm">Search</label>
      <div className="grid grid-cols-12">
        <div
          className="border border-[#DCDFE4] px-3 py-2 rounded-xl relative xl:col-span-9 md:col-span-8 sm:col-span-6 col-span-12">
          <img src="/assets/magnifiyingGlass.svg" alt="search icon" className="w-6 h-6 absolute"/>
          <input id="search" type="text" className="outline-none px-8 w-full" placeholder="Search by user and address"
                 value={search} onChange={handleSearch}/>
          {search &&
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                 stroke="rgb(48,48,48)"
                 className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600 hover:cursor-pointer hover:scale-110"
                 onClick={() => {
                   setSearch("");
                   updateParams("search", "")
                 }}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#303030CCCCCC"
                 strokeWidth="0.144"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M19 5L5 19M5.00001 5L19 19" stroke="#303030" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"></path>
              </g>
            </svg>}
        </div>
        <div className="xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 items-center flex sm:pl-4">
          <input type="checkbox" className=" h-5 w-5 my-2.5 sm:mx-2.5 mr-2.5"/>
          <label htmlFor="" className="text-sm font-medium whitespace-nowrap "> Only show verified users</label>
        </div>
      </div>
    </>
  );
}

export default Search;