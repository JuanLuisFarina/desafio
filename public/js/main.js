const socket = io();

const newProduct = document.getElementById('newProduct');
newProduct.addEventListener('submit', event => {
  event.preventDefault();

  const id = document.getElementById('ID').value;
  const name = document.getElementById('NAME').value;
  const price = document.getElementById('price').value;
  const src = document.getElementById('src').value;

  console.log(`${name}, #${id}, $${price}, ${src}`);
  socket.emit('new_product', {id, name, price, src});

  newProduct.reset();
});

const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', event => {
  event.preventDefault();

  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
  const mail = document.getElementById('email').value;
  const text = document.getElementById('text').value;

  console.log(`${date}, ${mail}, ${text}`);
  socket.emit('new_message', {date, mail, text});

  messageForm.reset();
});

socket.on('connect', () => {
  console.warn('Conectado al servidor');
});

socket.on('update_products', products => {
  fetch('http://localhost:8080/views/products-render.hbs')
    .then(response => response.text())
    .then(plantilla => {
      const template = Handlebars.compile(plantilla);
      const html = template({products});

      document.getElementById('productos').innerHTML = html;
    });
});

socket.on('update_messages', messages => {
  fetch('http://localhost:8080/views/messages-render.hbs')
    .then(response => response.text())
    .then(plantilla => {
      const template = Handlebars.compile(plantilla);
      const html = template({messages});

      document.getElementById('messageDisplay').innerHTML = html;
    });
});
