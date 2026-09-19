const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL || '';

export const API_BASE_URL = configuredBackendUrl.replace(/\/$/, '');
export const SOCKET_URL = API_BASE_URL || undefined;
