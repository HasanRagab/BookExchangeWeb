import React, { useState, useEffect } from 'react';
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
import {
    PendingRegistrationDto,
    BookPostResponseDto,
    ApproveRejectDto,
    ManageBookPostDto
} from '@/types/api';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
    const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistrationDto[]>([]);
    const [bookPostRequests, setBookPostRequests] = useState<BookPostResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState({
        registrations: false,
        bookPosts: false
    });

    const fetchPendingRegistrations = async () => {
        try {
            setIsLoading(prev => ({ ...prev, registrations: true }));
            const registrations = await api('get', '/admin/pending-registrations');
            setPendingRegistrations(registrations);
        } catch {
            toast.error('Failed to fetch pending registrations');
        } finally {
            setIsLoading(prev => ({ ...prev, registrations: false }));
        }
    };

    const fetchBookPostRequests = async () => {
        try {
            setIsLoading(prev => ({ ...prev, bookPosts: true }));
            const bookPosts = await api('get', '/admin/book-posts-requests');
            setBookPostRequests(bookPosts);
        } catch {
            toast.error('Failed to fetch book post requests');
        } finally {
            setIsLoading(prev => ({ ...prev, bookPosts: false }));
        }
    };

    const handleRegistrationAction = async (registration: PendingRegistrationDto, approve: boolean) => {
        try {
            const data: ApproveRejectDto = {
                pendingRegistrationId: registration.id,
                approve
            };

            await api('post', '/admin/manage-registration', { data });

            setPendingRegistrations(prev =>
                prev.filter(reg => reg.id !== registration.id)
            );

            toast.success(`Registration ${approve ? 'approved' : 'rejected'}`);
        } catch {
            toast.error('Failed to process registration');
        }
    };

    const handleBookPostAction = async (bookPost: BookPostResponseDto, approve: boolean) => {
        try {
            const payload: ManageBookPostDto = {
                bookPostId: bookPost.id,
                approve
            };

            await api('post', '/admin/manage-book-post', { data: payload });

            setBookPostRequests(prev =>
                prev.filter(post => post.id !== bookPost.id)
            );

            toast.success(`Book post ${approve ? 'approved' : 'rejected'}`);
        } catch {
            toast.error('Failed to process book post');
        }
    };

    useEffect(() => {
        fetchPendingRegistrations();
        fetchBookPostRequests();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <Tabs defaultValue="registrations" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="registrations">Pending Registrations</TabsTrigger>
                    <TabsTrigger value="bookPosts">Book Post Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="registrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading.registrations ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : pendingRegistrations.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No pending registrations
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pendingRegistrations.map(registration => (
                                            <TableRow key={registration.id}>
                                                <TableCell>{`${registration.firstName} ${registration.lastName}`}</TableCell>
                                                <TableCell>{registration.email}</TableCell>
                                                <TableCell>{registration.role}</TableCell>
                                                <TableCell>{new Date(registration.createdAt).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleRegistrationAction(registration, true)}
                                                        >
                                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleRegistrationAction(registration, false)}
                                                        >
                                                            <XIcon className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Book Post Requests Tab */}
                <TabsContent value="bookPosts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Book Post Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Genre</TableHead>
                                        <TableHead>ISBN</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading.bookPosts ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ) : bookPostRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No book post requests
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        bookPostRequests.map(bookPost => (
                                            <TableRow key={bookPost.id}>
                                                <TableCell>{bookPost.title}</TableCell>
                                                <TableCell>{bookPost.bookOwnerName}</TableCell>
                                                <TableCell>{bookPost.genre}</TableCell>
                                                <TableCell>{bookPost.isbn}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleBookPostAction(bookPost, true)}
                                                        >
                                                            <CheckIcon className="h-4 w-4 text-green-500" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleBookPostAction(bookPost, false)}
                                                        >
                                                            <XIcon className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
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

export default AdminDashboard;