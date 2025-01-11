import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface MultiSelectDropdownProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        const fetchedCategories = response.data.map((category: any) => category.name);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) =>
        prev.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="col-span-1 relative" ref={dropdownRef}>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Categories
      </label>
      {/* Dropdown Header */}
      <div
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedCategories.length > 0
          ? selectedCategories.join(", ")
          : "Select categories"}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2 max-h-40 overflow-y-auto">
            {categories.length === 0 && !error ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              categories.map((category) => (
                <div key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={category}
                    className="ml-2 text-sm font-light text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
