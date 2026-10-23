// Datos del artículo usados por las secciones dinámicas de la página.
const contenidoBI = {
  componentes: [
    { icon: 'fa-globe', title: 'Fuentes de información', text: 'Reúnen fuentes externas e internas para alimentar el proceso de análisis.' },
    { icon: 'fa-gears', title: 'ETL', text: 'Extraer, Transformar y Cargar los datos para que puedan ser utilizados.' },
    { icon: 'fa-database', title: 'Datawarehouse', text: 'Almacén de datos compuesto por datamarts, preparado para el análisis.' },
    { icon: 'fa-laptop-code', title: 'Herramientas y software', text: 'Soluciones dirigidas a los usuarios finales para consultar y trabajar con datos.' },
    { icon: 'fa-chart-pie', title: 'Visualización', text: 'Cubos de datos, dashboards y reportes que hacen comprensible la información.' }
  ],
  conceptos: [
    { icon: 'fa-compass', title: 'Cuadro de Mando Integral', text: 'Organiza la estrategia en cuatro perspectivas: Financiera, del Cliente, Interna y de Aprendizaje.', tags: ['Visión Estratégica', 'Financiera', 'Cliente', 'Interna', 'Aprendizaje'] },
    { icon: 'fa-layer-group', title: 'Data Mart', text: 'Almacén de datos de un área específica y con propósito específico, de actualización constante. Sus beneficios son menor costo, respuestas rápidas e implementación rápida y sencilla.', tags: ['Dependiente', 'Independiente', 'Híbrido'] },
    { icon: 'fa-gauge-high', title: 'KPI', text: 'Indicadores Clave de Rendimiento que permiten medir el desempeño y orientar la gestión.' },
    { icon: 'fa-users', title: 'CRM', text: 'Gestión de Relaciones con el Cliente para conocer y fortalecer la relación con ellos.' },
    { icon: 'fa-sitemap', title: 'ERP', text: 'Sistema de Planificación de Recursos Empresariales que integra procesos y recursos.' },
    { icon: 'fa-boxes-stacked', title: 'Datawarehouse', text: 'Es temático, histórico, integrado y no volátil; además utiliza metadatos.' , tags: ['Temático', 'Histórico', 'Integrado', 'No volátil', 'Metadatos'] }
  ],
  herramientas: [
    { name: 'Excel', criterio: 'Hoja de cálculo', descripcion: 'Herramienta accesible para organizar y analizar datos.', trabajo: 'Gratis hasta 15.000 registros.', limitacion: 'Puede quedarse corto al crecer el volumen y la complejidad.' },
    { name: 'Power BI', criterio: 'Analítica y visualización', descripcion: 'Permite construir visualizaciones, dashboards y reportes.', trabajo: 'Gratis; requiere licencia para compartir.', limitacion: 'No permite compartir sin adquirir una licencia.' },
    { name: 'Qlik Sense', criterio: 'Analítica asociativa', descripcion: 'Herramienta para explorar y visualizar información de forma interactiva.', trabajo: 'Requiere suscripción de paga.', limitacion: 'El acceso depende de una suscripción de paga.' }
  ],
  ventaja: ['Única', 'Beneficio tangible', 'Sostenible a largo plazo', 'Busca innovación']
};

function renderContenido() {
  const componentes = document.querySelector('#componentes-grid');
  const conceptos = document.querySelector('#conceptos-grid');
  const herramientas = document.querySelector('#herramientas-body');
  const ventaja = document.querySelector('#ventaja-list');
  componentes.innerHTML = contenidoBI.componentes.map((item) => `<div class="col-md-6 col-lg"><article class="info-card"><div class="card-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></div><h3>${item.title}</h3><p>${item.text}</p></article></div>`).join('');
  conceptos.innerHTML = contenidoBI.conceptos.map((item) => `<div class="col-md-6 col-lg-4"><article class="info-card"><div class="card-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></div><h3>${item.title}</h3><p>${item.text}</p>${item.tags ? `<div class="tag-list">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}</article></div>`).join('');
  herramientas.innerHTML = contenidoBI.herramientas.map((item) => `<tr><td>${item.name}</td><td>${item.criterio}</td><td>${item.descripcion}</td><td>${item.trabajo}</td><td>${item.limitacion}</td></tr>`).join('');
  ventaja.innerHTML = contenidoBI.ventaja.map((item) => `<span class="advantage-item"><i class="fa-solid fa-check" aria-hidden="true"></i>${item}</span>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderContenido();
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));
});