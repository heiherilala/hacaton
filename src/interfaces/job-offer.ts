/* tslint:disable */
/* eslint-disable */
/**
 * JobOffers manager for Library
 * This is the API to get access to the application that manage applications and Job Offers. 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Domain } from './domain';
/**
 * 
 * @export
 * @interface JobOffer
 */
export interface JobOffer {
    /**
     * 
     * @type {number}
     * @memberof JobOffer
     */
    idJobOffer?: number;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    reference?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    post?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    profile?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    location?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    company?: string;
    /**
     * 
     * @type {string}
     * @memberof JobOffer
     */
    contract?: string;
    /**
     * 
     * @type {boolean}
     * @memberof JobOffer
     */
    available?: boolean;
    /**
     * 
     * @type {Domain}
     * @memberof JobOffer
     */
    domain?: Domain;
}
