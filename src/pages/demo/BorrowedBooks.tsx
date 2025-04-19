
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format, isPast, isToday } from "date-fns"
import { BookOpen, Clock, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react"
import useBorrowStore from "@/store/borrowStore"

const BorrowedBooks = () => {
    const { borrowedBooks, isLoading, error, fetchBorrowedBooks } = useBorrowStore()
    const [activeTab, setActiveTab] = useState("active")

    useEffect(() => {
        fetchBorrowedBooks()
    }, [fetchBorrowedBooks])

    // Filter books based on active tab
    const filteredBooks = borrowedBooks.filter((book) => {
        if (activeTab === "active") {
            return book.status === "active"
        } else if (activeTab === "overdue") {
            return book.status === "overdue"
        } else if (activeTab === "history") {
            return book.status === "returned"
        }
        return true
    })

    // Get status badge for a book
    const getStatusBadge = (book) => {
        const returnDate = new Date(book.returnDate)

        if (book.status === "overdue") {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Overdue
                </span>
            )
        } else if (book.status === "returned") {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Returned
                </span>
            )
        } else if (isToday(returnDate) || isPast(returnDate)) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Due Today
                </span>
            )
        } else {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Active
                </span>
            )
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Link to="/books" className="inline-flex items-center text-primary hover:text-primary/80">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Books
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">My Borrowed Books</h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`${activeTab === "active"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab("overdue")}
                        className={`${activeTab === "overdue"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Overdue
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`${activeTab === "history"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        History
                    </button>
                </nav>
            </div>

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

            {/* No Books */}
            {!isLoading && !error && filteredBooks.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No borrowed books</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {activeTab === "active"
                            ? "You don't have any active borrowed books."
                            : activeTab === "overdue"
                                ? "You don't have any overdue books."
                                : "You haven't returned any books yet."}
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/books"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Browse Books
                        </Link>
                    </div>
                </div>
            )}

            {/* Books List */}
            {!isLoading && !error && filteredBooks.length > 0 && (
                <div className="space-y-6">
                    {filteredBooks.map((borrow) => (
                        <div key={borrow.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{borrow.bookTitle}</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Borrowed from {borrow.ownerName}</p>
                                </div>
                                {getStatusBadge(borrow)}
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Borrow Date</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {format(new Date(borrow.borrowDate), "MMMM d, yyyy")}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Return Date</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {format(new Date(borrow.returnDate), "MMMM d, yyyy")}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {borrow.status === "active" && "Active - Please return by the return date"}
                                            {borrow.status === "overdue" && "Overdue - Please return as soon as possible"}
                                            {borrow.status === "returned" && "Returned - Thank you for using BookSwap"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <Link
                                    to={`/books/${borrow.bookId}`}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    View Book
                                </Link>
                                {borrow.status === "active" && (
                                    <button className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Return Book
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BorrowedBooks
