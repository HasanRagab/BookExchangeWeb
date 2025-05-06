/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookLikeCreateDto } from '../models/BookLikeCreateDto';
import type { BookPostEditDto } from '../models/BookPostEditDto';
import type { CommentCreateDto } from '../models/CommentCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookPostsService {
    /**
     * @param pageNumber
     * @param pageSize
     * @param searchValue
     * @param sortDirection
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookpostsAvailableBooks(
        pageNumber?: number,
        pageSize?: number,
        searchValue?: string,
        sortDirection?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookposts/available-books',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'SearchValue': searchValue,
                'SortDirection': sortDirection,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookposts(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookposts/{id}',
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
    public static putApiBookposts(
        id: number,
        requestBody: BookPostEditDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/bookposts/{id}',
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
    public static deleteApiBookposts(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/bookposts/{id}',
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
    public static getApiBookpostsComments(
        bookPostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookposts/{bookPostId}/comments',
            path: {
                'bookPostId': bookPostId,
            },
        });
    }
    /**
     * @param bookPostId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookpostsComments(
        bookPostId: number,
        requestBody: CommentCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookposts/{bookPostId}/comments',
            path: {
                'bookPostId': bookPostId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookpostsLikes(
        requestBody: BookLikeCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookposts/likes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param bookPostId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBookpostsLikes(
        bookPostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookposts/{bookPostId}/likes',
            path: {
                'bookPostId': bookPostId,
            },
        });
    }
}
