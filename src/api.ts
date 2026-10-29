const BASE_URL = 'https://inai-col2.fishrungames.com/api';

export interface UserProfile {
  id?: number;
  username: string;
  email: string;
  bio?: string;
}

export const api = {
  async register(data: { username: string; email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Ошибка регистрации');
    return res.json();
  },

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Неверный логин или пароль');
    return res.json();
  },

  async getProfile(): Promise<UserProfile> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Не удалось загрузить профиль');
    return res.json();
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Не удалось обновить профиль');
    return res.json();
  }
};