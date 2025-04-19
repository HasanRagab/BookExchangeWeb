// Mock borrowed books data
const borrowedBooks = [
    {
      id: "1",
      bookId: "3",
      bookTitle: "1984",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      borrowDate: "2023-10-15",
      returnDate: "2023-11-15",
      status: "active",
    },
    {
      id: "2",
      bookId: "5",
      bookTitle: "The Hobbit",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      borrowDate: "2023-09-20",
      returnDate: "2023-10-20",
      status: "overdue",
    },
    {
      id: "3",
      bookId: "8",
      bookTitle: "Lord of the Flies",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      borrowDate: "2023-11-01",
      returnDate: "2023-12-01",
      status: "active",
    },
  ]
  
  // Mock borrow requests data
  const borrowRequests = [
    {
      id: "1",
      bookId: "1",
      bookTitle: "The Great Gatsby",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      requestDate: "2023-11-10",
      borrowStartDate: "2023-11-20",
      borrowEndDate: "2023-12-20",
      status: "pending",
      message: "I would love to borrow this classic for my book club discussion next month.",
    },
    {
      id: "2",
      bookId: "4",
      bookTitle: "Pride and Prejudice",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      requestDate: "2023-11-05",
      borrowStartDate: "2023-11-15",
      borrowEndDate: "2023-12-15",
      status: "approved",
      message: "I'm studying Jane Austen for my literature class and would appreciate borrowing this book.",
    },
    {
      id: "3",
      bookId: "6",
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      bookCover: "/placeholder.svg?height=280&width=180",
      borrowerId: "3",
      borrowerName: "Reader User",
      ownerId: "2",
      ownerName: "Book Owner",
      requestDate: "2023-11-08",
      borrowStartDate: "2023-11-18",
      borrowEndDate: "2023-12-18",
      status: "rejected",
      message: "I want to introduce my nephew to the Harry Potter series.",
      rejectionReason: "Book is reserved for another borrower during this period.",
    },
  ]
  
  // Define the BorrowRequest type
  type BorrowRequest = {
    id: string;
    bookId: string;
    bookTitle: string;
    bookCover: string;
    borrowerId: string;
    borrowerName: string;
    ownerId: string;
    ownerName: string;
    requestDate: string;
    borrowStartDate: string;
    borrowEndDate: string;
    status: string;
    message: string;
    rejectionReason?: string;
  };

  interface SubmitBorrowRequestData {
    bookId: string;
    bookTitle: string;
    bookCover: string;
    borrowerId: string;
    borrowerName: string;
    ownerId: string;
    ownerName: string;
    borrowStartDate: string;
    borrowEndDate: string;
    message: string;
  }
  
  export const borrowService = {
    // Get borrowed books for current user
    getBorrowedBooks: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600))
      return borrowedBooks
    },
  
    // Get borrow requests (for book owners)
    getBorrowRequests: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return borrowRequests
    },
  
    // Submit borrow request
    submitBorrowRequest: async (bookId: string, requestData: SubmitBorrowRequestData)=> {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))
  
      // Create a new request
      const newRequest: BorrowRequest = {
        id: (borrowRequests.length + 1).toString(),
        bookId,
        bookTitle: requestData.bookTitle,
        bookCover: requestData.bookCover,
        borrowerId: requestData.borrowerId,
        borrowerName: requestData.borrowerName,
        ownerId: requestData.ownerId,
        ownerName: requestData.ownerName,
        requestDate: new Date().toISOString().split("T")[0],
        borrowStartDate: requestData.borrowStartDate,
        borrowEndDate: requestData.borrowEndDate,
        status: "pending",
        message: requestData.message,
      }
  
      // Add to our "database"
      borrowRequests.push(newRequest)
  
      return newRequest
    },
  
    // Approve borrow request (for book owners)
    approveBorrowRequest: async (requestId: string) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      const requestIndex = borrowRequests.findIndex((req) => req.id === requestId)
      if (requestIndex === -1) {
        throw new Error("Request not found")
      }
  
      // Update request status
      borrowRequests[requestIndex].status = "approved"
  
      // Create a new borrowed book entry
      const request = borrowRequests[requestIndex]
      const newBorrow = {
        id: (borrowedBooks.length + 1).toString(),
        bookId: request.bookId,
        bookTitle: request.bookTitle,
        bookCover: request.bookCover,
        borrowerId: request.borrowerId,
        borrowerName: request.borrowerName,
        ownerId: request.ownerId,
        ownerName: request.ownerName,
        borrowDate: request.borrowStartDate,
        returnDate: request.borrowEndDate,
        status: "active",
      }
  
      // Add to our "database"
      borrowedBooks.push(newBorrow)
  
      // Update book status to "Borrowed"
      // This would typically be handled by the bookService
  
      return borrowRequests[requestIndex]
    },
  
    // Reject borrow request (for book owners)
    rejectBorrowRequest: async (requestId: string, reason: string) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      const requestIndex = borrowRequests.findIndex((req) => req.id === requestId)
      if (requestIndex === -1) {
        throw new Error("Request not found")
      }
  
      // Update request status and add rejection reason
      borrowRequests[requestIndex].status = "rejected"
      borrowRequests[requestIndex].rejectionReason = reason || "Request rejected by book owner."
  
      return borrowRequests[requestIndex]
    },
  
    // Return a borrowed book
    returnBook: async (borrowId: string) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600))
  
      const borrowIndex = borrowedBooks.findIndex((borrow) => borrow.id === borrowId)
      if (borrowIndex === -1) {
        throw new Error("Borrowed book not found")
      }
  
      // Remove from borrowed books
      const returnedBook = borrowedBooks.splice(borrowIndex, 1)[0]
  
      // Update book status to "Available"
      // This would typically be handled by the bookService
  
      return returnedBook
    },
  }
  