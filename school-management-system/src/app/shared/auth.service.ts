import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Set a cookie
    setCookie(name: string, value: string, path = '/', expires?: Date): void {
    let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}`;
    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`;
    }
    document.cookie = cookieString;
  }

  // Get a cookie
   getCookie(name: string): string | null {
    const cookieArr = document.cookie.split(';');
    for (const cookie of cookieArr) {
      const [key, val] = cookie.trim().split('=');
      if (key === name) {
        return decodeURIComponent(val);
      }
    }
    return null;
  }

  // Delete a cookie
   deleteCookie(name: string, path = '/'): void {
    document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  }

  isAuthenticated(){
    return !!this.getCookie('authToken')
  }
}
