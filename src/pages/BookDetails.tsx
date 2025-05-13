import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from "date-fns";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, ChevronLeft, Heart, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import api from '@/lib/axios';
import { BookPostResponseDto } from '@/types/api';
import { cn } from '@/lib/utils';



export default function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<BookPostResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState<{ startDate?: Date; endDate?: Date }>(
        {
            startDate: undefined,
            endDate: undefined
        }
    );
    const [isCurrentDateInTheRange, setIsCurrentDateInTheRange] = useState<boolean>(false);


    const fetchBook = useCallback(async () => {
        if (!id) return;

        try {
            const data = await api("get", "bookposts/:id", {
                params: { id }
            });
            setBook(data);

            setIsCurrentDateInTheRange(
                new Date() >= new Date(data.availableFrom) && new Date() <= new Date(data.availableTo)
            );

            if (isCurrentDateInTheRange) {
                setTimeRange({
                    startDate: new Date(),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 7))
                });
            }
            setError(null);
        } catch (err) {
            setError('Failed to fetch book details');
            console.error('Error fetching book:', err);
        }
    }, [id, isCurrentDateInTheRange]);

    useEffect(() => {
        setIsLoading(true);
        fetchBook();
        setIsLoading(false);
    }, [fetchBook]);

    const toggleLike = async (bookPostId: number) => {
        try {
            await api("post", "bookposts/likes", {
                data: {
                    bookPostId,
                    isLiked: !book?.userHasLiked
                }
            });
            fetchBook();
        }
        catch (err) {
            console.error('Error liking book:', err);
            setError('Failed to like book');
        }
    }

    const sendComment = async (content: string) => {
        if (!id) return;
        try {
            await api("post", "bookposts/:bookPostId/comments", {
                data: { content },
                params: { bookPostId: id }
            });
            fetchBook();
        } catch (err) {
            console.error('Error sending comment:', err);
            setError('Failed to send comment');
        }
    }

    const sendBorrowRequest = async (bookId: number) => {
        if (!id) return;
        try {
            if (!timeRange.startDate || !timeRange.endDate) {
                setError('Please select a valid date range');
                return;
            }
            await api("post", "borrowrequests", {
                data: {
                    bookId,
                    startDate: timeRange.startDate.toISOString(),
                    endDate: timeRange.endDate.toISOString(),
                },
            });
            fetchBook();
        }
        catch (err) {
            console.error('Error sending borrow request:', err);
            setError('Failed to send borrow request');
        }
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link to="/books" className="flex items-center text-blue-600 mb-6 hover:underline">
                    <ChevronLeft size={16} />
                    <span>Back to Books</span>
                </Link>
                <div className="text-red-600">{error || 'Book not found'}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                to="/books"
                className="flex items-center text-blue-600 mb-6 hover:underline"
            >
                <ChevronLeft size={16} />
                <span>Back to Books</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="sticky top-6">
                        <div className="flex justify-center mb-6">
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`}
                                alt={book.title}
                                className="rounded-lg shadow-lg max-h-96"
                            />
                        </div>

                        <div className="space-y-4">
                            {(book.isAvailable && isCurrentDateInTheRange) && !book.userHasRequested ? (
                                <div className="space-y-4">
                                    <Label className="block text-sm font-medium">Select borrowing date range:</Label>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !timeRange.startDate || !timeRange.endDate ? "text-muted-foreground" : ""
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {timeRange.startDate && timeRange.endDate
                                                    ? `${format(timeRange.startDate, "PPP")} - ${format(timeRange.endDate, "PPP")}`
                                                    : "Pick a date range"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode='range'
                                                selected={{ from: timeRange.startDate, to: timeRange.endDate }}
                                                onSelect={(range) => {
                                                    setTimeRange({
                                                        startDate: range?.from,
                                                        endDate: range?.to
                                                    });
                                                }
                                                }
                                                className="w-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <Button
                                        onClick={() => sendBorrowRequest(book.id)}
                                        disabled={!timeRange.startDate || !timeRange.endDate}
                                    >
                                        Send Request
                                    </Button>
                                </div>

                            ) : (
                                <Button className="w-full" variant="outline" disabled>
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    {book.userHasRequested
                                        ? "You have already requested this book"
                                        : isCurrentDateInTheRange
                                            ? "Book is currently borrowed"
                                            : "Book is not available for borrowing"}
                                </Button>
                            )}
                        </div>

                        <Card className="mt-6">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar>
                                        <AvatarFallback>
                                            {book.bookOwnerName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{book.bookOwnerName}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="flex items-center gap-1 text-gray-500">
                                                <Heart
                                                    fill={book.userHasLiked ? "red" : "white"}
                                                    className="h-4 w-4"
                                                    onClick={() => toggleLike(book.id)}
                                                />
                                                <p>{book.totalLikes}</p>
                                                <p>Likes</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Borrowing period:</span>
                                        <span>
                                            {`${format(
                                                new Date(book.availableFrom),
                                                "PPP"
                                            )} - ${format(new Date(book.availableTo), "PPP")}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Borrow price:</span>
                                        <span>${book.borrowPrice}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="mb-4">
                        <div className="flex gap-2 items-center mb-2">
                            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                            <Badge variant="outline" className="mb-2">
                                {book.genre}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            <Badge
                                variant={book.isAvailable ? "default" : "destructive"}
                                className="py-1"
                            >
                                {(book.isAvailable && isCurrentDateInTheRange) ? "Available" : "Not Available"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                <CalendarIcon className="inline mr-1 h-4 w-4" />
                                Published{" "}
                                {new Date(book.publicationDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <Tabs defaultValue="description" className="mb-8">
                        <TabsList>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="comments">Comments</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="text-sm">
                                        <Label htmlFor="owner" className="font-semibold">
                                            Owner
                                        </Label>
                                        <p className="mt-2">{book.bookOwnerName}</p>
                                    </div>
                                    <div className="text-sm">
                                        <Label htmlFor="language" className="font-semibold">
                                            Language
                                        </Label>
                                        <p className="mt-2">{book.language}</p>
                                    </div>
                                    <div className="text-sm">
                                        <Label htmlFor="isbn" className="font-semibold">
                                            ISBN
                                        </Label>
                                        <p className="mt-2">{book.isbn}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="comments">
                            <Card>
                                <CardContent className="space-y-2">
                                    {book.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b flex gap-2 border-gray-200 pb-2"
                                        >
                                            <span className="font-bold">{comment.name}: </span>
                                            <span className="text-gray-500">{comment.content}</span>
                                        </div>
                                    ))}
                                    <div className="mt-4">
                                        <Textarea
                                            placeholder="Leave a comment..."
                                            className="min-h-[100px]"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    sendComment((e.target as HTMLTextAreaElement).value);
                                                }
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}