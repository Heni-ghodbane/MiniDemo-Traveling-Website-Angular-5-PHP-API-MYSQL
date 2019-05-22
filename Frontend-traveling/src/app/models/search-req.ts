export interface SearchReq {
    $key?:string;
    fromCity?:string;
    toCity?:string;
    departureDate?:string;
    returnDate?:string,
    passengerNbr?:number;
}
