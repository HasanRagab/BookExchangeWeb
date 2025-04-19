import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";

// Mock featured books data
const featuredBooks = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: '/api/placeholder/200/300',
        description: 'A classic novel exploring themes of decadence and excess in the Jazz Age.'
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverUrl: '/api/placeholder/200/300',
        description: 'A powerful story addressing issues of race and class in the American South.'
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        coverUrl: '/api/placeholder/200/300',
        description: 'A dystopian social science fiction classic that examines totalitarianism.'
    },
    {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverUrl: '/api/placeholder/200/300',
        description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.'
    }
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 mb-12 text-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">BookShare Community</h1>
                    <p className="text-xl mb-8">Discover, borrow, and share books with people in your community.</p>

                    <div className="relative max-w-md mx-auto">
                        <Input
                            type="text"
                            placeholder="Search for books..."
                            className="pl-10 pr-4 py-2 w-full bg-white text-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 py-1">
                            Search
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button asChild variant="secondary">
                            <Link to="/books">Browse Books</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/register">Join Now</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Featured Books Section */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Featured Books</h2>
                    <Button variant="outline" asChild>
                        <Link to="/books">View All</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredBooks.map((book) => (
                        <Card key={book.id} className="h-full flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex justify-center">
                                    <img
                                        src={book.coverUrl}
                                        alt={book.title}
                                        className="h-48 object-cover rounded-md shadow-md"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardTitle className="text-lg">{book.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500">{book.author}</CardDescription>
                                <p className="mt-2 text-sm line-clamp-3">{book.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline" className="w-full">
                                    <Link to={`/books/${book.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-blue-100 p-4 inline-block rounded-full mb-4">
                            <Book size={32} className="text-blue-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">List Your Books</h3>
                        <p>Add books you're willing to lend to others in the community.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 p-4 inline-block rounded-full mb-4">
                            <Search size={32} className="text-green-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Find Books</h3>
                        <p>Search for books you'd like to borrow from other members.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 p-4 inline-block rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                                <path d="M17 6.1H3"></path>
                                <path d="M21 12.1H3"></path>
                                <path d="M15.1 18H3"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Request & Borrow</h3>
                        <p>Request books and arrange pickups with book owners.</p>
                    </div>
                </div>
            </section>

            {/* Join Community CTA */}
            <section className="text-center bg-indigo-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Join Our Book-Loving Community</h2>
                <p className="mb-6 max-w-xl mx-auto">Connect with fellow readers, share your favorite books, and discover new titles without spending a fortune.</p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link to="/register">Sign Up Now</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/login">Already a Member?</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}