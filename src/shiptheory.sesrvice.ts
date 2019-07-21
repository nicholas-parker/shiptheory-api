/**
 * 
 * a service class for interacting with the Shiptheory API
 * 
 */

import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import querystring = require('qs');
import { flatMap, catchError } from 'rxjs/operators';
import { Response } from './response';
import { of, Observable } from 'rxjs';
import { ShippingRequest } from './shippingrequest';

@Injectable()
export class ShiptheoryService {

    /**
     * email, password for authorisation
     */
    public email: string = '';
    public password: string = '';


    /**
     * base url for services
     */
    private baseUrl: string = 'https://shiptheory.com/api';

    /**
     * the authrisation token
     */
    private token: string = '';
    private isAuhtorised = false;

    constructor(public http: HttpService) { }

    /**
     * 
     * Set the authentication credentials, prior to calling any methods
     * 
     * @param e email address
     * @param p password
     * 
     */
    public setCredentials(e: string, p: string): void {
        
        this.email = e;
        this.password = p;

    }

    public authenticate(): Observable<Response> {

        const url = this.baseUrl + '/token';

            
        const creds =  {
            email: this.email,
            password: this.password};
        const data = querystring.stringify(creds)
        
        const opt = {headers: {'Accept': 'application/json'}};
  
        const response: Response = new Response();
        response.actionName = 'shiptheory_authenticate';
        response.dateTime = new Date();
        
        return this.http.post(url, data, opt).pipe(
           flatMap((resp: AxiosResponse) => {
               this.token = resp.data.data.token;
               response.status = Response.ACTION_OK;
               response.data = resp.data;
               return of(response);
               }),
           catchError((error: any) => {
               response.status = Response.ACTION_FAIL;
               response.errorMessage = error.toString();
               return of(response);
           }),
        );

    }

    /**
     * 
     * retrieve a list of delivery services
     * 
     */
    public getDeliveryServices(): Observable<Response> {

        const url = this.baseUrl + '/services';
        const opt = { headers: {'Accept': 'application/json',
                                'Authorization': 'bearer ' + this.token}};           

        const response: Response = new Response();
        response.actionName = 'shiptheory_services';
        response.dateTime = new Date();
                                                        
        return this.http.get(url, opt).pipe(
            flatMap((resp: AxiosResponse) => {
                console.log(resp);
                response.status = Response.ACTION_OK;
                response.data = resp.data;
                return of(response);
                }),
            catchError((error: any) => {
                console.log(error);
                response.status = Response.ACTION_FAIL;
                response.errorMessage = error.toString();
                return of(response);
            }),
         );

    }

    /**
     * 
     * crate a booking
     * 
     */
    public bookShipment(shipment: ShippingRequest): Observable<Response> {

        const url = this.baseUrl + '/shipments';
        const opt = { headers: {'Accept': 'application/json',
                                'Authorization': 'bearer ' + this.token}};           
        const data = querystring.stringify(shipment);
        console.log(data);

        const response: Response = new Response();
        response.actionName = 'shiptheory_bookshipment`';
        response.dateTime = new Date();
                                                        
        return this.http.post(url, data, opt).pipe(
            flatMap((resp: AxiosResponse) => {
                console.log(resp);
                if (resp.data.error) {
                    response.status = Response.ACTION_FAIL;
                    response.errorMessage = resp.data.error;    
                } else if(resp.data.success === true && resp.data.carrier_result === null){
                    response.status = Response.ACTION_FAIL;
                    response.errorMessage = resp.data.message;    
                } else if(resp.data.carrier_result.status === 'failed') {
                    response.status = Response.ACTION_FAIL;
                    response.errorMessage = resp.data.message;    
                } else {
                    response.status = Response.ACTION_OK;
                    response.data = resp.data;
                }
                return of(response);
                }),
            catchError((error: any) => {
                console.log(error);
                response.status = Response.ACTION_FAIL;
                response.errorMessage = error.toString();
                return of(response);
            }),
         );

    }

    /**
     * a function for url encoding of deep objects
     */
    private urlEncode(params: any, prefix: string) {
	
		let items: any = [];
		
		for(const field in params) {
			
			const key  = prefix ? prefix + "[" + field + "]" : field;
			const type = typeof params[field];
			
			switch(type) {
			
				case "object":
					
					// handle arrays appropriately x[]=1&x[]=3
					if(params[field].constructor == Array) {
						params[field].forEach(function(val: any) {
							items.push(key + "[]=" + val);
						}, this);
					} else {
						//recusrively construct the sub-object
						items = items.concat(this.urlEncode(params[field], key));
					}
					break;
				case "function":
					break;
				default:
					items.push(key + "=" + escape(params[field]));
					break;
			}
		}

		return items.join("&");
	}
 }