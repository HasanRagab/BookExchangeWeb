import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from '@/lib/axios';
import { BookOwnerBookDto, BookOwnerBookUpdateDto, BookOwnerBorrowRequestDto, BookPostCreateDto } from '@/types/api';
import { toast } from 'react-hot-toast';
import { CheckIcon, XIcon } from 'lucide-react';
import EditBookModal from '@/components/EditBookModal';
import CreateBookModal from '@/components/CreateBookModal';

const BookOwnerDashboard: React.FC = () => {
    const [myBooks, setMyBooks] = useState<BookOwnerBookDto[]>([]);
    const [borrowRequests, setBorrowRequests] = useState<BookOwnerBorrowRequestDto[]>([]);
    const [editingBook, setEditingBook] = useState<BookOwnerBookDto | null>(null);
    const [isCreatingBook, setIsCreatingBook] = useState(false);

    const fetchMyBooks = async () => {
        try {
            const data = await api('get', 'bookposts/bookowner/books');
            setMyBooks(data);
        } catch {
            toast.error('Failed to fetch your books.');
        }
    };

    const fetchBorrowRequests = async () => {
        try {
            const data = await api('get', 'borrowrequests/bookowner/requests');
            setBorrowRequests(data);
        } catch {
            toast.error('Failed to fetch borrow requests.');
        }
    };

    const handleBorrowRequestAction = async (id: number, accept: boolean) => {
        try {
            await api('put', 'borrowrequests/:requestId', {
                query: {
                    action: accept ? 'Accept' : 'Reject'
                },
                params: {
                    requestId: id
                }
            });
            setBorrowRequests(prev => prev.filter(req => req.id !== id));
            toast.success(`Request ${accept ? 'accepted' : 'rejected'}`);
        } catch {
            toast.error('Failed to update request.');
        }
    };

    const handleEditBook = async (id: number, updatedBook: BookOwnerBookUpdateDto) => {
        try {
            await api('put', 'bookposts/:bookId', {
                params: { bookId: id },
                data: {
                    title: updatedBook.title,
                    genre: updatedBook.genre,
                    isbn: updatedBook.isbn,
                }
            });

            setMyBooks(prev => prev.map(book =>
                book.id === id ? { ...book, ...updatedBook } : book
            ));
            setEditingBook(null);
            toast.success('Book updated successfully');
        } catch {
            toast.error('Failed to update book');
        }
    };

    const handleDeleteBook = async (bookId: number) => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            await api('delete', 'bookposts/:bookId', {
                params: { bookId }
            });

            setMyBooks(prev => prev.filter(book => book.id !== bookId));
            toast.success('Book deleted successfully');
        } catch {
            toast.error('Failed to delete book');
        }
    };

    const handleCreateBook = async (newBook: BookPostCreateDto) => {
        try {
            const formData = new FormData();
            formData.append('title', newBook.title);
            formData.append('genre', newBook.genre);
            formData.append('isbn', newBook.isbn);
            formData.append('language', newBook.language);
            formData.append('availableFrom', newBook.availableFrom);
            formData.append('availableTo', newBook.availableTo);
            formData.append('borrowPrice', newBook.borrowPrice.toString());

            if (newBook.coverImage) {
                formData.append('coverImage', newBook.coverImage);
            }

            const response = await api('post', 'bookposts', {
                data: {
                    ...newBook,
                    coverImage: newBook.coverImage ? newBook.coverImage : null
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMyBooks(prev => [...prev, response]);
            setIsCreatingBook(false);
            toast.success('Book created successfully');
        } catch {
            toast.error('Failed to create book');
        }
    };

    useEffect(() => {
        fetchMyBooks();
        fetchBorrowRequests();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Book Owner Dashboard</h1>
                <Button onClick={() => setIsCreatingBook(true)}>
                    Create New Book
                </Button>
            </div>

            <Tabs defaultValue="myBooks" className="space-y-4">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="myBooks">My Book Posts</TabsTrigger>
                    <TabsTrigger value="borrowRequests">Borrow Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="myBooks">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Book Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Genre</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myBooks.map(book => (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.title}</TableCell>
                                            <TableCell>{book.genre}</TableCell>
                                            <TableCell>
                                                {book.isApprovedByAdmin ? 'Approved' : 'Pending'}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setEditingBook(book)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    disabled={!book.isAvailable}
                                                    variant="destructive"
                                                    size="sm"
                                                    className="ml-2"
                                                    onClick={() => handleDeleteBook(book.id)}
                                                >
                                                    {
                                                        book.isAvailable ? 'Delete' : 'Unavailable'
                                                    }
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="borrowRequests">
                    <Card>
                        <CardHeader>
                            <CardTitle>Borrow Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Book</TableHead>
                                        <TableHead>Borrower</TableHead>
                                        <TableHead>Start</TableHead>
                                        <TableHead>End</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {borrowRequests.map(request => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.bookTitle}</TableCell>
                                            <TableCell>{request.borrowerName}</TableCell>
                                            <TableCell>{request.startDate}</TableCell>
                                            <TableCell>{request.endDate}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleBorrowRequestAction(request.id, true)}
                                                    >
                                                        <CheckIcon className="h-4 w-4 text-green-500" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleBorrowRequestAction(request.id, false)}
                                                    >
                                                        <XIcon className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {editingBook && (
                <EditBookModal
                    book={editingBook}
                    isOpen={!!editingBook}
                    onClose={() => setEditingBook(null)}
                    onSave={(updatedBook) => {
                        if (editingBook) {
                            handleEditBook(editingBook.id, updatedBook);
                        }
                    }}
                />
            )}

            <CreateBookModal
                isOpen={isCreatingBook}
                onClose={() => setIsCreatingBook(false)}
                onCreate={handleCreateBook}
            />
        </div>
    );
};

export default BookOwnerDashboard;