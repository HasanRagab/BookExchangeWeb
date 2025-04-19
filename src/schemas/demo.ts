// Enums
export enum AccountStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export enum BorrowStatus {
  Available = "AVAILABLE",
  Borrowed = "BORROWED",
}

export enum PostStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export enum RequestStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export enum NotificationType {
  AccountStatusChange = "ACCOUNT_STATUS_CHANGE",
  PostStatusChange = "POST_STATUS_CHANGE",
  NewBorrowRequest = "NEW_BORROW_REQUEST",
  RequestStatusChange = "REQUEST_STATUS_CHANGE",
  NewComment = "NEW_COMMENT",
  NewReply = "NEW_REPLY",
  NewLike = "NEW_LIKE",
}

// Interfaces
export interface User {
  Id: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Status: AccountStatus;
  Books?: Book[];
  BorrowRequests?: BorrowRequest[];
  UserLikes?: UserLike[];
  Replies?: Reply[];
  IsAdmin: boolean;
  Notifications?: Notification[];
  SocketSessions?: SocketSession[];
}

export interface Book {
  Id: string;
  Title: string;
  Genre: string;
  Isbn?: string;
  Language: string;
  PublicationDate?: Date;
  Description?: string;
  CoverImage?: string;
  BorrowPrice: number;
  BorrowStatus: BorrowStatus;
  AvailabilityStartDate: Date;
  AvailabilityEndDate: Date;
  OwnerId: string;
  PostStatus: PostStatus;
  BorrowRequests?: BorrowRequest[];
  LikesCount: number;
  DisLikesCount: number;
  Likes?: UserLike[];
  DisLikes?: UserDisLike[];
  Replies?: Reply[];
}

export interface BorrowRequest {
  Id: string;
  BookId: string;
  BorrowerId: string;
  RequestStatus: RequestStatus;
  StartDate: Date;
  EndDate: Date;
}

export interface UserLike {
  Id: string;
  BookId: string;
  UserId: string;
}

export interface UserDisLike {
  Id: string;
  BookId: string;
  UserId: string;
}

export interface Reply {
  Id: string;
  Content: string;
  BookId: string;
  UserId: string;
}

export interface Notification {
  Id: string;
  UserId: string;
  Type: NotificationType;
  Message: string;
  IsRead: boolean;
  RelatedEntityId?: string;
  RelatedEntityType?: string;
  CreatedAt: Date;
}

export interface SocketSession {
  Id: string;
  UserId: string;
  SocketId: string;
  DeviceInfo?: string;
  ConnectionStartTime: Date;
  LastActivity: Date;
  IsActive: boolean;
}
