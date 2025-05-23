import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Loader2 } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import api from '@/lib/axios';
import { BookPostResponseDto } from '@/types/api';

export default function Home() {
    const { user } = useAuthStore();
    const [searchResults, setSearchResults] = useState<BookPostResponseDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api("get", "bookposts/available-books");
            setSearchResults(data.items);
        } catch {
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Available Books</h1>
                {
                    user ? (
                        <Link to="/books" className="text-blue-500 hover:underline">
                            <Button variant="outline" className="flex items-center">
                                <Book className="mr-2" />
                                View Books
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 mb-6">
                    {error}
                    <Button variant="outline" onClick={fetchBooks} className="ml-4">
                        Retry
                    </Button>
                </div>
            )}

            {!loading && !error && (
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Books</h2>
                    </div>

                    {searchResults.length === 0 && (
                        <p className="text-center text-gray-500">No books found.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((book) => (
                            <Card
                                key={book.id}
                                className="h-full flex flex-col hover:shadow-lg p-0 transition-shadow"
                            >
                                <CardHeader className="p-0">
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`}
                                        alt={book.title}
                                        className="h-48 w-full object-cover rounded-t-md"
                                    />
                                </CardHeader>
                                <CardContent className="flex-grow p-4 space-y-1">
                                    <CardTitle className="text-lg font-semibold">
                                        {book.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-500">
                                        by {book.bookOwnerName}
                                    </CardDescription>
                                    <p className="text-sm text-gray-700">Genre: {book.genre}</p>
                                    <p className="text-sm text-gray-700">
                                        Language: {book.language}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Price:{" "}
                                        <span className="font-medium">${book.borrowPrice}</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Available until:{" "}
                                        {new Date(book.availableTo).toLocaleDateString()}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link to={`/books/${book.id}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}