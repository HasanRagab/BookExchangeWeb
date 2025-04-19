/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentCreateDto } from '../models/CommentCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentsService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiComments(
        requestBody: CommentCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Comments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param bookPostId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiCommentsBook(
        bookPostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Comments/book/{bookPostId}',
            path: {
                'bookPostId': bookPostId,
            },
        });
    }
}
