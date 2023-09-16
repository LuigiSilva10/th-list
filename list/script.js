// Função para carregar a lista de compras do armazenamento local
function carregarLista() {
  // Obtém os itens da lista de compras do armazenamento local e converte de JSON para um array
  const listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];

  // Obtém a referência à lista de compras no HTML
  const listaComprasUl = document.getElementById('lista-compras');

  // Limpa a lista de compras no HTML
  listaComprasUl.innerHTML = '';

  // Itera sobre os itens da lista e cria elementos <li> para exibição no HTML
  for (let i = 0; i < listaCompras.length; i++) {
      const item = listaCompras[i];
      const li = document.createElement('li');
      li.textContent = item;
      
      // Adiciona um botão de remover com um identificador único (índice do item)
      const removerButton = document.createElement('button');
      removerButton.textContent = 'Remover';
      removerButton.addEventListener('click', function () {
          removerItem(i);
      });
      
      li.appendChild(removerButton);
      listaComprasUl.appendChild(li);
  }
}

// Função para adicionar um item à lista
function adicionarItem(event) {
  event.preventDefault(); // Impede o comportamento padrão de enviar o formulário

  // Obtém o valor do campo de entrada
  const itemInput = document.getElementById('item-input');
  const item = itemInput.value.trim(); // Remove espaços em branco no início e no fim

  // Verifica se o campo não está vazio
  if (item) {
      // Obtém a lista de compras atual do armazenamento local ou cria um array vazio se não houver
      const listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];

      // Adiciona o novo item à lista de compras
      listaCompras.push(item);

      // Armazena a lista atualizada de volta no armazenamento local como JSON
      localStorage.setItem('listaCompras', JSON.stringify(listaCompras));

      // Atualiza a exibição da lista de compras no HTML
      carregarLista();

      // Limpa o campo de entrada
      itemInput.value = '';
  }
}

// Função para remover um item da lista pelo índice
function removerItem(index) {
  // Obtém a lista de compras atual do armazenamento local
  const listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];

  // Verifica se o índice é válido
  if (index >= 0 && index < listaCompras.length) {
      // Remove o item com o índice especificado da lista de compras
      listaCompras.splice(index, 1);

      // Armazena a lista atualizada de volta no armazenamento local como JSON
      localStorage.setItem('listaCompras', JSON.stringify(listaCompras));

      // Atualiza a exibição da lista de compras no HTML
      carregarLista();
  }
}

// Função para limpar a lista
function limparLista() {
  // Remove a chave 'listaCompras' do armazenamento local
  localStorage.removeItem('listaCompras');

  // Obtém a referência à lista de compras no HTML e limpa seu conteúdo
  const listaComprasUl = document.getElementById('lista-compras');
  listaComprasUl.innerHTML = '';
}

// Adiciona um ouvinte de evento ao formulário para chamar a função adicionarItem quando o formulário é enviado
document.getElementById('formulario-compras').addEventListener('submit', adicionarItem);

// Adiciona um ouvinte de evento ao botão "Limpar Lista" para chamar a função limparLista quando o botão é clicado
document.getElementById('limpar-lista').addEventListener('click', limparLista);

// Carrega a lista de compras ao carregar a página
carregarLista();
