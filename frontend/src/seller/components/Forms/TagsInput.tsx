import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Tags
      </label>
      <div className="flex flex-wrap items-center gap-2 border px-3 py-2 rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            <span className="text-sm">{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-blue-700 hover:text-blue-900 p-1 rounded-full"
              style={{ fontSize: "16px" }} // Touch-friendly icon size
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <input
          type="text"
          id="tags"
          placeholder="Press Enter to add tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
          className="flex-grow outline-none border-none bg-transparent focus:ring-0 text-sm"
        />
      </div>
    </div>
  );
};

export default TagsInput;
