import { api } from './api';

const appDiv = document.getElementById('app') as HTMLDivElement;

// Плашка загрузки (лоадер)
function showLoader(text: string = 'Загрузка...') {
  let loader = document.getElementById('global-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-white text-xl font-bold';
    document.body.appendChild(loader);
  }
  loader.innerHTML = `<div class="bg-gray-800 p-6 rounded-xl shadow-2xl border border-red-500/30 flex items-center gap-4">
    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
    <span>${text}</span>
  </div>`;
  loader.style.display = 'flex';
}

function hideLoader() {
  const loader = document.getElementById('global-loader');
  if (loader) loader.style.display = 'none';
}

function renderAuthPage() {
  appDiv.innerHTML = `
    <div class="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div class="max-w-md w-full p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
        <h2 class="text-3xl font-extrabold mb-2 text-center text-red-500">🎸 Rock Band Portal</h2>
        <p class="text-gray-400 text-center mb-6 text-sm">Вход в систему участников группы</p>
        
        <div class="flex mb-6 bg-gray-800 p-1 rounded-xl">
          <button id="tab-login" class="flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition">Вход</button>
          <button id="tab-register" class="flex-1 py-2 font-semibold rounded-lg text-gray-400 transition">Регистрация</button>
        </div>

        <form id="auth-form" class="space-y-4">
          <div id="username-field" class="hidden">
            <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Имя пользователя</label>
            <input type="text" id="username" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email</label>
            <input type="email" id="email" required class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Пароль</label>
            <input type="password" id="password" required class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
          </div>
          <button type="submit" id="submit-btn" class="w-full py-3 bg-red-600 hover:bg-red-700 font-bold rounded-xl shadow-lg shadow-red-600/30 transition">Войти</button>
        </form>
      </div>
    </div>
  `;

  let isLogin = true;
  const tabLogin = document.getElementById('tab-login')!;
  const tabRegister = document.getElementById('tab-register')!;
  const usernameField = document.getElementById('username-field')!;
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

  tabLogin.addEventListener('click', () => {
    isLogin = true;
    tabLogin.className = 'flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition';
    tabRegister.className = 'flex-1 py-2 font-semibold rounded-lg text-gray-400 transition';
    usernameField.classList.add('hidden');
    submitBtn.innerText = 'Войти';
  });

  tabRegister.addEventListener('click', () => {
    isLogin = false;
    tabRegister.className = 'flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition';
    tabLogin.className = 'flex-1 py-2 font-semibold rounded-lg text-gray-400 transition';
    usernameField.classList.remove('hidden');
    submitBtn.innerText = 'Зарегистрироваться';
  });

  document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement)?.value;

    try {
      if (isLogin) {
        showLoader('Авторизация в системе...');
        const data = await api.login({ email, password });
        localStorage.setItem('token', data.access_token || data.token);
        renderProfilePage();
      } else {
        showLoader('Регистрация аккаунта...');
        await api.register({ username, email, password });
        alert('Регистрация прошла успешно! Теперь воведите свои данные.');
        tabLogin.click();
      }
    } catch (err: any) {
      alert(err.message || 'Произошла ошибка');
    } finally {
      hideLoader();
    }
  });
}

async function renderProfilePage() {
  showLoader('Загрузка профиля...');
  try {
    const profile = await api.getProfile();
    appDiv.innerHTML = `
      <div class="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div class="max-w-lg w-full p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-extrabold text-red-500">🎸 Кабинет участника</h2>
            <button id="logout-btn" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-xl border border-gray-700 transition">Выйти</button>
          </div>
          
          <form id="profile-form" class="space-y-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Имя пользователя</label>
              <input type="text" id="p-username" value="${profile.username || ''}" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email (нельзя изменить)</label>
              <input type="email" id="p-email" value="${profile.email || ''}" disabled class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Роль в группе / О себе (Bio)</label>
              <textarea id="p-bio" rows="3" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500">${profile.bio || ''}</textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-green-600 hover:bg-green-700 font-bold rounded-xl shadow-lg shadow-green-600/30 transition">Сохранить изменения</button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('profile-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = (document.getElementById('p-username') as HTMLInputElement).value;
      const bio = (document.getElementById('p-bio') as HTMLInputElement).value;
      try {
        showLoader('Сохранение профиля...');
        await api.updateProfile({ username, bio });
        alert('Профиль успешно обновлен!');
      } catch (err) {
        alert('Ошибка при обновлении профиля');
      } finally {
        hideLoader();
      }
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('token');
      renderAuthPage();
    });

  } catch (err) {
    localStorage.removeItem('token');
    renderAuthPage();
  } finally {
    hideLoader();
  }
}

// Проверка токена при старте
const token = localStorage.getItem('token');
if (token) {
  renderProfilePage();
} else {
  renderAuthPage();
}