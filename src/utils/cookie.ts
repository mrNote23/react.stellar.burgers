type TCookie = any;

type TCookieSetOptions = {
  path?: string;
  expires?: Date | string | number;
  "max-age"?: number;
  domain?: string;
  secure?: boolean;
  "http-only"?: boolean;
};

export const setCookie = (
  name: string,
  value: TCookie,
  options?: TCookieSetOptions
) => {
  options = { path: "/", ...options };

  if (options.expires && typeof options.expires === "number") {
    options.expires = new Date(Date.now() + options.expires * 1000);
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const tmpOptions = [];

  for (const [key, value] of Object.entries(options)) {
    if (value !== true) {
      tmpOptions.push(`${key}=${value}`);
    } else {
      tmpOptions.push(key);
    }
  }
  document.cookie = `${cookie};${tmpOptions.join(";")}`;
};

export const getCookie = (name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
  }
  let match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { "max-age": -1 });
};
