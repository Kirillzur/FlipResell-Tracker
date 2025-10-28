
export interface Item {
    id: string;
    name: string;
    price: number;
    sellPrice?: number;  // Optional Because ?
    date: string;
    sellDate?: string;   // Optional Because ?
}