const preguntasBI = [
  { pregunta: '¿Qué es la Inteligencia de Negocios según el artículo?', opciones: ['Un software de contabilidad', 'Un conjunto de estrategias, procedimientos y herramientas centradas en la gobernanza y creación de conocimiento mediante análisis de datos', 'Un tipo de red social empresarial', 'Un lenguaje de programación'], correcta: 1, explicacion: 'La BI transforma datos en información y luego en conocimiento.' },
  { pregunta: '¿Cuál es el orden correcto del flujo de valor en Inteligencia de Negocios?', opciones: ['Conocimiento → Información → Datos', 'Información → Datos → Conocimiento', 'Datos → Información → Conocimiento', 'Datos → Conocimiento → Información'], correcta: 2 },
  { pregunta: '¿Cuántos componentes principales tiene la Inteligencia de Negocios según el artículo?', opciones: ['3', '4', '5', '7'], correcta: 2, explicacion: 'Fuentes, ETL, Datawarehouse, Herramientas y Visualización.' },
  { pregunta: '¿Qué significa la sigla ETL?', opciones: ['Extraer, Transformar, Cargar', 'Evaluar, Testear, Lanzar', 'Enviar, Transferir, Listar', 'Ejecutar, Tabular, Localizar'], correcta: 0 },
  { pregunta: '¿Qué es un Data Mart?', opciones: ['Un tipo de servidor en la nube', 'Datos almacenados de un área específica de la empresa', 'Una red social de datos', 'Un lenguaje de consulta'], correcta: 1 },
  { pregunta: '¿Cuál de las siguientes NO es una perspectiva del Cuadro de Mando Integral?', opciones: ['Perspectiva Financiera', 'Perspectiva del Cliente', 'Perspectiva de Marketing Digital', 'Perspectiva de Aprendizaje'], correcta: 2, explicacion: 'Las perspectivas son Financiera, Cliente, Interna y Aprendizaje.' },
  { pregunta: '¿Qué herramienta permite trabajar GRATUITAMENTE con hasta 15.000 registros?', opciones: ['Qlik Sense', 'Power BI', 'Excel', 'Tableau'], correcta: 2 },
  { pregunta: '¿Cuál es una limitación de Power BI mencionada en el artículo?', opciones: ['Solo admite 100 registros', 'No permite compartir sin adquirir una licencia', 'Solo funciona en Linux', 'No permite crear gráficos'], correcta: 1 },
  { pregunta: '¿Cuál de estas NO es una característica de un Datawarehouse?', opciones: ['Temático', 'Histórico', 'Volátil', 'Integrado'], correcta: 2, explicacion: 'Los datos en un datawarehouse son NO volátiles.' },
  { pregunta: '¿Cuál es el beneficio principal de implementar BI en una microempresa?', opciones: ['Aumentar el número de empleados', 'Generar valor y ventaja competitiva mediante el análisis de datos', 'Reducir el precio de los productos automáticamente', 'Eliminar la necesidad de contabilidad'], correcta: 1 }
];

let indicePregunta = 0;
let puntuacion = 0;
let respondida = false;
const maximoGuardado = () => Number(localStorage.getItem('biPuntajeMaximo') || 0);

function mostrarPregunta() {
  const actual = preguntasBI[indicePregunta];
  document.querySelector('#question-counter').textContent = `Pregunta ${indicePregunta + 1} de ${preguntasBI.length}`;
  document.querySelector('#score-label').textContent = `${puntuacion} puntos`;
  const progreso = ((indicePregunta + 1) / preguntasBI.length) * 100;
  const barra = document.querySelector('#progress-bar');
  barra.style.width = `${progreso}%`;
  barra.parentElement.setAttribute('aria-valuenow', progreso);
  document.querySelector('#question-stage').innerHTML = `<h3>${indicePregunta + 1}. ${actual.pregunta}</h3><div>${actual.opciones.map((opcion, i) => `<label class="option-label" for="opcion-${i}"><input type="radio" name="respuesta" id="opcion-${i}" value="${i}"><span>${String.fromCharCode(97 + i)}) ${opcion}</span></label>`).join('')}</div>`;
  document.querySelector('#feedback').className = 'feedback';
  document.querySelector('#feedback').textContent = '';
  document.querySelector('#check-button').classList.remove('d-none');
  document.querySelector('#next-button').classList.add('d-none');
  respondida = false;
  document.querySelectorAll('input[name="respuesta"]').forEach((input) => input.addEventListener('change', () => { document.querySelectorAll('.option-label').forEach((label) => label.classList.remove('selected')); input.closest('.option-label').classList.add('selected'); }));
}

function comprobarRespuesta() {
  if (respondida) return;
  const seleccion = document.querySelector('input[name="respuesta"]:checked');
  if (!seleccion) { const feedback = document.querySelector('#feedback'); feedback.className = 'feedback error'; feedback.textContent = 'Selecciona una opción para continuar.'; return; }
  respondida = true;
  const actual = preguntasBI[indicePregunta];
  const esCorrecta = Number(seleccion.value) === actual.correcta;
  if (esCorrecta) puntuacion += 10;
  document.querySelectorAll('input[name="respuesta"]').forEach((input, i) => { input.disabled = true; if (i === actual.correcta) input.closest('.option-label').classList.add('correct'); if (i === Number(seleccion.value) && !esCorrecta) input.closest('.option-label').classList.add('incorrect'); });
  const feedback = document.querySelector('#feedback');
  feedback.className = `feedback ${esCorrecta ? 'success' : 'error'}`;
  feedback.innerHTML = esCorrecta ? `<strong>¡Correcto!</strong> +10 puntos. ${actual.explicacion || ''}` : `<strong>Respuesta incorrecta.</strong> La respuesta correcta es: <strong>${actual.opciones[actual.correcta]}</strong>. ${actual.explicacion || ''}`;
  document.querySelector('#score-label').textContent = `${puntuacion} puntos`;
  document.querySelector('#check-button').classList.add('d-none');
  document.querySelector('#next-button').classList.remove('d-none');
}

function finalizarQuiz() {
  const anterior = maximoGuardado();
  if (puntuacion > anterior) localStorage.setItem('biPuntajeMaximo', puntuacion);
  const insignia = puntuacion >= 90 ? ['🏆', 'Experto en BI'] : puntuacion >= 70 ? ['🥈', 'Analista Avanzado'] : puntuacion >= 50 ? ['🥉', 'Aprendiz de Datos'] : ['📚', 'Necesitas repasar'];
  document.querySelector('#quiz-app').classList.add('d-none');
  const resultado = document.querySelector('#quiz-result');
  resultado.classList.remove('d-none');
  resultado.innerHTML = `<div class="result-icon">${insignia[0]}</div><h3>${insignia[1]}</h3><p>Obtuviste <strong>${puntuacion} de 100 puntos</strong>.</p><p class="best-score">Puntaje máximo guardado: ${Math.max(puntuacion, anterior)} puntos</p><button id="retry-button" class="btn btn-primary mt-3" type="button">Reintentar Quiz <i class="fa-solid fa-rotate-right ms-2" aria-hidden="true"></i></button>`;
  document.querySelector('#retry-button').addEventListener('click', reiniciarQuiz);
}

function siguientePregunta() { if (indicePregunta < preguntasBI.length - 1) { indicePregunta += 1; mostrarPregunta(); } else finalizarQuiz(); }
function reiniciarQuiz() { indicePregunta = 0; puntuacion = 0; document.querySelector('#quiz-app').classList.remove('d-none'); document.querySelector('#quiz-result').classList.add('d-none'); mostrarPregunta(); }

document.addEventListener('DOMContentLoaded', () => { mostrarPregunta(); document.querySelector('#check-button').addEventListener('click', comprobarRespuesta); document.querySelector('#next-button').addEventListener('click', siguientePregunta); });