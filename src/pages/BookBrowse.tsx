// pages/BookBrowse.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, BookOpen } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock books data
const books = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Classic',
        available: true,
        rating: 4.5
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Fiction',
        available: true,
        rating: 4.8
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Dystopian',
        available: false,
        rating: 4.6
    },
    {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Romance',
        available: true,
        rating: 4.7
    },
    {
        id: '5',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Fantasy',
        available: true,
        rating: 4.9
    },
    {
        id: '6',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Fantasy',
        available: false,
        rating: 4.7
    },
    {
        id: '7',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Fiction',
        available: true,
        rating: 4.1
    },
    {
        id: '8',
        title: 'Lord of the Flies',
        author: 'William Golding',
        coverUrl: '/api/placeholder/200/300',
        genre: 'Fiction',
        available: true,
        rating: 4.0
    }
];

// Genre options for filtering
const genres = ['All', 'Fiction', 'Fantasy', 'Classic', 'Romance', 'Dystopian', 'Science Fiction', 'Mystery'];

export default function BookBrowse() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [minRating, setMinRating] = useState(0);

    // Filter books based on search, genre, availability and rating
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
        const matchesAvailability = !availableOnly || book.available;
        const matchesRating = book.rating >= minRating;

        return matchesSearch && matchesGenre && matchesAvailability && matchesRating;
    });

    const resetFilters = () => {
        setSelectedGenre('All');
        setAvailableOnly(false);
        setMinRating(0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Browse Books</h1>
                <Link to="/books/search">
                    <Button variant="outline">Advanced Search</Button>
                </Link>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search by title or author..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <div className="flex gap-2">
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Genre</SelectLabel>
                                {genres.map(genre => (
                                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter size={16} />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filter Books</SheetTitle>
                                <SheetDescription>
                                    Narrow down your book search with these filters.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="py-6 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Availability</h3>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="available"
                                            checked={availableOnly}
                                            onCheckedChange={(checked: boolean | "indeterminate") => setAvailableOnly(checked as boolean)}
                                        />
                                        <Label htmlFor="available">Available books only</Label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Minimum Rating</h3>
                                        <span>{minRating} / 5</span>
                                    </div>
                                    <Slider
                                        value={[minRating]}
                                        min={0}
                                        max={5}
                                        step={0.5}
                                        onValueChange={(value: number[]) => setMinRating(value[0])}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Genre</h3>
                                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {genres.map(genre => (
                                                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <SheetFooter>
                                <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                                <SheetTrigger asChild>
                                    <Button>Apply Filters</Button>
                                </SheetTrigger>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Active Filters */}
            {(selectedGenre !== 'All' || availableOnly || minRating > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedGenre !== 'All' && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Genre: {selectedGenre}
                            <button onClick={() => setSelectedGenre('All')}>×</button>
                        </Badge>
                    )}
                    {availableOnly && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Available Only
                            <button onClick={() => setAvailableOnly(false)}>×</button>
                        </Badge>
                    )}
                    {minRating > 0 && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            {minRating}+ Rating
                            <button onClick={() => setMinRating(0)}>×</button>
                        </Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                        Clear All
                    </Button>
                </div>
            )}

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
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
                                <div className="flex items-center justify-between mt-2">
                                    <Badge variant={book.available ? "default" : "destructive"}>
                                        {book.available ? "Available" : "Borrowed"}
                                    </Badge>
                                    <div className="flex items-center text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="gold" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        {book.rating}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline" className="w-full">
                                    <Link to={`/books/${book.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Books Found</h3>
                    <p className="text-gray-500 mb-4">We couldn't find any books matching your criteria.</p>
                    <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
            )}
        </div>
    );
}