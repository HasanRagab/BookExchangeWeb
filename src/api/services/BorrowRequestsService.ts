/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BorrowRequestActionDto } from '../models/BorrowRequestActionDto';
import type { BorrowRequestCreateDto } from '../models/BorrowRequestCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BorrowRequestsService {
    /**
     * @param bookId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiBorrowRequestsBook(
        bookId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BorrowRequests/book/{bookId}',
            path: {
                'bookId': bookId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBorrowRequests(
        requestBody: BorrowRequestCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BorrowRequests',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBorrowRequestsAction(
        requestId: number,
        requestBody: BorrowRequestActionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BorrowRequests/{requestId}/action',
            path: {
                'requestId': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
