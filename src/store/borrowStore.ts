import { create } from "zustand"
import { borrowService } from "../services/borrowService"

// Define types for borrowed books and borrow requests
interface BorrowedBook {
    id: string
    title: string
    author: string
    borrowedDate: string
    dueDate: string
}

interface BorrowRequest {
    id: string
    bookId: string
    requesterId: string
    status: "pending" | "approved" | "rejected"
    requestDate: string
}

interface BorrowRequestData {
    requesterId: string
    message?: string
}

// Define the store state and actions
interface BorrowStore {
    borrowedBooks: BorrowedBook[]
    borrowRequests: BorrowRequest[]
    isLoading: boolean
    error: string | null

    fetchBorrowedBooks: () => Promise<void>
    fetchBorrowRequests: () => Promise<void>
    submitBorrowRequest: (bookId: string, requestData: BorrowRequestData) => Promise<BorrowRequest>
    approveBorrowRequest: (requestId: string) => Promise<void>
    rejectBorrowRequest: (requestId: string) => Promise<void>
    clearErrors: () => void
}

const useBorrowStore = create<BorrowStore>((set, get) => ({
    borrowedBooks: [],
    borrowRequests: [],
    isLoading: false,
    error: null,

    // Fetch borrowed books for current user
    fetchBorrowedBooks: async () => {
        set({ isLoading: true, error: null })
        try {
            const borrowedBooks = await borrowService.getBorrowedBooks()
            set({ borrowedBooks, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    // Fetch borrow requests (for book owners)
    fetchBorrowRequests: async () => {
        set({ isLoading: true, error: null })
        try {
            const borrowRequests = await borrowService.getBorrowRequests()
            set({ borrowRequests, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    // Submit borrow request
    submitBorrowRequest: async (bookId, requestData) => {
        set({ isLoading: true, error: null })
        try {
            const request = await borrowService.submitBorrowRequest(bookId, requestData)
            set({ isLoading: false })
            return request
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
            throw error
        }
    },

    // Approve borrow request (for book owners)
    approveBorrowRequest: async (requestId) => {
        set({ isLoading: true, error: null })
        try {
            await borrowService.approveBorrowRequest(requestId)
            // Update the requests list
            const updatedRequests = get().borrowRequests.map((req) =>
                req.id === requestId ? { ...req, status: "approved" } : req,
            )
            set({ borrowRequests: updatedRequests, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
            throw error
        }
    },

    // Reject borrow request (for book owners)
    rejectBorrowRequest: async (requestId) => {
        set({ isLoading: true, error: null })
        try {
            await borrowService.rejectBorrowRequest(requestId)
            // Update the requests list
            const updatedRequests = get().borrowRequests.map((req) =>
                req.id === requestId ? { ...req, status: "rejected" } : req,
            )
            set({ borrowRequests: updatedRequests, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
            throw error
        }
    },

    // Clear errors
    clearErrors: () => set({ error: null }),
}))

export default useBorrowStore
