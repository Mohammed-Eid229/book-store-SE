import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axiosClient from "../Api/axiosClient";

export interface Category {
  id: number;
  name: string;
  icon?: string;
  image?: string;
  imagePath?: string;
  booksCount: number;
  description?: string;
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  refresh: () => void;
  addCategory: (name: string, description?: string, image?: string) => void;
  updateCategory: (id: number, name: string, description?: string, image?: string) => void;
  deleteCategory: (id: number) => void;
}

const mockCategories: Category[] = [
  { id: 1, name: "Drama",    booksCount: 0 },
  { id: 2, name: "Fantasy",  booksCount: 0 },
  { id: 3, name: "Children", booksCount: 0 },
  { id: 4, name: "Science",  booksCount: 0 },
  { id: 5, name: "History",  booksCount: 0 },
  { id: 6, name: "Romance",  booksCount: 0 },
  { id: 7, name: "Action",   booksCount: 0 },
  { id: 8, name: "Comedy",   booksCount: 0 },
];

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  // ✅ نبدأ بـ false لأن عندنا mock data جاهزة — مش هنعرض loading screen فاضية
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    // ✅ مش بنعمل setLoading(true) عشان مش نخفي الـ mock data
    try {
      const res = await axiosClient.get('/categories');
      const list: Category[] = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.categories || [];

      // لو الـ API رجع data حقيقية استخدمها، لو لأ إبقى على الـ mock
      if (list.length > 0) {
        setCategories(list);
      }
    } catch {
      // API فشل — إبقى على الـ mock data الموجودة
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = (name: string, description?: string, image?: string) => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name, description, image, booksCount: 0 },
    ]);
  };

  const updateCategory = (id: number, name: string, description?: string, image?: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, description, image } : c))
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoriesContext.Provider value={{
      categories,
      loading,
      refresh: fetchCategories,
      addCategory,
      updateCategory,
      deleteCategory,
    }}>
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
