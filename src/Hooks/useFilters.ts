import { useState, useMemo } from "react";

interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  price: number;
  img: string;
  status: string;
  brand?: string;
}

interface Filters {
  minPrice: string;
  maxPrice: string;
  types: string[];
  statuses: string[];
  brands: string[];
}

type FilterType = "types" | "statuses" | "brands";

export function useFilters(allBooks: Book[]) {
  // 🔹 initial state (clean + reusable)
  const initialFilters: Filters = {
    minPrice: "",
    maxPrice: "",
    types: [],
    statuses:[],
    brands: [],
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  // 🔹 price change
  const setPrice = (field: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 checkbox toggle
  const toggleFilter = (filterType: FilterType, value: string) => {
    setFilters((prev) => {
      const exists = prev[filterType].includes(value);

      return {
        ...prev,
        [filterType]: exists
          ? prev[filterType].filter((v) => v !== value)
          : [...prev[filterType], value],
      };
    });
  };

  // 🔹 apply filters (manual trigger)
  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  // 🔹 filtering logic
  const filteredBooks = useMemo(() => {
    
    const min = appliedFilters.minPrice? Number(appliedFilters.minPrice): 0;
    const max = appliedFilters.maxPrice? Number(appliedFilters.maxPrice): Infinity;

    return allBooks.filter((book) => {
      const matchPrice = book.price >= min && book.price <= max;

      const category = (book.category || "").toLowerCase();
      const status = (book.status || "").toLowerCase();
      const brand = (book.brand || "").toLowerCase();

      const matchType =
        appliedFilters.types.length === 0 ||
        appliedFilters.types.includes(category);

      const matchStatus =
        appliedFilters.statuses.length === 0 ||
        appliedFilters.statuses.includes(status);

      const matchBrand =
        appliedFilters.brands.length === 0 ||
        appliedFilters.brands.includes(brand);

      return matchPrice && matchType && matchStatus && matchBrand;
    });
  }, [allBooks, appliedFilters]);

  return {
    filters,
    setPrice,
    toggleFilter,
    applyFilters,
    filteredBooks,
  };
}