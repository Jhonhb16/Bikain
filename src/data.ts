import { Question, Testimonial, PurchaseNotification } from './types';

export const quizQuestions: Question[] = [
  {
    id: 1,
    qNumText: 'PREGUNTA 1 DE 7',
    qText: '¿Con qué frecuencia sientes la necesidad de responder rápido o complacer a tu pareja por miedo a que se "enfríe" la relación?',
    qSub: 'Esto puede manifestarse como ansiedad al esperar un mensaje, sobreanalizar retrasos de minutos o cambiar de planes por adaptarte a su tiempo.',
    options: [
      { emoji: '😰', text: 'Todos los días — es lo primero que siento al despertar y me da pánico que se aleje', score: 4 },
      { emoji: '😟', text: 'Varias veces por semana — me cuesta concentrarme si siento distancia', score: 3 },
      { emoji: '😐', text: 'De vez en cuando, pero intento respirar y controlarme', score: 2 },
      { emoji: '🙂', text: 'Rara vez o nunca — confío en mi espacio y en el de la otra persona', score: 1 },
    ]
  },
  {
    id: 2,
    qNumText: 'PREGUNTA 2 DE 7',
    qText: '¿Qué sueles hacer cuando algo en tu relación te molesta, te incomoda o te hiere?',
    qSub: 'Sé honesta — esta es una de las mayores señales de alarma sobre tus límites.',
    options: [
      { emoji: '🤫', text: 'Me lo callo por completo para no "ser dramática" o evitar que se enoje', score: 4 },
      { emoji: '🗯️', text: 'Acumulo malestar en silencio y luego exploto con intensidad y culpa', score: 3 },
      { emoji: '😐', text: 'Lo comento de pasada, pero minimizando mi dolor para no incomodar', score: 2 },
      { emoji: '😌', text: 'Expreso lo que siento con tranquilidad, claridad y firmeza desde el inicio', score: 1 },
    ]
  },
  {
    id: 3,
    qNumText: 'PREGUNTA 3 DE 7',
    qText: '¿Te has descubierto conformándote con "migajas" de atención (un "buenos días" a las 2 p.m., respuestas cortas) y llamándolas "señales"?',
    qSub: 'A veces justificamos la falta de interés o disponibilidad porque necesitamos que la relación funcione.',
    options: [
      { emoji: '💔', text: 'Sí, constantemente busco significados ocultos para mantener la esperanza', score: 4 },
      { emoji: '😞', text: 'A veces, aunque en el fondo sé que merezco mucho más que eso', score: 3 },
      { emoji: '🙄', text: 'Pocas veces, pero he llegado a dudar de lo que merezco exigir', score: 2 },
      { emoji: '😌', text: 'No, reconozco la falta de interés y sé cuándo retirarme sin rogar', score: 1 },
    ]
  },
  {
    id: 4,
    qNumText: 'PREGUNTA 4 DE 7',
    qText: 'Cuando una relación se enfría, se termina o se distancia, ¿cuál es tu primer pensamiento?',
    qSub: 'Esto define el centro de tu seguridad emocional.',
    options: [
      { emoji: '🪫', text: '¿Qué hice mal? ¿Por qué nunca soy suficiente? ¿Cómo puedo recuperarlo?', score: 4 },
      { emoji: '📉', text: 'Siento un vacío intolerable y miedo a quedarme sola para siempre', score: 3 },
      { emoji: '😑', text: 'Me culpo por confiar y abrirme de nuevo, y decido cerrarme', score: 2 },
      { emoji: '⚡', text: 'Duelo por la pérdida, pero entiendo que no cumplía mis estándares de vida', score: 1 },
    ]
  },
  {
    id: 5,
    qNumText: 'PREGUNTA 5 DE 7',
    qText: '¿Cómo describirías tu nivel de tranquilidad mental cuando estás conociendo a alguien que te gusta mucho?',
    qSub: 'El apego seguro o inseguro se activa especialmente en las primeras etapas de citas.',
    options: [
      { emoji: '🌀', text: 'Acelerada, obsesiva, imposible de apagar — reviso su última conexión todo el día', score: 4 },
      { emoji: '💭', text: 'Con muchas dudas e inseguridades, me cuesta ser yo misma por miedo al rechazo', score: 3 },
      { emoji: '😶', text: 'Intento ocultar mi interés, hacerme la difícil o cerrarme para protegerme', score: 2 },
      { emoji: '😌', text: 'Tranquila, disfruto de mi vida y dejo que la conexión se revele con hechos', score: 1 },
    ]
  },
  {
    id: 6,
    qNumText: 'PREGUNTA 6 DE 7',
    qText: '¿Qué has intentado hasta ahora para sanar estos patrones en tus relaciones?',
    qSub: 'Queremos entender tu historial para recomendarte el plan más efectivo.',
    options: [
      { emoji: '😫', text: 'He leído libros, visto mil videos y sigo repitiendo exactamente la misma historia', score: 4 },
      { emoji: '😞', text: 'He decidido aislarme y estar sola/o, pero al volver a salir tropiezo igual', score: 3 },
      { emoji: '🤔', text: 'He intentado hacer cambios de forma intuitiva, pero sin un plan diario sólido', score: 2 },
      { emoji: '🌱', text: 'Es reciente, estoy empezando a reconocer mis patrones y busco ayuda real', score: 1 },
    ]
  },
  {
    id: 7,
    qNumText: 'PREGUNTA 7 DE 7',
    qText: 'Si pudieras cambiar una sola cosa de tu forma de relacionarte hoy mismo, ¿cuál elegirías?',
    qSub: 'Esta respuesta personaliza tu diagnóstico final.',
    options: [
      { emoji: '🧘', text: 'Sentir paz y seguridad — amar sin esa tensión y ansiedad constante', score: 4 },
      { emoji: '🧠', text: 'Dejar de sobreanalizar cada detalle, palabra o silencio del otro', score: 3 },
      { emoji: '⚡', text: 'Aprender a poner límites firmes sin sentir culpa o miedo al abandono', score: 2 },
      { emoji: '💪', text: 'Elegir a mi pareja desde el amor propio, no desde la necesidad de ser salvada', score: 1 },
    ]
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sofía C.',
    location: 'Bogotá, Colombia',
    stars: 5,
    text: 'Llevaba 2 años atrayendo el mismo tipo de parejas no disponibles. Contestaba rápido para que no se enfriaran, callaba lo que me molestaba por no "ser dramática", y cuando se iban me preguntaba qué había hecho mal. Con Bikain identifiqué mi patrón de apego ansioso y complaciente. En 4 semanas aprendí a poner límites sin culpa. Es increíble lo que cambia cuando dejas de rogar por migajas.',
    result: 'Resultado: cero tolerancia a migajas de atención y límites firmes',
    avatar: 'SC',
    date: 'hace 3 semanas'
  },
  {
    name: 'Valentina M.',
    location: 'Ciudad de México, México',
    stars: 5,
    text: 'Me costaba la vida entera no sobreanalizar cada mensaje. Pasaba el día entero mirando la última conexión. Con el journaling diario de 10 minutos de Bikain, por fin recuperé mi centro. Las lecciones de la psicóloga Vanessa son directas al grano, sin rodeos. Empecé a dormir en paz, a priorizar mi vida y, curiosamente, ahora atraigo personas que sí me respetan.',
    result: 'Resultado: paz mental y liberación del sobreanálisis diario',
    avatar: 'VM',
    date: 'hace 1 mes'
  },
  {
    name: 'Karla R.',
    location: 'Buenos Aires, Argentina',
    stars: 5,
    text: 'Probé de todo — videos motivacionales de redes, libros de autoayuda, consejos de mis amigas. Nada se sostenía. Cuando entendí que mi problema no era "falta de amor propio" sino un patrón de apego aprendido, todo cobró sentido. El diagnóstico inicial fue un espejo doloroso pero necesario. El programa es tan sencillo de seguir desde el celular que se vuelve un hábito automático.',
    result: 'Resultado: superación del patrón de persecución afectiva',
    avatar: 'KR',
    date: 'hace 6 semanas'
  },
  {
    name: 'Lucía G.',
    location: 'Santiago, Chile',
    stars: 5,
    text: 'Al principio era escéptica. $9 USD me parecía sospechosamente barato para algo tan completo y revisado por una psicóloga. Pero decidí intentarlo por la garantía sin riesgo, y fue la mejor inversión en mí misma de los últimos años. Las lecciones diarias son cortitas pero te desarman. Compré el acceso también para mi hermana porque todas caemos en el mismo autosaboteo.',
    result: 'Resultado: claridad emocional y aumento real de estándares',
    avatar: 'LG',
    date: 'hace 2 semanas'
  },
  {
    name: 'Diana S.',
    location: 'Lima, Perú',
    stars: 5,
    text: 'Suelo cerrarme y actuar de forma evitativa cuando me gusta alguien, pero luego me da pánico que se cansen y me dejen. Estaba atrapada en ese vaivén. El programa de apego y patrones en el amor me enseñó que sentir no es debilidad y que comunicar mis miedos me hace libre. La app es súper intuitiva, con sus checkboxes diarios te mantiene motivada a no fallarte.',
    result: 'Resultado: comunicación asertiva y apego más seguro',
    avatar: 'DS',
    date: 'hace 5 semanas'
  }
];

export const purchaseNotifications: PurchaseNotification[] = [
  { initials: 'MR', name: 'María R.', location: 'Colombia', action: 'acaba de acceder al programa', time: 'hace 1 min' },
  { initials: 'LC', name: 'Laura C.', location: 'México', action: 'completó el Programa A ✓', time: 'hace 3 min' },
  { initials: 'AP', name: 'Ana P.', location: 'Argentina', action: 'dejó una reseña de 5 estrellas ⭐', time: 'hace 6 min' },
  { initials: 'KM', name: 'Karen M.', location: 'Perú', action: 'acaba de acceder al programa', time: 'hace 9 min' },
  { initials: 'VR', name: 'Valeria R.', location: 'España', action: 'completó el diagnóstico', time: 'hace 12 min' },
  { initials: 'CR', name: 'Carolina R.', location: 'Venezuela', action: 'acaba de acceder al programa', time: 'hace 15 min' },
  { initials: 'PM', name: 'Patricia M.', location: 'Ecuador', action: 'completó el Programa B ✓', time: 'hace 18 min' },
  { initials: 'AR', name: 'Andrea R.', location: 'Bolivia', action: 'acaba de acceder al programa', time: 'hace 21 min' },
  { initials: 'NV', name: 'Natalia V.', location: 'Uruguay', action: 'dejó una reseña de 5 estrellas ⭐', time: 'hace 24 min' },
  { initials: 'GL', name: 'Gloria L.', location: 'Guatemala', action: 'completó el Programa C ✓', time: 'hace 27 min' },
];

export const programs = [
  {
    code: 'Programa A',
    title: 'Fundamentos de Autoestima',
    sub: 'Foco: Detener el autocastigo y sanar el autoconcepto',
    desc: '28 días para dejar de castigarte, sanar el diálogo interno y reconocer tu valor real ante ti misma antes de buscarlo afuera.',
    tags: ['Sanar Diálogo', 'Autocompasión', 'Autoestima Real', 'Journaling Diario'],
    weeksText: 'Semana 1 a 4'
  },
  {
    code: 'Programa B',
    title: 'Apego y Patrones en el Amor',
    sub: 'Foco: Desactivar los gatillos de la ansiedad y evitación',
    desc: 'Entiende de dónde viene tu estilo de apego (ansioso, evitativo o desorganizado) y obtén herramientas prácticas para desactivar los miedos.',
    tags: ['Estilos de Apego', 'Gatillos Emocionales', 'Reprogramación', 'Paz Mental'],
    weeksText: 'Semana 5 a 8'
  },
  {
    code: 'Programa C',
    title: 'Límites y Autorespeto',
    sub: 'Foco: Aprender a decir que no y sostener tu espacio',
    desc: 'Aprende a decir que no sin sentir culpa. Incluye guiones de comunicación reales para tus citas, pareja, familia y trabajo.',
    tags: ['Límites sin Culpa', 'Guiones Reales', 'Firmeza Asertiva', 'Autorespeto'],
    weeksText: 'Semana 9 a 12'
  },
  {
    code: 'Programa D',
    title: 'Estándares de Pareja',
    sub: 'Foco: Elegir desde la seguridad y merecimiento',
    desc: 'Define lo no negociable en una relación. Aprende a filtrar candidatos desde la primera cita sin miedo a quedarte sola.',
    tags: ['No Negociables', 'Filtros Asertivos', 'Elegir con Seguridad', 'Pareja Ideal'],
    weeksText: 'Semana 13 a 16'
  },
];

export const faqs = [
  {
    q: '¿Esto es terapia psicológica?',
    a: 'No. Bikain es un programa estructurado de crecimiento y acompañamiento personal diario, con contenido diseñado y supervisado por la psicóloga profesional Vanessa Valencia. No sustituye la psicoterapia clínica. Si necesitas atención clínica individual, dentro de la app tienes la puerta abierta para agendar sesiones privadas en vivo con Vanessa.'
  },
  {
    q: '¿Cómo funciona la suscripción manual?',
    a: 'Bikain tiene CERO cargos sorpresa. Creemos en la honestidad: pagas $9 USD hoy por tu primer mes y, al cabo de los 30 días, tú decides si renuevas de manera manual para seguir o no. No hay cobros automáticos, ni renovaciones ocultas en tu tarjeta.'
  },
  {
    q: '¿Qué pasa con lo que escribo en mi diario (journaling)?',
    a: 'Es 100% privado. El diario interactivo se guarda cifrado en tu cuenta personal, asegurando que nadie más que tú pueda leer tus reflexiones más íntimas.'
  },
  {
    q: '¿Necesito saber "qué me pasa" antes de empezar?',
    a: 'Para nada. El diagnóstico de 2 minutos identifica tu estilo dominante de autosaboteo amoroso por ti. Empezamos la ruta exactamente desde el punto en el que te encuentras hoy.'
  },
  {
    q: '¿En cuánto tiempo veré los primeros cambios?',
    a: 'La mayoría de nuestras usuarias reporta un cambio notable en sus niveles de ansiedad y claridad mental tras los primeros 3 a 5 días de journaling guiado. Al cabo de las 4 semanas del Programa A, habrás consolidado límites que antes te parecían imposibles de poner.'
  },
  {
    q: '¿Es seguro el pago y qué métodos de pago aceptan?',
    a: 'El pago es 100% seguro y procesado por plataformas certificadas. Dependiendo de tu país, podrás pagar con Tarjeta de Crédito/Débito, PayPal, Mercado Pago, PSE, Nequi, Efecty u OXXO.'
  }
];
