"use client";

import { SwitchToggleProps } from "@/app/lib/types/utils";

export function SwitchToggle({
  checkedInitial = false,
  onChange,
  textLeft,
  textRight,
  iconLeft,
  iconRight,
  name,
  title,
}: SwitchToggleProps) {


  return (
    <div>
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={name}
      >
        {title}
      </label>
      <div className="flex items-center width-full align-middle">
        {textLeft && <span className={`text-xs text-right mr-2 ${checkedInitial ? 'text-gray-400' : 'text-blue-600'}`}>{textLeft}</span>}
        {iconLeft && <span className={checkedInitial? "text-gray-400" : "text-blue-600"}>{iconLeft}</span>}
        <input
          type="checkbox"
          className= {`
          border-gray-400
          h-5 w-10 mx-5 cursor-pointer rounded-full bg-blue-600 
          relative
          focus:bg-blue-600
          hover:bg-blue-400
          ${checkedInitial ? 'bg-green-600 hover:bg-green-500 before:translate-x-5' : ''}
          before:absolute before:top-0.5 before:left-0.5
          before:h-4 before:w-4 before:rounded-full before:bg-white
          before:transition-all
          checked:bg-none
          checked:bg-green-600 
          checked:focus:bg-green-600
          checked:hover:bg-green-500
          checked:before:translate-x-5
          checked:outline-green-600
          `}
          name={name}
          id= {name}
          checked={checkedInitial}
          onChange={() => onChange && onChange(!checkedInitial)}
        />
        {iconRight && <span className={checkedInitial? "text-green-600" : "text-gray-400"}>{iconRight}</span>}
        {textRight && <span className={`text-xs text-left ml-2 ${checkedInitial ? 'text-green-600' : 'text-gray-400'}`}>{textRight}</span>}
      </div>
    </div>
  );
}
