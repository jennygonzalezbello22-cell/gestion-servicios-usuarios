export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  password?: string;
  rol: string;
  estado?: boolean;
}