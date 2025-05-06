/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
    public static getApiBorrowrequestsBook(
        bookId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/borrowrequests/book/{bookId}',
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
    public static postApiBorrowrequests(
        requestBody: BorrowRequestCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/borrowrequests',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestId
     * @param action
     * @returns any OK
     * @throws ApiError
     */
    public static putApiBorrowrequests(
        requestId: number,
        action?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/borrowrequests/{requestId}',
            path: {
                'requestId': requestId,
            },
            query: {
                'action': action,
            },
        });
    }
}
