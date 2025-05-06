/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReplyCreateDto } from '../models/ReplyCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RepliesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiReplies(
        requestBody: ReplyCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/replies',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param commentId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiRepliesComments(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/replies/comments/{commentId}',
            path: {
                'commentId': commentId,
            },
        });
    }
}
