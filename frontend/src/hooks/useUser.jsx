import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      let token =
        localStorage.getItem("access") || sessionStorage.getItem("access");
      if (!token) return;

      let res = await fetch("http://localhost:8000/api/accounts/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Access token expired — try refreshing it
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return; // refresh also failed — logout
        token = newToken;

        // Retry with new token
        res = await fetch("http://localhost:8000/api/accounts/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  return user;
}

async function refreshAccessToken() {
  const refresh =
    localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
      const data = await res.json();
      // Save new access token to same storage as before
      if (localStorage.getItem("refresh")) {
        localStorage.setItem("access", data.access);
      } else {
        sessionStorage.setItem("access", data.access);
      }
      return data.access;
    } else {
      // Refresh token also expired — clear everything
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      return null;
    }
  } catch {
    return null;
  }
}
