"use strict";
/**
 *
 * a service class for interacting with the Shiptheory API
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const querystring = require("querystring");
const operators_1 = require("rxjs/operators");
const response_1 = require("./response");
const rxjs_1 = require("rxjs");
let ShiptheoryService = class ShiptheoryService {
    constructor(http) {
        this.http = http;
        /**
         * email, password for authorisation
         */
        this.email = '';
        this.password = '';
        /**
         * base url for services
         */
        this.baseUrl = 'https://shiptheory.com/api';
        /**
         * the authrisation token
         */
        this.token = '';
        this.isAuhtorised = false;
    }
    /**
     *
     * Set the authentication credentials, prior to calling any methods
     *
     * @param e email address
     * @param p password
     *
     */
    setCredentials(e, p) {
        this.email = e;
        this.password = p;
    }
    authenticate() {
        const url = this.baseUrl + '/token';
        const headers = { 'Accept': 'application/json' };
        const creds = {
            email: this.email,
            password: this.password
        };
        const body = querystring.stringify(creds);
        const response = new response_1.Response();
        response.actionName = 'shiptheory_authenticate';
        response.dateTime = new Date();
        return this.http.post(url, body).pipe(operators_1.flatMap((resp) => {
            console.log(response);
            this.token = resp.data.data.token;
            response.status = response_1.Response.ACTION_OK;
            response.data = resp.data;
            return rxjs_1.of(response);
        }), operators_1.catchError((error) => {
            console.log(response);
            response.status = response_1.Response.ACTION_FAIL;
            response.errorMessage = error.toString();
            return rxjs_1.of(response);
        }));
    }
    /**
     *
     * retrieve a list of delivery services
     *
     */
    getDeliveryServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + '/services';
            const headers = {
                'Accept': 'application/json'
            };
            return null;
        });
    }
};
ShiptheoryService = __decorate([
    common_1.Injectable()
], ShiptheoryService);
exports.ShiptheoryService = ShiptheoryService;
