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
import { BookOwnerBookDto, BookOwnerBorrowRequestDto } from '@/types/api';
import { toast } from 'react-hot-toast';
import { CheckIcon, XIcon } from 'lucide-react';

const BookOwnerDashboard: React.FC = () => {
    const [myBooks, setMyBooks] = useState<BookOwnerBookDto[]>([]);
    const [borrowRequests, setBorrowRequests] = useState<BookOwnerBorrowRequestDto[]>([]);

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
            console.log(data);
            setBorrowRequests(data);
        } catch {
            toast.error('Failed to fetch borrow requests.');
        }
    };

    const handleBorrowRequestAction = async (id: number, accept: boolean) => {
        try {
            await api('post', 'borrowrequests/requests', {
                data: { requestId: id, accept }
            });

            setBorrowRequests(prev => prev.filter(req => req.id !== id));
            toast.success(`Request ${accept ? 'accepted' : 'rejected'}`);
        } catch {
            toast.error('Failed to update request.');
        }
    };

    useEffect(() => {
        fetchMyBooks();
        fetchBorrowRequests();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Book Owner Dashboard</h1>

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
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" className="ml-2">
                                                    Delete
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
        </div>
    );
};

export default BookOwnerDashboard;
