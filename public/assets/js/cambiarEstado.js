
function updateEstado(checkbox, userId) {
    const estado = checkbox.checked;
    fetch(`/updateEstado/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, estado })
    })
  
   .then(data => console.log(data))
   .catch(error => console.error(error));
  
  }