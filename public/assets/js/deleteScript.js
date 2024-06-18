console.log("deleteScript.js cargado");

const deleteAccountBtn = document.getElementById("delete-account-btn");
deleteAccountBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma normal
  
    const form = document.getElementById("user-form");
    const email = document.querySelector('input[name="email"]').value;
  
    try {
      const response = await fetch(`/deleteUser/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // El usuario se eliminó correctamente
        window.location.href = "/"; // Redirigir a la página principal
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud DELETE:", error);
    }
  });