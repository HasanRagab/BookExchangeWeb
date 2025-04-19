# BookSwap Platform Implementation Checklist

## Backend Endpoints (19 total)

### Authentication (4)

- [ ] `POST /api/auth/register` - Register new user
- [ ] `POST /api/auth/login` - Login
- [ ] `POST /api/auth/logout` - Logout
- [ ] `GET /api/auth/me` - Get current user info

### Admin (4)

- [ ] `GET /api/admin/users` - Get all users pending approval as book owners
- [ ] `PATCH /api/admin/users/:id/approve-owner` - Approve user as book owner
- [ ] `GET /api/admin/books` - Get all book posts pending approval
- [ ] `PATCH /api/admin/books/:id` - Accept/reject book posts

### Books (6)

- [ ] `GET /api/books` - Get all approved books (with filtering options)
- [ ] `GET /api/books/:id` - Get single book details
- [ ] `POST /api/books` - Create new book (approved owners only)
- [ ] `PUT /api/books/:id` - Update book (owner only)
- [ ] `DELETE /api/books/:id` - Delete book (owner only)
- [ ] `GET /api/books/search` - Search books with filters (genre, price, etc.)

### Borrow Requests (4)

- [ ] `POST /api/books/:id/requests` - Apply to borrow a book
- [ ] `GET /api/user/owner/requests` - Get all borrow requests for user's books
- [ ] `PATCH /api/user/owner/requests/:id` - Accept/reject borrow request
- [ ] `GET /api/user/reader/requests` - Get all borrow requests made by user

### Interactions (5)

- [ ] `POST /api/books/:id/like` - Like a book
- [ ] `POST /api/books/:id/dislike` - Dislike a book
- [ ] `GET /api/books/:id/comments` - Get comments for a book
- [ ] `POST /api/books/:id/comments` - Add comment to a book
- [ ] `POST /api/comments/:id/replies` - Reply to a comment

### User Book Management (2)

- [ ] `GET /api/user/owner/books` - Get list of user's books as owner
- [ ] `GET /api/user/reader/books` - Get list of books borrowed by user

## Frontend Routes (16 total)

### Public Routes (6)

- [ ] `/` - Homepage, showing featured books
- [ ] `/books` - Browse all available books
- [ ] `/books/search` - Search interface
- [ ] `/books/:id` - View individual book details
- [ ] `/login` - Login page
- [ ] `/register` - Registration page

### User Routes (Protected) (2)

- [ ] `/dashboard` - User's personal dashboard
- [ ] `/profile` - User profile settings

### Reader Features (Protected) (2)

- [ ] `/my-borrows` - Books currently borrowed
- [ ] `/my-requests` - Borrow requests made

### Owner Features (Protected) (4)

- [ ] `/my-books` - Manage books as owner
- [ ] `/my-books/new` - Add new book
- [ ] `/my-books/:id/edit` - Edit book
- [ ] `/borrow-requests` - Manage incoming borrow requests

### Admin Routes (Protected) (3)

- [ ] `/admin/dashboard` - Admin dashboard
- [ ] `/admin/users` - Approve/reject users as Book Owners
- [ ] `/admin/books` - Approve/reject book posts

## Total Implementation Count

- Backend Endpoints: 25
- Frontend Routes: 17
