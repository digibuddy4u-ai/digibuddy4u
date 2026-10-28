export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async get(endpoint) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const res = await fetch(`${API_URL}/${cleanEndpoint}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed (HTTP ${res.status})`);
    }
    return data;
  },

  async post(endpoint, body) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const res = await fetch(`${API_URL}/${cleanEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed (HTTP ${res.status})`);
    }
    return data;
  },
};

export async function submitEnquiry(enquiryData) {
  return api.post('/enquiries', enquiryData);
}

export async function fetchPublicData(endpoint, fallbackData) {
  try {
    const data = await api.get(endpoint);
    if (data.success && data.data) {
      if (Array.isArray(data.data) && data.data.length === 0) {
        return fallbackData;
      }
      return data.data;
    }
    return fallbackData;
  } catch {
    return fallbackData;
  }
}
