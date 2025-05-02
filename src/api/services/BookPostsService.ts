/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookLikeCreateDto } from '../models/BookLikeCreateDto';
import type { BookPostEditDto } from '../models/BookPostEditDto';
import type { CommentCreateDto } from '../models/CommentCreateDto';
import type { IFormFile } from '../models/IFormFile';
import type { ReplyCreateDto } from '../models/ReplyCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookPostsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPostsAvailableBooks(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/available-books',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPosts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts',
        });
    }
    /**
     * @param formData
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookPosts(
        formData: ({
            BookOwnerId?: string;
            Title?: string;
            Genre?: string;
            ISBN?: string;
            Language?: string;
            AvailableFrom?: string;
            AvailableTo?: string;
            BorrowPrice?: number;
        } & {
            coverImage?: IFormFile;
        }),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookPosts',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param genre
     * @param minBorrowPrice
     * @param maxBorrowPrice
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPostsAvailable(
        genre?: string,
        minBorrowPrice?: number,
        maxBorrowPrice?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/available',
            query: {
                'Genre': genre,
                'MinBorrowPrice': minBorrowPrice,
                'MaxBorrowPrice': maxBorrowPrice,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPosts1(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiBookPosts(
        id: number,
        requestBody: BookPostEditDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/BookPosts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiBookPosts(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/BookPosts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param bookPostId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPostsComments(
        bookPostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/{bookPostId}/comments',
            path: {
                'bookPostId': bookPostId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookPostsComments(
        requestBody: CommentCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookPosts/comments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookPostsLikes(
        requestBody: BookLikeCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookPosts/likes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param bookPostId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPostsLikes(
        bookPostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/{bookPostId}/likes',
            path: {
                'bookPostId': bookPostId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookPostsReplies(
        requestBody: ReplyCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookPosts/replies',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param commentId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookPostsCommentsReplies(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookPosts/comments/{commentId}/replies',
            path: {
                'commentId': commentId,
            },
        });
    }
}
