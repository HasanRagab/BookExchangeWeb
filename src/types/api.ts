export type UserRole = "Admin" | "Reader" | "BookOwner";

export interface ApplicationUser {
  firstName: string;
  lastName: string;
}

export interface MeResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface RegisterResponse extends Omit<AuthResponse, "token"> {
  token: string | null;
  message: string | null;
}

// Admin
export interface PendingRegistrationDto extends Omit<MeResponse, "id"> {
  id: number;
  createdAt: string;
}

export interface ApproveRejectDto {
  pendingRegistrationId: number;
  approve: boolean;
}

export interface BookPostResponseDto {
  id: number;
  bookOwnerId: string;
  bookOwnerName: string;
  title: string;
  genre: string;
  isbn: string;
  language: string;
  publicationDate: string;
  isAvailable: boolean;
  availableFrom: string;
  availableTo: string;
  borrowPrice: number;
  isApprovedByAdmin: boolean;
  coverImage?: string | null;
  comments: CommentResponseDto[];
  totalLikes: number;
  userHasLiked?: boolean | null;
  userHasRequested?: boolean | null;
}

export interface CommentResponseDto {
  id: number;
  bookPostId: number;
  userId: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface ManageBookPostDto {
  bookPostId: number;
  approve: boolean;
}

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BookLikeResponseDto {
  id: number;
  bookPostId: number;
  userId: string;
  isLiked: boolean;
  likedAt: string;
}

export interface QueryAvailableBooksRequest {
  pageNumber: number;
  pageSize: number;
  searchValue: string;
  sortDirection: "asc" | "desc";
}

export interface LikeBookRequest {
  bookPostId: number;
  isLiked: boolean;
}

export interface BorrowRequestSummaryDto {
  id: number;
  borrowerName: string;
  startDate: string;
  endDate: string;
}

export interface BorrowRequestResponseDto {
  id: number;
  bookId: number;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  startDate: string;
  endDate: string;
  isAccepted: boolean;
}

export interface BorrowRequestCreateDto {
  bookId: number;
  startDate: string;
  endDate: string;
}

export interface APIEndpoints {
  "/auth": {
    request: LoginRequest;
    response: AuthResponse;
  };
  "/auth/register": {
    request: RegisterRequest;
    response: RegisterResponse;
  };
  "/auth/me": {
    request: void;
    response: MeResponse;
  };
  "/admin/pending-registrations": {
    request: void;
    response: PendingRegistrationDto[];
  };
  "/admin/manage-registration": {
    request: ApproveRejectDto;
    response: {
      message: string;
    };
  };
  "/admin/book-posts-requests": {
    request: void;
    response: BookPostResponseDto[];
  };
  "/admin/manage-book-post": {
    request: ManageBookPostDto;
    response: {
      message: string;
    };
  };
  "bookposts/available-books": {
    query: QueryAvailableBooksRequest;
    response: PaginatedList<BookPostResponseDto>;
  };
  "bookposts/:id": {
    request: void;
    params: {
      id: string;
    };
    response: BookPostResponseDto;
  };
  "bookposts/likes": {
    request: LikeBookRequest;
    response: BookLikeResponseDto;
  };
  "bookposts/:bookPostId/comments": {
    request: {
      content: string;
    };
    params: {
      bookPostId: string;
    };
    response: CommentResponseDto[];
  };
  borrowrequests: {
    request: BorrowRequestCreateDto;
    response: BorrowRequestResponseDto;
  };
  "borrowrequests/requests": {
    request: void;
    response: BorrowRequestSummaryDto[];
  };
  "borrowrequests/book/:bookId": {
    request: void;
    params: {
      bookId: string;
    };
    response: BorrowRequestSummaryDto[];
  };
  "borrowrequests/:requestId": {
    request: {
      action: "Accept" | "Reject";
    };
    params: {
      requestId: string;
    };
    response: BorrowRequestResponseDto;
  };
}
