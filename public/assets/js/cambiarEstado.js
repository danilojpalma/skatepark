// Obtener todos los checkboxes

const checkboxes = document.querySelectorAll('input[type="checkbox"]');


// Agregar evento click a cada checkbox

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (event) => {
    const userId = event.target.dataset.userId;
    const estado = event.target.checked;
    updateEstado(userId, estado);
  });

});


function updateEstado(userId, estado) {
  fetch(`/update-estado/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  })

 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));

}