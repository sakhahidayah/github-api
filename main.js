const formUsername = document.getElementById("formUsername");
const usernameGithub = document.getElementById("usernameGithub");
const btn = document.getElementById("btn");
formUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  getUsername();
  formUsername.reset();
});

function showToast(message, color) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: color,
      borderRadius: "8px",
    },
  }).showToast();
}
function getUsername() {
  const value = usernameGithub.value;
  if (value == "") {
    showToast("Username cannot be empty!!", "#ff5f6d");
  } else {
    const url = "https://api.github.com/users/" + value;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "404") {
          document.getElementById("list").innerHTML = `
           <div class="flex items-center gap-4">
            <img src="${data.avatar_url}" alt="avatar" class="w-16 h-16 rounded-full border" />
            <div class=" flex flex-col ">
            <h3 class="text-lg font-semibold text-start  text-gray-700">${data.login}</h3>
            <h3 class="text-[10px] font-medium mb-1 text-start  text-gray-400">${data.bio}</h3>
            <a target="_blank" class="text-[8px] px-2 py-1 rounded bg-sky-500 hover:bg-sky-700  text-white font-bold transition-all duration-200 text-start" href=${data.html_url}>See more..</a>
            </div>
         </div>
            `;
        } else {
          document.getElementById("list").innerHTML = `<h1 class="text-gray-700 font-bold">Cannot find Username ( <span class="text-gray-500">${value}</span> )</h1>`;
        }
      })
      .catch((error) => {
        document.getElementById("list").innerHTML = `<h1 class="text-gray-700 font-bold">Error:  ( <span class="text-gray-500">${error}</span> )</h1>`;
      });
  }
}
