import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Search, Filter, X } from "lucide-react"
import BookCard from "@/components/books/BookCard"
import useBookStore from "@/store/bookStore"
import bookService from "@/services/bookService"

const BookSearch = () => {
  const { books, filteredBooks, isLoading, error, fetchBooks, searchBooks, resetFilters } = useBookStore()
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      query: "",
      genre: "",
      language: "",
      maxPrice: "",
      availability: "",
    },
  })

  // Watch form values for real-time filtering
  const formValues = watch()

  useEffect(() => {
    // Fetch books on component mount
    fetchBooks()

    // Fetch genres and languages
    const fetchFilters = async () => {
      try {
        const genresData = await bookService.getGenres()
        const languagesData = await bookService.getLanguages()
        setGenres(genresData)
        setLanguages(languagesData)
      } catch (error) {
        console.error("Error fetching filters:", error)
      }
    }

    fetchFilters()
  }, [fetchBooks])

  // Handle search and filter
  const onSubmit = (data) => {
    // Convert maxPrice to number if provided
    const params = {
      ...data,
      maxPrice: data.maxPrice ? Number.parseFloat(data.maxPrice) : null,
    }
    searchBooks(params)
  }

  // Handle filter reset
  const handleResetFilters = () => {
    reset({
      query: "",
      genre: "",
      language: "",
      maxPrice: "",
      availability: "",
    })
    resetFilters()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Your Next Book</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              {...register("query")}
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Search
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Reset Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select
                  id="genre"
                  {...register("genre")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  {...register("language")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">All Languages</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Borrow Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  {...register("maxPrice")}
                  min="0"
                  step="0.01"
                  placeholder="Any price"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  {...register("availability")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">All Books</option>
                  <option value="available">Available Now</option>
                  <option value="borrowed">Currently Borrowed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Active Filters */}
      {(formValues.query ||
        formValues.genre ||
        formValues.language ||
        formValues.maxPrice ||
        formValues.availability) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {formValues.query && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                Search: {formValues.query}
              </span>
            )}
            {formValues.genre && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                Genre: {formValues.genre}
              </span>
            )}
            {formValues.language && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                Language: {formValues.language}
              </span>
            )}
            {formValues.maxPrice && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                Max Price: ${formValues.maxPrice}
              </span>
            )}
            {formValues.availability && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                {formValues.availability === "available" ? "Available Now" : "Currently Borrowed"}
              </span>
            )}
          </div>
        )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && !error && (
        <p className="text-gray-600 mb-6">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
        </p>
      )}

      {/* Books Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default BookSearch
