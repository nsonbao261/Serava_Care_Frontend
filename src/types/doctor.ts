export interface Doctor {
   id: string;
   slug: string;
   name: string;
   title: string;
   specialty?: string;
   experience: string;
   hospital: string;
   location?: string;
   rating: number;
   reviewCount?: number;
   consultationFee: string;
   image?: string;
}
