const API = "https://jsonplaceholder.typicode.com/posts";
const lista = document.getElementById("lista");
const estado = document.getElementById("estado");

// Recebe um post (objeto) e devolve um cartão (elemento HTML)
function criarCartao(post) {
  const cartao = document.createElement("div");
  cartao.className = "card mb-3 shadow-sm";
  cartao.innerHTML = `
    <div class="card-body">
      <h5 class="card-title text-capitalize"></h5>
      <p class="card-text text-muted"></p>
      <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
      <button class="btn btn-sm btn-outline-danger">Apagar</button>
    </div>
  `;
  // textContent em vez de innerHTML para os dados da API: é mais seguro
  cartao.querySelector(".card-title").textContent = post.title;
  cartao.querySelector(".card-text").textContent = post.body;
  return cartao;
}

async function carregarPosts() {
  try {
    estado.textContent = "A carregar...";
    const resposta = await fetch(API + "?_limit=6");   // GET
    if (!resposta.ok) throw new Error("Erro HTTP " + resposta.status);
    const posts = await resposta.json();               // JSON -> array de objetos

    posts.forEach((post) => lista.appendChild(criarCartao(post)));
    estado.textContent = "";
  } catch (erro) {
    estado.textContent = "Não foi possível carregar: " + erro.message;
    estado.className = "text-danger";
  }
}

carregarPosts();