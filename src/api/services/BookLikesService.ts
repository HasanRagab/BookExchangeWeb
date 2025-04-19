/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookLikeCreateDto } from '../models/BookLikeCreateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookLikesService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiBookLikesLike(
        requestBody: BookLikeCreateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookLikes/like',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
