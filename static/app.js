function displayMemo(memos) {
  const ul = document.querySelector("#memo-ul");
  const li = document.querySelector("li");
  li.innerText = `[id:${memos.id}] ${memos.content}`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

readMemo();

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
