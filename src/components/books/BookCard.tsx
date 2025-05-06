import { useState } from "react"
import { BookOpen, Clock, ThumbsUp, ThumbsDown } from "lucide-react"
import useAuthStore from "@/store/authStore"
import bookService from "@/services/bookService"
import { Button } from "../ui/button"

interface Book {
    id: string
    title: string
    author: string
    genre: string
    language: string
    borrowPrice: number
    borrowStatus: "Available" | "Borrowed"
    coverImage?: string
    likes: number
    dislikes: number
}

const BookCard = ({ book }: { book: Book }) => {
    const { isAuthenticated } = useAuthStore()
    const [isLiking, setIsLiking] = useState(false)
    const [isDisliking, setIsDisliking] = useState(false)
    const [likes, setLikes] = useState(book.likes)
    const [dislikes, setDislikes] = useState(book.dislikes)

    const handleLike: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated()) {
            // Redirect to login or show login prompt
            return
        }

        if (isLiking) return

        setIsLiking(true)
        try {
            const response = await bookService.likeBook(book.id)
            const updatedBook: Book = {
                ...response,
                borrowStatus: response.borrowStatus === "Available" ? "Available" : "Borrowed",
            }
            setLikes(updatedBook.likes)
        } catch (error) {
            console.error("Error liking book:", error)
        } finally {
            setIsLiking(false)
        }
    }

    const handleDislike = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated()) {
            // Redirect to login or show login prompt
            return
        }

        if (isDisliking) return

        setIsDisliking(true)
        try {
            const updatedBook = await bookService.dislikeBook(book.id)
            setDislikes(updatedBook.dislikes)
        } catch (error) {
            console.error("Error disliking book:", error)
        } finally {
            setIsDisliking(false)
        }
    }

    return (
        <div className="overflow-hidden flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative pt-[60%] bg-gray-100">
                <img
                    src={book.coverImage || "/placeholder.svg"}
                    alt={`Cover of ${book.title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
                    {book.borrowStatus === "Available" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Available
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Borrowed
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{book.genre}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{book.language}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">${book.borrowPrice.toFixed(2)}</span>
                    <div className="flex space-x-2">
                        <button onClick={handleLike} className="inline-flex items-center text-gray-500 hover:text-green-600">
                            <ThumbsUp className={`h-4 w-4 ${isLiking ? "animate-pulse" : ""}`} />
                            <span className="ml-1 text-xs">{likes}</span>
                        </button>
                        <button onClick={handleDislike} className="inline-flex items-center text-gray-500 hover:text-red-600">
                            <ThumbsDown className={`h-4 w-4 ${isDisliking ? "animate-pulse" : ""}`} />
                            <span className="ml-1 text-xs">{dislikes}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t">
                <Button className="w-full" onClick={() => alert("Borrowing book...")}>
                    Borrow
                </Button>
            </div>
        </div>
    )
}

export default BookCard
