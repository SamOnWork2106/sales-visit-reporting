import { useState } from "react";

interface Props {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectWithCustom({
  placeholder,
  value,
  options,
  onChange,
}: Props) {
  const [custom, setCustom] = useState(
    !options.includes(value) && value !== ""
  );

  return (
    <div className="space-y-3">
      <select
        value={custom ? "Custom..." : value}
        onChange={(e) => {
          const selected = e.target.value;

          if (selected === "Custom...") {
            setCustom(true);
            onChange("");
          } else {
            setCustom(false);
            onChange(selected);
          }
        }}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      {custom && (
        <input
          type="text"
          placeholder={`Enter ${placeholder}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      )}
    </div>
  );
}