export const parseJwt = (token: string): Record<string, any> | null => {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;

    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    
    const decoded = decodeURIComponent(
      json
        .split("")
        .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(decoded);
  } catch (e) {
    console.error("JWT parse failed:", e);
    return null;
  }
};
