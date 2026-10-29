(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const i="https://inai-col2.fishrungames.com/api",d={async register(t){const e=await fetch(`${i}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Ошибка регистрации");return e.json()},async login(t){const e=await fetch(`${i}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Неверный логин или пароль");return e.json()},async getProfile(){const t=localStorage.getItem("token"),e=await fetch(`${i}/auth/profile`,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error("Не удалось загрузить профиль");return e.json()},async updateProfile(t){const e=localStorage.getItem("token"),n=await fetch(`${i}/auth/profile`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)});if(!n.ok)throw new Error("Не удалось обновить профиль");return n.json()}},y=document.getElementById("app");function c(t="Загрузка..."){let e=document.getElementById("global-loader");e||(e=document.createElement("div"),e.id="global-loader",e.className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 text-white text-xl font-bold",document.body.appendChild(e)),e.innerHTML=`<div class="bg-gray-800 p-6 rounded-xl shadow-2xl border border-red-500/30 flex items-center gap-4">
    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
    <span>${t}</span>
  </div>`,e.style.display="flex"}function u(){const t=document.getElementById("global-loader");t&&(t.style.display="none")}function b(){var o;y.innerHTML=`
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
  `;let t=!0;const e=document.getElementById("tab-login"),n=document.getElementById("tab-register"),a=document.getElementById("username-field"),r=document.getElementById("submit-btn");e.addEventListener("click",()=>{t=!0,e.className="flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition",n.className="flex-1 py-2 font-semibold rounded-lg text-gray-400 transition",a.classList.add("hidden"),r.innerText="Войти"}),n.addEventListener("click",()=>{t=!1,n.className="flex-1 py-2 font-semibold rounded-lg bg-red-600 text-white transition",e.className="flex-1 py-2 font-semibold rounded-lg text-gray-400 transition",a.classList.remove("hidden"),r.innerText="Зарегистрироваться"}),(o=document.getElementById("auth-form"))==null||o.addEventListener("submit",async l=>{var f;l.preventDefault();const g=document.getElementById("email").value,m=document.getElementById("password").value,x=(f=document.getElementById("username"))==null?void 0:f.value;try{if(t){c("Авторизация в системе...");const s=await d.login({email:g,password:m});localStorage.setItem("token",s.access_token||s.token),p()}else c("Регистрация аккаунта..."),await d.register({username:x,email:g,password:m}),alert("Регистрация прошла успешно! Теперь воведите свои данные."),e.click()}catch(s){alert(s.message||"Произошла ошибка")}finally{u()}})}async function p(){var t,e;c("Загрузка профиля...");try{const n=await d.getProfile();y.innerHTML=`
      <div class="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div class="max-w-lg w-full p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-extrabold text-red-500">🎸 Кабинет участника</h2>
            <button id="logout-btn" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-xl border border-gray-700 transition">Выйти</button>
          </div>
          
          <form id="profile-form" class="space-y-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Имя пользователя</label>
              <input type="text" id="p-username" value="${n.username||""}" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email (нельзя изменить)</label>
              <input type="email" id="p-email" value="${n.email||""}" disabled class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-400 mb-1">Роль в группе / О себе (Bio)</label>
              <textarea id="p-bio" rows="3" class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500">${n.bio||""}</textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-green-600 hover:bg-green-700 font-bold rounded-xl shadow-lg shadow-green-600/30 transition">Сохранить изменения</button>
          </form>
        </div>
      </div>
    `,(t=document.getElementById("profile-form"))==null||t.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("p-username").value,o=document.getElementById("p-bio").value;try{c("Сохранение профиля..."),await d.updateProfile({username:r,bio:o}),alert("Профиль успешно обновлен!")}catch{alert("Ошибка при обновлении профиля")}finally{u()}}),(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{localStorage.removeItem("token"),b()})}catch{localStorage.removeItem("token"),b()}finally{u()}}const h=localStorage.getItem("token");h?p():b();
