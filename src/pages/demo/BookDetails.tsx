// pages/BookDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, MessageSquare, ChevronLeft, BookOpen, AlertCircle } from "lucide-react";

// Mock book data
const bookData = {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: '/api/placeholder/300/450',
    description: `First published in 1925, F. Scott Fitzgerald's "The Great Gatsby" is set in New York during the Roaring Twenties. The novel follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Narrated by Nick Carraway, the story explores themes of decadence, idealism, social upheaval, resistance to change, and excess.`,
    genre: 'Classic Literature',
    published: '1925',
    pages: 180,
    language: 'English',
    isbn: '9780743273565',
    condition: 'Good',
    owner: {
        id: '101',
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        rating: 4.8,
        responseRate: '95%'
    },
    available: true,
    location: 'West Village, NYC',
    borrowingPeriod: '3 weeks',
    reviews: [
        {
            id: '201',
            user: { name: 'Michael P.', avatar: '/api/placeholder/40/40' },
            rating: 5,
            date: '2023-10-15',
            comment: 'The book was in excellent condition, and Sarah was very accommodating with pickup times.'
        },
        {
            id: '202',
            user: { name: 'Elena R.', avatar: '/api/placeholder/40/40' },
            rating: 4,
            date: '2023-09-02',
            comment: 'Great experience borrowing this classic. Would borrow from this owner again.'
        }
    ]
};

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(bookData);
    const [isLoading, setIsLoading] = useState(false);
    const [borrowRequestMessage, setBorrowRequestMessage] = useState('');

    useEffect(() => {
        // In a real app, fetch book data based on id
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setBook(bookData);
            setIsLoading(false);
        }, 500);
    }, [id]);

    const handleBorrowRequest = () => {
        // In a real app, send the borrow request to the API
        console.log('Borrow request sent:', borrowRequestMessage);
        // Show success message or redirect
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/books" className="flex items-center text-blue-600 mb-6 hover:underline">
                <ChevronLeft size={16} />
                <span>Back to Books</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Book Image and Actions */}
                <div className="md:col-span-1">
                    <div className="sticky top-6">
                        <div className="flex justify-center mb-6">
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="rounded-lg shadow-lg max-h-96"
                            />
                        </div>

                        <div className="space-y-4">
                            {book.available ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full">Request to Borrow</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Borrow Request</DialogTitle>
                                            <DialogDescription>
                                                Send a message to the book owner with your borrowing request.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Textarea
                                                placeholder="Hello! I'm interested in borrowing this book..."
                                                className="min-h-[100px]"
                                                value={borrowRequestMessage}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBorrowRequestMessage(e.target.value)}
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleBorrowRequest}>Send Request</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="w-full" variant="outline" disabled>
                                            <AlertCircle className="mr-2 h-4 w-4" />
                                            Currently Unavailable
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Book Unavailable</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This book is currently borrowed by another user. You can add it to your wishlist and we'll notify you when it becomes available.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>Add to Wishlist</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            <Button variant="outline" className="w-full">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Owner
                            </Button>
                        </div>

                        {/* Owner Information */}
                        <Card className="mt-6">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar>
                                        <AvatarImage src={book.owner.avatar} alt={book.owner.name} />
                                        <AvatarFallback>{book.owner.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{book.owner.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="gold" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                            {book.owner.rating} • {book.owner.responseRate} response
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Location:</span>
                                        <span>{book.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Borrowing period:</span>
                                        <span>{book.borrowingPeriod}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Book Details */}
                <div className="md:col-span-2">
                    <div className="mb-4">
                        <Badge variant="outline" className="mb-2">{book.genre}</Badge>
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>

                        <div className="flex items-center gap-2 mb-6">
                            <Badge variant={book.available ? "default" : "destructive"} className="py-1">
                                {book.available ? "Available" : "Currently Borrowed"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                <BookOpen className="inline mr-1 h-4 w-4" />
                                {book.pages} pages
                            </span>
                            <span className="text-sm text-gray-500">
                                <CalendarIcon className="inline mr-1 h-4 w-4" />
                                Published {book.published}
                            </span>
                        </div>
                    </div>

                    <Tabs defaultValue="description" className="mb-8">
                        <TabsList>
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>
                        …
                    </Tabs>
                </div>
            </div>
        </div>
    );
}