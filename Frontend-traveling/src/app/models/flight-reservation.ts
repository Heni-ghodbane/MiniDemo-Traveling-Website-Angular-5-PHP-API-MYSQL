export interface FlightReservation {
  $id?: string;
  id_flight?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  addressOpt?: string;
  country?: string;
  state?: string;
  zipCode?: string;
  paymentMethod?: boolean;
  paymentInfos?: {
    'credit': {
      cardHolder?: string;
      cardNumber?: string;
      expiryMonth?: string;
      expiryYear?: string;
      cvvCode?: string;
    },
    'debit': {
      bankHolder?: string;
      ibanNumber?: string;
      bankName?: string;
      expiryMonth?: string;
      expiryYear?: string;
    }
  }
}



