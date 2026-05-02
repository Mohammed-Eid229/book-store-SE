import { createContext, useContext, useState, type ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  icon?: string;
  image?: string;
  booksCount: number;
  description?: string;
}

interface CategoriesContextType {
  categories: Category[];
  addCategory: (name: string, description?: string, image?: string) => void;
  updateCategory: (id: number, name: string, description?: string, image?: string) => void;
  deleteCategory: (id: number) => void;
}

const initialCategories: Category[] = [
  { id: 1, name: "Drama", icon: "🎭", booksCount: 9, description: "Drama books" },
  { id: 2, name: "Fantasy", icon: "🧙", booksCount: 4, description: "Fantasy books" },
  { id: 3, name: "Children", icon: "🧸", booksCount: 2, description: "Children books" },
  { id: 4, name: "Science", icon: "🔬", booksCount: 0, description: "Science books" },
  { id: 5, name: "History", icon: "📜", booksCount: 0, description: "History books" },
  { id: 6, name: "Romance", icon: "💕", booksCount: 0, description: "Romance books" },
];

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (name: string, description?: string, image?: string) => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name, description, image, booksCount: 0, icon: "📁" },
    ]);
  };

  const updateCategory = (id: number, name: string, description?: string, image?: string) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, name, description, image } : c));
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error("useCategories must be used inside CategoriesProvider");
  return ctx;
}
