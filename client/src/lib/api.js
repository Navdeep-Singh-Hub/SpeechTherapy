const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "Cannot reach the API server. Check that Render is running and VITE_API_URL is set on Vercel."
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no body */
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  registerVolunteer: (payload) =>
    request("/registrations", { method: "POST", body: payload }),
  getCount: () => request("/registrations/count"),

  // admin
  login: (username, password) =>
    request("/auth/login", { method: "POST", body: { username, password } }),
  listRegistrations: (params, token) => {
    const qs = new URLSearchParams(
      Object.entries(params || {}).filter(([, v]) => v !== "" && v != null)
    ).toString();
    return request(`/registrations${qs ? `?${qs}` : ""}`, { token });
  },
  getStats: (token) => request("/registrations/stats", { token }),
  updateStatus: (id, status, token) =>
    request(`/registrations/${id}`, { method: "PATCH", body: { status }, token }),
  remove: (id, token) =>
    request(`/registrations/${id}`, { method: "DELETE", token }),
};
