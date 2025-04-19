// Mock book data
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Classic",
    isbn: "9780743273565",
    language: "English",
    publicationDate: "2004-09-30",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 5.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    likes: 42,
    dislikes: 3,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Classic",
    isbn: "9780061120084",
    language: "English",
    publicationDate: "2006-05-23",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 4.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
    likes: 56,
    dislikes: 2,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Dystopian",
    isbn: "9780451524935",
    language: "English",
    publicationDate: "1961-01-01",
    borrowStatus: "Borrowed",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 3.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "1984 is a dystopian novel by English novelist George Orwell. It was published on 8 June 1949 as Orwell's ninth and final book completed in his lifetime.",
    likes: 38,
    dislikes: 5,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Romance",
    isbn: "9780141439518",
    language: "English",
    publicationDate: "2002-12-31",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 2.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    likes: 67,
    dislikes: 1,
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Fantasy",
    isbn: "9780547928227",
    language: "English",
    publicationDate: "2012-09-18",
    borrowStatus: "Borrowed",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 6.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
    likes: 89,
    dislikes: 4,
  },
  {
    id: "6",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Fantasy",
    isbn: "9780590353427",
    language: "English",
    publicationDate: "1998-09-01",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 7.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
    likes: 120,
    dislikes: 8,
  },
  {
    id: "7",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Coming-of-age",
    isbn: "9780316769488",
    language: "English",
    publicationDate: "1991-05-01",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 3.49,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society.",
    likes: 45,
    dislikes: 12,
  },
  {
    id: "8",
    title: "Lord of the Flies",
    author: "William Golding",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Allegory",
    isbn: "9780399501487",
    language: "English",
    publicationDate: "2003-12-16",
    borrowStatus: "Borrowed",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 4.49,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "Lord of the Flies is a 1954 novel by Nobel Prize-winning British author William Golding. The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
    likes: 32,
    dislikes: 7,
  },
  {
    id: "9",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Magical Realism",
    isbn: "9780060883287",
    language: "Spanish",
    publicationDate: "2006-02-21",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 5.49,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "One Hundred Years of Solitude is a landmark 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo, a fictitious town in the country of Colombia.",
    likes: 78,
    dislikes: 3,
  },
  {
    id: "10",
    title: "Brave New World",
    author: "Aldous Huxley",
    ownerId: "2",
    ownerName: "Book Owner",
    genre: "Dystopian",
    isbn: "9780060850524",
    language: "English",
    publicationDate: "2006-10-17",
    borrowStatus: "Available",
    availabilityStartDate: "2023-01-01",
    availabilityEndDate: "2023-12-31",
    borrowPrice: 4.99,
    coverImage: "/placeholder.svg?height=280&width=180",
    description:
      "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931 and published in 1932. Largely set in a futuristic World State, whose citizens are environmentally engineered into an intelligence-based social hierarchy, the novel anticipates huge scientific advancements in reproductive technology, sleep-learning, psychological manipulation and classical conditioning that are combined to make a dystopian society which is challenged by only a single individual: the story's protagonist.",
    likes: 56,
    dislikes: 9,
  },
];

// Get unique genres from books
const getGenres = () => {
  const genres = new Set(books.map((book) => book.genre));
  return Array.from(genres);
};

// Get unique languages from books
const getLanguages = () => {
  const languages = new Set(books.map((book) => book.language));
  return Array.from(languages);
};

export const bookService = {
  // Get all books
  getAllBooks: async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return books;
  },

  // Get book by ID
  getBookById: async (id: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const book = books.find((book) => book.id === id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  },

  // Search books with filters
  searchBooks: async (params: { query: string; genre: string; language: string; maxPrice: number; availability: string; }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    let filteredBooks = [...books];

    // Apply search query filter
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.isbn.includes(query)
      );
    }

    // Apply genre filter
    if (params.genre) {
      filteredBooks = filteredBooks.filter(
        (book) => book.genre === params.genre
      );
    }

    // Apply language filter
    if (params.language) {
      filteredBooks = filteredBooks.filter(
        (book) => book.language === params.language
      );
    }

    // Apply max price filter
    if (params.maxPrice) {
      filteredBooks = filteredBooks.filter(
        (book) => book.borrowPrice <= params.maxPrice
      );
    }

    // Apply availability filter
    if (params.availability === "available") {
      filteredBooks = filteredBooks.filter(
        (book) => book.borrowStatus === "Available"
      );
    } else if (params.availability === "borrowed") {
      filteredBooks = filteredBooks.filter(
        (book) => book.borrowStatus === "Borrowed"
      );
    }

    return filteredBooks;
  },

  // Get available genres
  getGenres: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return getGenres();
  },

  // Get available languages
  getLanguages: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return getLanguages();
  },

  // Like a book
  likeBook: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error("Book not found");
    }
    books[bookIndex].likes += 1;
    return books[bookIndex];
  },

  // Dislike a book
  dislikeBook: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error("Book not found");
    }
    books[bookIndex].dislikes += 1;
    return books[bookIndex];
  },
};

export default bookService;
