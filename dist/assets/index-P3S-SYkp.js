(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://inai-col2.fishrungames.com/api`,t={async register(t){let n=await fetch(`${e}/auth/register`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Ошибка регистрации`);return n.json()},async login(t){let n=await fetch(`${e}/auth/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Неверный логин или пароль`);return n.json()},async getProfile(){let t=localStorage.getItem(`token`),n=await fetch(`${e}/auth/profile`,{headers:{Authorization:`Bearer ${t}`}});if(!n.ok)throw Error(`Не удалось загрузить профиль`);return n.json()},async updateProfile(t){let n=localStorage.getItem(`token`),r=await fetch(`${e}/auth/profile`,{method:`PUT`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify(t)});if(!r.ok)throw Error(`Не удалось обновить профиль`);return r.json()}},n=document.getElementById(`app`);function r(e=`Загрузка...`){let t=document.getElementById(`global-loader`);t||(t=document.createElement(`div`),t.id=`global-loader`,t.className=`fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-white text-xl font-bold`,document.body.appendChild(t)),t.innerHTML=`<div class="bg-gray-800 p-6 rounded-xl shadow-2xl border border-red-500/30 flex items-center gap-4">
    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
    <span>${e}</span>
  </div>`,t.style.display=`flex`}function i(){let e=document.getElementById(`global-loader`);e&&(e.style.display=`none`)}function a(){n.innerHTML=`
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
  `;let e=!0,a=document.getElementById(`tab-login`),s=document.getElementById(`tab-register`),c=document.getElementById(`username-field`),l=document.getElementById(`submit-btn`);a.addEventListener(`click`,()=>{e=!0,a.className=`flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition`,s.className=`flex-1 py-2 font-semibold rounded-lg text-gray-400 transition`,c.classList.add(`hidden`),l.innerText=`Войти`}),s.addEventListener(`click`,()=>{e=!1,s.className=`flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition`,a.className=`flex-1 py-2 font-semibold rounded-lg text-gray-400 transition`,c.classList.remove(`hidden`),l.innerText=`Зарегистрироваться`}),document.getElementById(`auth-form`)?.addEventListener(`submit`,async n=>{n.preventDefault();let s=document.getElementById(`email`).value,c=document.getElementById(`password`).value,l=document.getElementById(`username`)?.value;try{if(e){r(`Авторизация в системе...`);let e=await t.login({email:s,password:c});localStorage.setItem(`token`,e.access_token||e.token),o()}else r(`Регистрация аккаунта...`),await t.register({username:l,email:s,password:c}),alert(`Регистрация прошла успешно! Теперь воведите свои данные.`),a.click()}catch(e){alert(e.message||`Произошла ошибка`)}finally{i()}})}async function o(){r(`Загрузка профиля...`);try{let e=await t.getProfile();n.innerHTML=`
      <div class="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div class="max-w-lg w-full p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-extrabold text-red-500">🎸 Кабинет участника</h2>
            <button id="logout-btn" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-xl border border-gray-700 transition">Выйти</button>
          </div>
          
          <form id="profile-form" class="space-y-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Имя пользователя</label>
              <input type="text" id="p-username" value="${e.username||``}" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email (нельзя изменить)</label>
              <input type="email" id="p-email" value="${e.email||``}" disabled class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Роль в группе / О себе (Bio)</label>
              <textarea id="p-bio" rows="3" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500">${e.bio||``}</textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-green-600 hover:bg-green-700 font-bold rounded-xl shadow-lg shadow-green-600/30 transition">Сохранить изменения</button>
          </form>
        </div>
      </div>
    `,document.getElementById(`profile-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=document.getElementById(`p-username`).value,a=document.getElementById(`p-bio`).value;try{r(`Сохранение профиля...`),await t.updateProfile({username:n,bio:a}),alert(`Профиль успешно обновлен!`)}catch{alert(`Ошибка при обновлении профиля`)}finally{i()}}),document.getElementById(`logout-btn`)?.addEventListener(`click`,()=>{localStorage.removeItem(`token`),a()})}catch{localStorage.removeItem(`token`),a()}finally{i()}}localStorage.getItem(`token`)?o():a();