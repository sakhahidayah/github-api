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
        if (data) {
          console.log(data);
          document.getElementById("list").innerHTML = `
           <div class="flex items-center gap-4">
            <img src="${data.avatar_url}" alt="avatar" class="w-16 h-16 rounded-full border" />
            <div class=" flex flex-col ">
            <h3 class="text-lg font-semibold text-gray-700">${data.login}</h3>
            <h3 class="text-[10px] font-normal text-gray-400">${data.bio}</h3>
            </div>
         </div>
            `;
        } else {
          console.log("Username Not Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
