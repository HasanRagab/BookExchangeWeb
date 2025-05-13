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
import { api } from '@/lib/axios';
import { BorrowedBookByReaderDto } from '@/types/api';
import { toast } from 'react-hot-toast';

const ReaderDashboard: React.FC = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBookByReaderDto[]>([]);
    const [isLoading, setIsLoading] = useState({
        requests: false,
        borrows: false,
    });

    const fetchBorrows = async () => {
        try {
            setIsLoading(prev => ({ ...prev, borrows: true }));
            const data = await api('get', 'bookposts/reader/borrowed-books');
            setBorrowedBooks(data);
        } catch {
            toast.error('Failed to fetch borrowed books');
        } finally {
            setIsLoading(prev => ({ ...prev, borrows: false }));
        }
    };

    useEffect(() => {
        fetchBorrows();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Reader Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>My Borrowed Books</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Book Title</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
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
                                    <TableRow key={borrow.bookId}>
                                        <TableCell>{borrow.title}</TableCell>
                                        <TableCell>{borrow.bookOwnerName}</TableCell>
                                        <TableCell>{new Date(borrow.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(borrow.endDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReaderDashboard;
