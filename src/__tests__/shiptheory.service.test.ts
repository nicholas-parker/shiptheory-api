import { HttpService } from '@nestjs/common';
import { flatMap } from 'rxjs/operators';
import { ShipmentAddress } from '../shipmentaddress';
import { ShipmentDetail } from '../shipmentdetail';
import { ShipmentProduct } from '../shipmentproduct';
import { ShippingRequest } from '../shippingrequest';
import { Response } from './../response';
import { ShiptheoryService } from './../shiptheory.sesrvice';


/**
 * valid creds
 */
const valid_email = 'nick.parker@lovemyproduct.biz';
const valid_pwd = 'Nelson99!';

/**
 * valid creds
 */
const invalid_email = 'noone@lovemyproduct.biz';
const invalid_pwd = 'duff';

/**
 * 
 * test the authentication for a valid credentials
 * 
 */
test('Valid authentication', done => {
    const http = new HttpService();
    const service = new ShiptheoryService(http);
    service.setCredentials(valid_email, valid_pwd)
    return service.authenticate()
                  .subscribe((data: Response) => {
                    expect(data.status).toEqual(Response.ACTION_OK);
                    done()});
    
  });

/**
 * 
 * test the authentication for invalid credentials
 * 
 */
test('Invalid authentication', done => {
  const http = new HttpService();
  const service = new ShiptheoryService(http);
  service.setCredentials(invalid_email, invalid_pwd)
  return service.authenticate()
                .subscribe((data: Response) => {
                  expect(data.status).toEqual(Response.ACTION_FAIL);
                  done();});
  
  });


/**
 * list the Shiptheiry services
 */
test('List services', done => {
  const http = new HttpService();
  const service = new ShiptheoryService(http);
  service.setCredentials(valid_email, valid_pwd);
  return service.authenticate()
                .pipe(
                  flatMap(o => service.getDeliveryServices())
                )
                .subscribe((data: Response) => {
                  console.log(data);
                  expect(data.status).toEqual(Response.ACTION_OK);
                  done();});
  
  });

  /**
   * book a shipment succesfulyy
   */
  test('Book shipment', done => {
    const http = new HttpService();
    const service = new ShiptheoryService(http);
    const shipment = new ShippingRequest();
    const d = new Date();
    
    shipment.reference = 'TEST-' + d.getTime();
    shipment.reference2 = 'T/T';
    shipment.shipment_detail = new ShipmentDetail();
    shipment.shipment_detail.parcels = 1;
    shipment.shipment_detail.value = 24.00;
    shipment.shipment_detail.weight = 6;
    shipment.sender = new ShipmentAddress();
    shipment.sender.company = 'Love My Product';
    shipment.sender.firstname = 'Nick';
    shipment.sender.lastname = 'Parker';
    shipment.sender.address_line_1 = 'Chance Cottage, Long Mill Lane';
    shipment.sender.city = 'Tonbridge';
    shipment.sender.postcode = 'TN11 9SA';
    shipment.sender.telephone = '07713565190';
    shipment.sender.country = 'GB';
    shipment.recipient = new ShipmentAddress();
    shipment.recipient.company = 'Sarahs Blog';
    shipment.recipient.firstname = 'Sarah';
    shipment.recipient.lastname = 'Blogg';
    shipment.recipient.address_line_1 = 'St Julians';
    shipment.recipient.city = 'Sevenoaks';
    shipment.recipient.postcode = 'TN15 0RX';
    shipment.recipient.telephone = '01732 743003';
    shipment.recipient.country = 'GB';
    shipment.products = new Array<ShipmentProduct>();
    const prod1 = new ShipmentProduct();
    prod1.name = 'Original Pork';
    prod1.qty = 2;
    prod1.sku = 'PK1';
    prod1.value = 8;
    prod1.weight = 2;
    shipment.products.push(prod1);
    const prod2 = new ShipmentProduct();
    prod2.name = 'Chicken Chipolatas';
    prod1.qty = 2;
    prod1.sku = 'PK2';
    prod1.value = 8;
    prod1.weight = 2;
    shipment.products.push(prod2);
    const prod3 = new ShipmentProduct();
    prod1.name = 'Beetroot Sausage';
    prod1.qty = 2;
    prod1.sku = 'PK3';
    prod1.value = 8;
    prod1.weight = 2;
    shipment.products.push(prod3);

    
    service.setCredentials(valid_email, valid_pwd);
    return service.authenticate()
                  .pipe(
                    flatMap(o => service.bookShipment(shipment))
                  )
                  .subscribe((data: Response) => {
                    console.log(data);
                    expect(data.status).toEqual(Response.ACTION_OK);
                    done();});
    
    });

    /**
     * book a shipment where no shipping rules match.
     * Delivery address in a country with no shipping rules
     */
    test('No shipping rules', done => {
      const http = new HttpService();
      const service = new ShiptheoryService(http);
      const shipment = new ShippingRequest();
      const d = new Date();
      
      shipment.reference = 'TEST-' + d.getTime();
      shipment.reference2 = 'T/T';
      shipment.shipment_detail = new ShipmentDetail();
      shipment.shipment_detail.parcels = 1;
      shipment.shipment_detail.value = 24.00;
      shipment.shipment_detail.weight = 6;
      shipment.sender = new ShipmentAddress();
      shipment.sender.company = 'Love My Product';
      shipment.sender.firstname = 'Nick';
      shipment.sender.lastname = 'Parker';
      shipment.sender.address_line_1 = 'Chance Cottage, Long Mill Lane';
      shipment.sender.city = 'Tonbridge';
      shipment.sender.postcode = 'TN11 9SA';
      shipment.sender.telephone = '07713565190';
      shipment.sender.country = 'GB';
      shipment.recipient = new ShipmentAddress();
      shipment.recipient.company = 'Sarahs Blog';
      shipment.recipient.firstname = 'Sarah';
      shipment.recipient.lastname = 'Blogg';
      shipment.recipient.address_line_1 = 'St Julians';
      shipment.recipient.city = 'Sevenoaks';
      shipment.recipient.postcode = 'TN15 0RX';
      shipment.recipient.telephone = '01732 743003';
      shipment.recipient.country = 'FR';
      shipment.products = new Array<ShipmentProduct>();
      const prod1 = new ShipmentProduct();
      prod1.name = 'Original Pork';
      prod1.qty = 2;
      prod1.sku = 'PK1';
      prod1.value = 8;
      prod1.weight = 2;
      shipment.products.push(prod1);
      const prod2 = new ShipmentProduct();
      prod2.name = 'Chicken Chipolatas';
      prod1.qty = 2;
      prod1.sku = 'PK2';
      prod1.value = 8;
      prod1.weight = 2;
      shipment.products.push(prod2);
      const prod3 = new ShipmentProduct();
      prod1.name = 'Beetroot Sausage';
      prod1.qty = 2;
      prod1.sku = 'PK3';
      prod1.value = 8;
      prod1.weight = 2;
      shipment.products.push(prod3);
  
      
      service.setCredentials(valid_email, valid_pwd);
      return service.authenticate()
                    .pipe(
                      flatMap(o => service.bookShipment(shipment))
                    )
                    .subscribe((data: Response) => {
                      console.log(data);
                      expect(data.status).toEqual(Response.ACTION_FAIL);
                      done();});
      
      });


      /**
       * shpping address not complete
       */
      test('Incomplete shipping recipient', done => {
        const http = new HttpService();
        const service = new ShiptheoryService(http);
        const shipment = new ShippingRequest();
        const d = new Date();
        
        shipment.reference = 'TEST-' + d.getTime();
        shipment.reference2 = 'T/T';
        shipment.shipment_detail = new ShipmentDetail();
        shipment.shipment_detail.parcels = 1;
        shipment.shipment_detail.value = 24.00;
        shipment.shipment_detail.weight = 6;
        shipment.sender = new ShipmentAddress();
        shipment.sender.company = 'Love My Product';
        shipment.sender.firstname = 'Nick';
        shipment.sender.lastname = 'Parker';
        shipment.sender.address_line_1 = 'Chance Cottage, Long Mill Lane';
        shipment.sender.city = 'Tonbridge';
        shipment.sender.postcode = 'TN11 9SA';
        shipment.sender.telephone = '07713565190';
        shipment.sender.country = 'GB';
        shipment.recipient = new ShipmentAddress();
        shipment.recipient.company = 'Sarahs Blog';
        shipment.recipient.firstname = 'Sarah';
        shipment.recipient.lastname = 'Blogg';
        shipment.recipient.address_line_1 = 'St Julians';
        shipment.recipient.city = 'Sevenoaks';
        shipment.recipient.postcode = '';
        shipment.recipient.telephone = '01732 743003';
        shipment.recipient.country = 'GB';
        shipment.products = new Array<ShipmentProduct>();
        const prod1 = new ShipmentProduct();
        prod1.name = 'Original Pork';
        prod1.qty = 2;
        prod1.sku = 'PK1';
        prod1.value = 8;
        prod1.weight = 2;
        shipment.products.push(prod1);
        const prod2 = new ShipmentProduct();
        prod2.name = 'Chicken Chipolatas';
        prod1.qty = 2;
        prod1.sku = 'PK2';
        prod1.value = 8;
        prod1.weight = 2;
        shipment.products.push(prod2);
        const prod3 = new ShipmentProduct();
        prod1.name = 'Beetroot Sausage';
        prod1.qty = 2;
        prod1.sku = 'PK3';
        prod1.value = 8;
        prod1.weight = 2;
        shipment.products.push(prod3);
    
        
        service.setCredentials(valid_email, valid_pwd);
        return service.authenticate()
                      .pipe(
                        flatMap(o => service.bookShipment(shipment))
                      )
                      .subscribe((data: Response) => {
                        console.log(data);
                        expect(data.status).toEqual(Response.ACTION_FAIL);
                        done();});
        
        });