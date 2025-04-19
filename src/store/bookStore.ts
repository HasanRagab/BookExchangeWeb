import { create } from "zustand";
import { bookService } from "../services/bookService";

const useBookStore = create((set, get) => ({
  books: [],
  filteredBooks: [],
  isLoading: false,
  error: null,
  searchParams: {
    query: "",
    genre: "",
    language: "",
    maxPrice: null,
    availability: null,
  },

  // Fetch all books
  fetchBooks: async () => {
    set({ isLoading: true, error: null });
    try {
      const books = await bookService.getAllBooks();
      set({ books, filteredBooks: books, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Search books with filters
  searchBooks: async (params) => {
    set({
      isLoading: true,
      error: null,
      searchParams: { ...get().searchParams, ...params },
    });
    try {
      const books = await bookService.searchBooks(get().searchParams);
      set({ filteredBooks: books, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Reset search filters
  resetFilters: () => {
    set({
      searchParams: {
        query: "",
        genre: "",
        language: "",
        maxPrice: null,
        availability: null,
      },
      filteredBooks: get().books,
    });
  },

  // Get book by ID
  getBookById: (id) => {
    return get().books.find((book) => book.id === id) || null;
  },

  // Clear errors
  clearErrors: () => set({ error: null }),
}));

export default useBookStore;
