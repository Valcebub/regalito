let notas = JSON.parse(localStorage.getItem("notas")) || [];
let recordatorios = [];

function guardarNota() {
  const autor = document.getElementById("autor").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!autor || !mensaje) return;

  const nuevaNota = { autor, mensaje };
  notas.push(nuevaNota);

  localStorage.setItem("notas", JSON.stringify(notas));

  mostrarNotas();

  document.getElementById("autor").value = "";
  document.getElementById("mensaje").value = "";
}


function borrarNota(index) {
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  mostrarNotas();
}



function mostrarNotas() {
  const contenedor = document.getElementById("notas");
  contenedor.innerHTML = "";

  notas.forEach((nota, index) => {
    contenedor.innerHTML += `
      <div class="nota">
        <strong>${nota.autor}</strong>
        <p>${nota.mensaje}</p>
        <button onclick="borrarNota(${index})">🗑️</button>
      </div>
    `;
  });
}


function agregarRecordatorio() {
  const hora = document.getElementById("hora").value;
  const texto = document.getElementById("textoRecordatorio").value;

  recordatorios.push({ hora, texto });
}

setInterval(() => {
  const ahora = new Date();
  const horaActual = ahora.toTimeString().slice(0,5);

  recordatorios.forEach(r => {
    if (r.hora === horaActual) {
      document.getElementById("alerta").innerText = "💖 " + r.texto;
    }
  });
}, 1000);

mostrarNotas();



let horario = JSON.parse(localStorage.getItem("horario")) || [];

function guardarHorario(btn) {
  const fila = btn.parentElement;
  const hora = fila.querySelector(".hora-horario").value;
  const mensaje = fila.querySelector(".mensaje-horario").value;

  if (!hora || !mensaje) {
    alert("Completa hora y mensaje 💕");
    return;
  }

  const existente = horario.find(h => h.hora === hora);
  if (existente) {
    existente.mensaje = mensaje;
  } else {
    horario.push({ hora, mensaje });
  }

  localStorage.setItem("horario", JSON.stringify(horario));
}



// CHEQUEO DIARIO
setInterval(() => {
  const ahora = new Date();
  const horaActual = ahora.toTimeString().slice(0, 5);

  horario.forEach(h => {
    if (h.hora === horaActual) {
      document.getElementById("alerta").innerText = "💖 " + h.mensaje;
    }
  });
}, 1000);

function agregarFilaHorario() {
  const contenedor = document.querySelector(".card:nth-of-type(2)");
  
  const nuevaFila = document.createElement("div");
  nuevaFila.classList.add("horario-item");

  nuevaFila.innerHTML = `
    <input type="time" class="hora-horario">
    <input class="mensaje-horario" placeholder="Mensaje automático 💕">
    <button onclick="guardarHorario(this)">💾</button>
  `;

  contenedor.insertBefore(nuevaFila, contenedor.lastElementChild);
}



