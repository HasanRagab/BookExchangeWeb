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
            url: '/api/Replies',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param commentId
     * @returns any OK
     * @throws ApiError
     */
    public static getApiRepliesComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Replies/comment/{commentId}',
            path: {
                'commentId': commentId,
            },
        });
    }
}
