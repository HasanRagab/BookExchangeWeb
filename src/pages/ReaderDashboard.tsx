import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/axios';
import { BorrowRequestResponseDto } from '@/types/api';
import { toast } from 'react-hot-toast';

const ReaderDashboard: React.FC = () => {
    const [borrowRequests, setBorrowRequests] = useState<BorrowRequestResponseDto[]>([]);
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowRequestResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState({
        requests: false,
        borrows: false,
    });

    const fetchBorrowRequests = async () => {
        try {
            setIsLoading(prev => ({ ...prev, requests: true }));
            const data = await api('get', '/reader/my-borrow-requests');
            setBorrowRequests(data);
        } catch {
            toast.error('Failed to fetch borrow requests');
        } finally {
            setIsLoading(prev => ({ ...prev, requests: false }));
        }
    };

    const fetchBorrows = async () => {
        try {
            setIsLoading(prev => ({ ...prev, borrows: true }));
            const data = await api('get', '/reader/my-borrows');
            setBorrowedBooks(data);
        } catch {
            toast.error('Failed to fetch borrowed books');
        } finally {
            setIsLoading(prev => ({ ...prev, borrows: false }));
        }
    };

    useEffect(() => {
        fetchBorrowRequests();
        fetchBorrows();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Reader Dashboard</h1>

            <Tabs defaultValue="requests" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="requests">My Requests</TabsTrigger>
                    <TabsTrigger value="borrows">My Borrows</TabsTrigger>
                </TabsList>

                <TabsContent value="requests">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Borrow Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Book Title</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading.requests ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                                        </TableRow>
                                    ) : borrowRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">No requests found</TableCell>
                                        </TableRow>
                                    ) : (
                                        borrowRequests.map(req => (
                                            <TableRow key={req.id}>
                                                <TableCell>{req.bookTitle}</TableCell>
                                                <TableCell>{new Date(req.startDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(req.endDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{req.isAccepted ? 'Accepted' : 'Pending'}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="borrows">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Borrowed Books</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Book Title</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading.borrows ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                                        </TableRow>
                                    ) : borrowedBooks.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">No borrowed books</TableCell>
                                        </TableRow>
                                    ) : (
                                        borrowedBooks.map(borrow => (
                                            <TableRow key={borrow.id}>
                                                <TableCell>{borrow.bookTitle}</TableCell>
                                                <TableCell>{new Date(borrow.startDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(borrow.endDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{borrow.isAccepted ? 'Ongoing' : 'Unknown'}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ReaderDashboard;
