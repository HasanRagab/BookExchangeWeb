import BookCard from "@/components/books/BookCard"

function Test() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3].map((id) => (
                    <BookCard book={{
                        id: String(id),
                        title: "Book Title",
                        author: "Author Name",
                        genre: "Fiction",
                        language: "English",
                        borrowPrice: 10,
                        likes: 100,
                        dislikes: 5,
                        borrowStatus: "Available",
                    }} />
                ))}
            </div>
        </div>
    );
}

export default Test