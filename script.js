const materias = document.querySelectorAll(".materia");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

/* ===== CARGAR PROGRESO ===== */
const progresoGuardado = JSON.parse(localStorage.getItem("materiasCompletadas")) || [];

materias.forEach(materia => {
  const id = materia.dataset.id;
  if (progresoGuardado.includes(id)) {
    materia.classList.add("completada");
  }
});

/* ===== PROGRESO ===== */
function actualizarProgreso() {
  const total = materias.length;
  const completadas = document.querySelectorAll(".materia.completada").length;
  const porcentaje = Math.round((completadas / total) * 100);

  progressBar.style.width = porcentaje + "%";
  progressText.textContent = `Progreso: ${porcentaje}%`;
}

actualizarProgreso();

/* ===== PRERREQUISITOS ===== */
function desbloquearMaterias() {
  const completadas = JSON.parse(localStorage.getItem("materiasCompletadas")) || [];

  materias.forEach(materia => {
    const reqs = materia.dataset.req;
    if (!reqs) return;

    const requisitos = reqs.split(",");
    const cumplidos = requisitos.every(r => completadas.includes(r));

    materia.classList.toggle("bloqueada", !cumplidos);
  });
}

desbloquearMaterias();

/* ===== CLICK ===== */
materias.forEach(materia => {
  materia.addEventListener("click", () => {
    if (materia.classList.contains("bloqueada")) return;

    materia.classList.toggle("completada");

    const id = materia.dataset.id;
    let progreso = JSON.parse(localStorage.getItem("materiasCompletadas")) || [];

    if (materia.classList.contains("completada")) {
      if (!progreso.includes(id)) progreso.push(id);
    } else {
      progreso = progreso.filter(m => m !== id);
    }

    localStorage.setItem("materiasCompletadas", JSON.stringify(progreso));
    actualizarProgreso();
    desbloquearMaterias();
  });
});

