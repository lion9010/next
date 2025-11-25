export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type CustomerFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        imageUrl?: string[];
    };
    message?: string | null;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};