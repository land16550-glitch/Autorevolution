const storage = {
  clientes: JSON.parse(localStorage.getItem('clientes')) || [],
  vehiculos: JSON.parse(localStorage.getItem('vehiculos')) || [],
  citas: JSON.parse(localStorage.getItem('citas')) || [],
  mantenimientos: JSON.parse(localStorage.getItem('mantenimientos')) || []
};

function guardarDatos() {
  localStorage.setItem('clientes', JSON.stringify(storage.clientes));
  localStorage.setItem('vehiculos', JSON.stringify(storage.vehiculos));
  localStorage.setItem('citas', JSON.stringify(storage.citas));
  localStorage.setItem('mantenimientos', JSON.stringify(storage.mantenimientos));
}

function actualizarContadores() {
  document.getElementById('totalClientes').textContent = storage.clientes.length;
  document.getElementById('totalVehiculos').textContent = storage.vehiculos.length;
  document.getElementById('totalCitas').textContent = storage.citas.length;
  document.getElementById('totalMantenimientos').textContent = storage.mantenimientos.length;
}

function renderLista(id, datos, formato) {
  const contenedor = document.getElementById(id);
  contenedor.innerHTML = '';
  if (datos.length === 0) {
    contenedor.innerHTML = '<p>No hay registros todavía.</p>';
    return;
  }
  datos.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<strong>#${index + 1}</strong> - ${formato(item)}`;
    contenedor.appendChild(div);
  });
}

function renderTodo() {
  actualizarContadores();
  renderLista('listaClientes', storage.clientes, c => `${c.nombre} | ${c.telefono} | ${c.correo || 'Sin correo'} | ${c.direccion || 'Sin dirección'}`);
  renderLista('listaVehiculos', storage.vehiculos, v => `${v.marca} ${v.modelo} (${v.anio || 'N/A'}) | Placa: ${v.placa} | Propietario: ${v.propietario}`);
  renderLista('listaCitas', storage.citas, c => `${c.cliente} | ${c.vehiculo} | ${c.fecha} ${c.hora} | Servicio: ${c.servicio}`);
  renderLista('listaMantenimientos', storage.mantenimientos, m => `${m.vehiculo} | ${m.fecha} | ${m.descripcion} | Costo: RD$${m.costo || 0}`);
}

document.getElementById('formCliente').addEventListener('submit', e => {
  e.preventDefault();
  storage.clientes.push({
    nombre: clienteNombre.value,
    telefono: clienteTelefono.value,
    correo: clienteCorreo.value,
    direccion: clienteDireccion.value
  });
  guardarDatos();
  e.target.reset();
  renderTodo();
});

document.getElementById('formVehiculo').addEventListener('submit', e => {
  e.preventDefault();
  storage.vehiculos.push({
    marca: vehiculoMarca.value,
    modelo: vehiculoModelo.value,
    anio: vehiculoAnio.value,
    placa: vehiculoPlaca.value,
    propietario: vehiculoPropietario.value
  });
  guardarDatos();
  e.target.reset();
  renderTodo();
});

document.getElementById('formCita').addEventListener('submit', e => {
  e.preventDefault();
  storage.citas.push({
    cliente: citaCliente.value,
    vehiculo: citaVehiculo.value,
    fecha: citaFecha.value,
    hora: citaHora.value,
    servicio: citaServicio.value
  });
  guardarDatos();
  e.target.reset();
  renderTodo();
});

document.getElementById('formMantenimiento').addEventListener('submit', e => {
  e.preventDefault();
  storage.mantenimientos.push({
    vehiculo: mantVehiculo.value,
    fecha: mantFecha.value,
    descripcion: mantDescripcion.value,
    costo: mantCosto.value
  });
  guardarDatos();
  e.target.reset();
  renderTodo();
});

renderTodo();
