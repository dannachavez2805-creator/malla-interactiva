const materias = document.querySelectorAll(".materia");
const detalle = document.getElementById("detalle");

materias.forEach(materia => {
  materia.addEventListener("click", () => {
    detalle.textContent = materia.dataset.info;
  });
});
