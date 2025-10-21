// La duración de la transición se ha actualizado a 600ms para que coincida con el CSS.
const transitionDuration = 600;

// Los datos de las preguntas y respuestas actualizados
const qaData = [
    {
        q: "¿Por qué se dice que esta gracia es resistible?",
        cite: "Cita: “Y no queréis venir a mí para que tengáis vida” (Juan 5:40)",
        a: "La gracia preveniente es resistible porque, aunque Dios toma la iniciativa y provee la capacidad para responder, no fuerza la voluntad humana. El amor verdadero, que busca una relación genuina, no se impone. La elección de aceptar o rechazar el llamado sigue siendo una decisión personal."
    },
    {
        q: "¿Cómo muestra Jesús que nadie puede venir a Él si el Padre no lo atrae?",
        cite: "Cita: “Ninguno puede venir a mí, si el Padre que me envió no le trajere” (Juan 6:44)",
        a: "Este versículo revela que la iniciativa de la salvación comienza ineludiblemente con Dios. La 'atracción del Padre' no debe entenderse como coerción, sino como una invitación profunda y un despertar espiritual, como una resonancia interior que disuelve la indiferencia y despierta el hambre por la verdad y la vida eterna."
    },
    {
        q: "¿De qué manera el Espíritu Santo convence al mundo de pecado?",
        cite: "Cita: “Y cuando él venga, convencerá al mundo de pecado, de justicia y de juicio” (Juan 16:8)",
        a: "El Espíritu no opera como un acusador para condenar, sino como un revelador para mostrar la verdad. Convence al mundo mostrando la realidad y la gravedad del corazón humano (pecado) frente a la santidad de Dios (justicia). Es como un espejo que, al ser colocado frente al alma, no juzga, pero sí muestra con claridad lo que está roto y lo que necesita restauración."
    },
    {
        q: "Si la gracia capacita al pecador, ¿por qué el hombre sigue siendo responsable si la rechaza?",
        cite: "Citas: “Porque de tal manera amó Dios al mundo…” (Juan 3:16) y “…los hombres amaron más las tinieblas que la luz…” (Juan 3:19)",
        a: "La gracia de Dios no elimina la responsabilidad; al contrario, la magnifica al ofrecer una salida. Dios provee la luz y la capacidad de verla, pero el hombre mantiene el poder moral de preferir la oscuridad. Esta es una paradoja central: el poder para elegir viene de Dios (la gracia), pero la elección final es un acto de la voluntad del hombre, que debe responder al amor ofrecido."
    },
    {
        q: "¿Qué sucede cuando el hombre resiste la gracia de Dios?",
        cite: "Cita implícita: “No queréis venir a mí…” (Juan 5:40)",
        a: "Resistir la gracia no es solo rechazar una oferta, es cerrar deliberadamente el corazón a la fuente de la vida. El resultado inmediato es el estancamiento espiritual y el endurecimiento progresivo del alma, lo cual es más peligroso que el pecado inicial. Aunque la gracia no desaparece, su efecto transformador se frustra en la vida del individuo, pues el eco del llamado divino se pierde en el ruido del orgullo o la indiferencia."
    },
    {
        q: "¿Qué implica la regeneración del hombre arrepentido?",
        cite: "Cita: “Si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron…” (2 Corintios 5:17)",
        a: "La regeneración es el renacer espiritual radical. Implica mucho más que el simple perdón de los pecados; es una transformación total del ser, una obra milagrosa donde el creyente no solo cambia de dirección, sino que cambia de naturaleza. Es la implantación de una nueva vida divina. Es el inicio de una nueva historia, donde la vieja vida queda atrás, y la nueva es escrita con la tinta indeleble de la Gracia de Dios."
    }
];

let citesVisible = false; // Nuevo estado para las citas
let answersVisible = false;
const questionsContainer = document.getElementById('questions-container');
const answerButton = document.getElementById('answer-button');
const citeButton = document.getElementById('cite-button'); // Nuevo botón de citas

// Función principal para mostrar una sola sección de contenido
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const targetSection = document.getElementById(sectionId);

    // **VERIFICACIÓN DE SECCIÓN ACTIVA CORREGIDA**
    const isActive = targetSection.style.display === 'block' && targetSection.style.opacity === '1';
    if (isActive) {
        // Si la sección ya está activa, no hacemos nada para evitar el movimiento del footer.
        return;
    }

    // 1. Ocultar (Fade out) la sección visible actual
    sections.forEach(section => {
        // Solo ocultamos si está visible (display: block)
        if (section.style.display === 'block') {
            // Inicia el fade-out
            section.style.opacity = '0';
            // Después de la transición, oculta completamente para liberar espacio
            setTimeout(() => {
                section.style.display = 'none';
            }, transitionDuration);
        }
    });

    // 2. Mostrar (Fade in) la sección objetivo
    if (targetSection) {
        // Muestra la sección inmediatamente (display: block), pero con opacidad 0
        targetSection.style.display = 'block';
        targetSection.style.opacity = '0';

        // Desplazamiento suave al inicio de la nueva sección (Aseguramos que el foco esté en el contenido)
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Pequeño retraso para asegurar que display:block tome efecto antes de la transición de opacidad
        setTimeout(() => {
            targetSection.style.opacity = '1';
        }, 50);
    }

    // Lógica para resaltar el botón activo
    document.querySelectorAll('.nav-item').forEach(navItem => {
        if (navItem.getAttribute('href') === '#' + sectionId) {
            navItem.classList.add('active-nav');
            navItem.classList.remove('text-light-text');
            navItem.classList.add('text-dark-bg');
        } else {
            navItem.classList.remove('active-nav');
            navItem.classList.add('text-light-text');
            navItem.classList.remove('text-dark-bg');
        }
    });

    // Ocultar citas y respuestas si se sale del cuestionario
    if (sectionId !== 'cuestionario') {
        if (answersVisible) {
            answersVisible = false;
            document.querySelectorAll('.answer-text').forEach(answer => answer.classList.add('hidden'));
            answerButton.textContent = 'Mostrar Respuestas';
        }
        if (citesVisible) {
            citesVisible = false;
            document.querySelectorAll('.cite-text').forEach(cite => cite.classList.add('hidden'));
            citeButton.textContent = 'Mostrar Citas';
        }
    }
}

// Función para renderizar las preguntas
function renderQuestions() {
    questionsContainer.innerHTML = '';
    qaData.forEach((item, index) => {
        const itemHtml = `
                    <div class="question-item p-4 bg-light-text/10 rounded-lg shadow-md transition duration-200">
                        <!-- PREGUNTA: Fuente Alegreya, tamaño grande, seminegrita para destacar -->
                        <p class="text-light-text text-xl font-semibold mb-1">
                            ${index + 1}. ${item.q}
                        </p>
                        <!-- CITA BÍBLICA: Estilo diferenciado, oculta por defecto -->
                        <p id="cite-${index}" class="cite-text text-primary-gold/70 text-sm italic mb-2 hidden transition duration-300">
                           ${item.cite}
                        </p>
                        <!-- RESPUESTA: Fondo de color suave, oculta por defecto -->
                        <div id="answer-${index}" class="answer-text mt-2 p-3 border-l-4 border-primary-gold bg-white/10 rounded-r-md hidden transition duration-500 ease-in-out">
                            <p class="text-lg text-light-text/90 italic">${item.a}</p>
                        </div>
                    </div>
                `;
        questionsContainer.innerHTML += itemHtml;
    });
}

// FUNCIÓN para mostrar/ocultar solo las citas
function toggleCites() {
    citesVisible = !citesVisible;
    const cites = document.querySelectorAll('.cite-text');

    cites.forEach(cite => {
        if (citesVisible) {
            cite.classList.remove('hidden');
        } else {
            cite.classList.add('hidden');
        }
    });

    // Actualizar el texto del botón
    citeButton.textContent = citesVisible ? 'Ocultar Citas' : 'Mostrar Citas';

    // Si el usuario oculta las citas, debe ocultar también las respuestas (opcional pero lógico)
    if (!citesVisible && answersVisible) {
        _toggleAnswersInternal(true); // Ocultar sin cambiar el estado principal de answersVisible si es llamado por toggleCites
    }
}

// Función para mostrar/ocultar las respuestas
function toggleAnswers() {
    if (!citesVisible) {
        // Si el usuario intenta mostrar respuestas sin citas, mostramos primero las citas
        toggleCites();
        // Retrasamos la muestra de respuestas para una transición suave
        setTimeout(() => _toggleAnswersInternal(), transitionDuration);
    } else {
        _toggleAnswersInternal();
    }
}

function _toggleAnswersInternal(forceHide = false) {
    answersVisible = forceHide ? false : !answersVisible;
    const answers = document.querySelectorAll('.answer-text');

    answers.forEach(answer => {
        if (answersVisible) {
            answer.classList.remove('hidden');
        } else {
            answer.classList.add('hidden');
        }
    });

    // Actualizar el texto del botón
    answerButton.textContent = answersVisible ? 'Ocultar Respuestas' : 'Mostrar Respuestas';
}


// Inicializar la aplicación (Lógica modificada para cargar el Tema de Reflexión inmediatamente)
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();

    // 1. Ocultar todas las secciones al inicio para asegurar un estado limpio
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
        section.style.opacity = '0';
    });

    // 2. Mostrar la sección de reflexión por defecto SIN FADE-IN (para evitar el parpadeo inicial)
    const defaultSection = document.getElementById('tema-reflexion');
    if (defaultSection) {
        defaultSection.style.display = 'block';
        defaultSection.style.opacity = '1';
    }

    // 3. Establecer el botón activo por defecto
    const defaultNav = document.querySelector('a[href="#tema-reflexion"]');
    if (defaultNav) {
        defaultNav.classList.add('active-nav');
        defaultNav.classList.remove('text-light-text');
        defaultNav.classList.add('text-dark-bg');
    }
});

