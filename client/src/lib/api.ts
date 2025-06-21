import { supabase } from './supabase';

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new HttpError(response.status, errorData.message || 'An error occurred');
    }
    return response.json();
  },

  put: async <T>(url: string, body: any): Promise<T> => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new HttpError(response.status, errorData.message || 'An error occurred');
    }
    return response.json();
  },
  
  // Add post, delete methods as needed
};
