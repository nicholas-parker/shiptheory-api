import { ShipmentAddress } from './shipmentaddress';
import { ShipmentDetail } from './shipmentdetail';
import { ShipmentProduct } from './shipmentproduct';

export class ShippingRequest {

    public reference: string | undefined;

    public reference2: string | undefined;

    public shipment_detail: ShipmentDetail | undefined;

    public recipient: ShipmentAddress | undefined;

    public sender: ShipmentAddress | undefined;

    public products: ShipmentProduct[] | undefined;

}

