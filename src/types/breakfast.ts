export interface Guest {
  id: string;
  room: string;
  name: string;
  adults: number;
  children: number;
  entitled: number;
  consumed: number;
  checkInDate: string;
  reservationId: string;
  numberOfPax: number;
  restaurantLocation: string;
  transactionSummary: string;
}

export interface FilterType {
  search: string;
  showEntitled: boolean;
  showConsumed: boolean;
}

export interface ExportRange {
  from: string;
  to: string;
}