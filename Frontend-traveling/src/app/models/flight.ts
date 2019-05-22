export interface Flight {
    $id?: string;
    fromCity?: string;
    toCity?: string;
    departureDate?: string;
    returnDate?: string,
    departureHour?: string;
    returnHour?: string,
    airlineName?: string,
    flightDuration?: string,
    classType?: string,
    isFoodInkl: number,
    seatsNbr?: number;
    price?: number;
}
