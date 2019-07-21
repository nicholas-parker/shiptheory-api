/**
 *
 * a service class for interacting with the Shiptheory API
 *
 */
import { HttpService } from '@nestjs/common';
import { Response } from './response';
import { Observable } from 'rxjs';
export declare class ShiptheoryService {
    http: HttpService;
    /**
     * email, password for authorisation
     */
    email: string;
    password: string;
    /**
     * base url for services
     */
    private baseUrl;
    /**
     * the authrisation token
     */
    private token;
    private isAuhtorised;
    constructor(http: HttpService);
    /**
     *
     * Set the authentication credentials, prior to calling any methods
     *
     * @param e email address
     * @param p password
     *
     */
    setCredentials(e: string, p: string): void;
    authenticate(): Observable<Response>;
    /**
     *
     * retrieve a list of delivery services
     *
     */
    getDeliveryServices(): Promise<any>;
}
