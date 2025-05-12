import { useEffect, useState, ChangeEvent, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import debounce from 'lodash/debounce';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import api from '@/lib/axios';
import { BookPostResponseDto } from '@/types/api';

export default function Home() {
    const [state, setState] = useState<
        {
            books: BookPostResponseDto[];
            loading: boolean;
            error: string | null;
            page: number;
            pageSize: number;
            totalPages: number;
            search: string;
            sort: 'asc' | 'desc';
        }
    >({
        books: [],
        loading: false,
        error: null as string | null,
        page: 1,
        pageSize: 8,
        totalPages: 1,
        search: '',
        sort: 'asc',
    });

    const debouncedSearch = useMemo(() =>
        debounce((value: string) => {
            setState(prev => ({ ...prev, search: value, page: 1 }));
        }, 500),
        []);

    const fetchBooks = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const data = await api("get", "bookposts/available-books", {
                query: {
                    pageNumber: state.page,
                    pageSize: state.pageSize,
                    searchValue: state.search,
                    sortDirection: state.sort,
                }
            });
            console.log(data);
            setState(prev => ({ ...prev, books: data.items, totalPages: data.totalPages || 1, loading: false }));
        } catch {
            setState(prev => ({ ...prev, error: 'Failed to fetch books.', loading: false }));
        }
    }, [state.page, state.pageSize, state.search, state.sort]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value);
    const handlePageChange = (newPage: number) => newPage >= 1 && newPage <= state.totalPages && setState(prev => ({ ...prev, page: newPage }));
    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, sort: e.target.value as 'asc' | 'desc', page: 1 }));

    const renderPagination = () => {
        const pages = Array.from({ length: state.totalPages }, (_, i) => i + 1).map(i => (
            <PaginationItem key={i}>
                <PaginationLink onClick={() => handlePageChange(i)} isActive={state.page === i}>{i}</PaginationLink>
            </PaginationItem>
        ));

        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(state.page - 1)} className={state.page === 1 ? 'pointer-events-none opacity-50' : ''} />
                    </PaginationItem>
                    {pages}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(state.page + 1)} className={state.page === state.totalPages ? 'pointer-events-none opacity-50' : ''} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Input
                            type="text"
                            placeholder="Search books..."
                            onChange={handleSearchChange}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={state.sort}
                        onChange={handleSortChange}
                        className="border rounded-md p-2"
                    >
                        <option value="asc">Sort: A-Z</option>
                        <option value="desc">Sort: Z-A</option>
                    </select>
                </div>
            </section>

            {state.loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            )}

            {state.error && (
                <div className="text-center text-red-500 mb-6">
                    {state.error}
                    <Button variant="outline" onClick={fetchBooks} className="ml-4">
                        Retry
                    </Button>
                </div>
            )}

            {!state.loading && !state.error && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
                    {state.books.length === 0 && (
                        <p className="text-center text-gray-500">No books found.</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {state.books.map((book) => (
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

            <section className="flex justify-center mt-8">
                {renderPagination()}
            </section>
        </div>
    );
}