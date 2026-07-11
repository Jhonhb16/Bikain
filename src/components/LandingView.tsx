import { useState, useEffect } from 'react';
import { testimonials, purchaseNotifications, programs, faqs } from '../data';
import { PurchaseNotification } from '../types';

interface AvatarProps {
  initials: string;
  className?: string;
  imageUrl?: string;
  bgClass?: string;
}

function Avatar({ initials, className = "w-8 h-8", imageUrl, bgClass = "bg-wine" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const finalSrc = imageUrl || `/avatar_${initials.toLowerCase()}.jpg`;

  return (
    <div className={`rounded-full flex items-center justify-center font-bold text-white overflow-hidden relative select-none flex-shrink-0 ${bgClass} ${className}`}>
      {!hasError && (
        <img
          src={finalSrc}
          alt={initials}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {(!loaded || hasError) && (
        <span className="font-serif uppercase tracking-wider">{initials}</span>
      )}
    </div>
  );
}

interface SmartImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

function SmartImage({ src, fallbackSrc, alt, className }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

interface LandingViewProps {
  onBackToQuiz: () => void;
}

export default function LandingView({ onBackToQuiz }: LandingViewProps) {
  const [liveViews, setLiveViews] = useState(247);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default
  const [liveNotif, setLiveNotif] = useState<PurchaseNotification>(purchaseNotifications[0]);
  const [notifIdx, setNotifIdx] = useState(1);
  const [socialNotifs, setSocialNotifs] = useState<PurchaseNotification[]>([
    purchaseNotifications[0],
    purchaseNotifications[1],
    purchaseNotifications[2],
  ]);

  // Rotate live notification bar at the top
  useEffect(() => {
    const interval = setInterval(() => {
      const nextNotif = purchaseNotifications[notifIdx % purchaseNotifications.length];
      setNotifIdx((prev) => prev + 1);
      setLiveNotif(nextNotif);
    }, 15000);
    return () => clearInterval(interval);
  }, [notifIdx]);

  // Rotate social proof list notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const nextNotif = purchaseNotifications[(notifIdx + 2) % purchaseNotifications.length];
      setSocialNotifs((prev) => {
        const updated = [nextNotif, ...prev];
        if (updated.length > 3) updated.pop();
        return updated;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [notifIdx]);

  // Rotate live views counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViews((prev) => prev + Math.floor(Math.random() * 3));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleFaqToggle = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div id="landing-view" className="w-full max-w-[430px] mx-auto min-h-screen bg-white text-ink flex flex-col shadow-xl border-x border-rose-mist/30 pb-24">
      {/* TOP LIVE BAR */}
      <div className="bg-ink text-rose-mist/90 text-xs py-2.5 px-4 flex items-center justify-center gap-2 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <div className="leading-snug">
          <strong>{liveViews}</strong> personas están leyendo esto ahora · Precio de lanzamiento
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white px-5 py-4 border-b border-rose-mist/50 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-wine text-white flex items-center justify-center text-base shadow-md shadow-wine/20">
            💖
          </div>
          <span className="font-serif text-base font-bold tracking-tight text-ink">Bikain<span className="text-wine">.</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink/70 font-semibold">
          <span className="text-gold text-sm">⭐⭐⭐⭐⭐</span>
          <span>4.9 (1.8k)</span>
        </div>
      </header>

      {/* FLOATING RETAKE DIAGNOSTIC HEADER BADGE */}
      <div className="bg-rose-mist/30 px-5 py-3 flex justify-between items-center border-b border-rose-mist/30 text-sm font-bold text-wine">
        <span>¿Deseas conocer tu patrón primero?</span>
        <button 
          onClick={onBackToQuiz}
          className="bg-wine text-white text-xs font-bold py-1.5 px-3.5 rounded-full cursor-pointer hover:bg-wine-light transition-all active:scale-95"
        >
          ← Realizar Test Gratis
        </button>
      </div>

      {/* ROTATING LIVE TOAST BAR */}
      <div className="bg-[#f0fdff] border-b border-[#a5f3fc] py-3 px-5 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
        <div className="text-sm text-[#0e7490] flex-1">
          <strong className="font-bold">{liveNotif.name} de {liveNotif.location}</strong> {liveNotif.action}
        </div>
        <div className="text-[11px] text-[#0e7490]/75 font-semibold flex-shrink-0">{liveNotif.time}</div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <SmartImage 
          src="/hero.jpg"
          fallbackSrc="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" 
          alt="Bikain Serenity" 
          className="w-full h-[250px] object-cover" 
        />
        <div className="bg-gradient-to-br from-[#fff0f6]/95 to-[#fad1e4]/95 text-ink px-5 py-8 border-b border-rose-mist/30">
          <span className="inline-block bg-wine/10 text-wine text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full border border-wine/20 mb-4 uppercase">
            CRECIMIENTO PERSONAL DIARIO
          </span>
          <h1 className="font-serif text-[26px] font-bold leading-tight mb-3.5 text-ink">
            Para reconocer a tu <span className="text-wine italic">pareja ideal</span> y que no se te vaya.
          </h1>
          <p className="text-sm text-ink/90 leading-relaxed mb-5">
            No necesitas otro consejo de amiga ni otro video motivacional de redes que olvidas al día siguiente. Necesitas ver tu patrón de frente, con nombre y apellido, y dejar de repetirlo.
          </p>

          <div className="flex items-center gap-3 bg-white border border-rose-mist rounded-xl p-3.5 mb-5 shadow-sm">
            <div className="flex -space-x-2 flex-shrink-0">
              <Avatar initials="SC" className="w-7.5 h-7.5 border-2 border-white text-[10px]" bgClass="bg-wine" />
              <Avatar initials="VM" className="w-7.5 h-7.5 border-2 border-white text-[10px]" bgClass="bg-wine-light" />
              <Avatar initials="KR" className="w-7.5 h-7.5 border-2 border-white text-[10px]" bgClass="bg-gold" />
              <Avatar initials="LG" className="w-7.5 h-7.5 border-2 border-white text-[10px]" bgClass="bg-[#164e63]" />
            </div>
            <div className="text-xs text-ink/90 leading-snug">
              <strong>+4,291 mujeres</strong> ya tienen acceso al programa y cambiaron sus relaciones
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-6.5">
            <span className="bg-white text-xs px-3.5 py-1.5 rounded-full border border-rose-mist/75 text-ink/90 shadow-sm font-semibold">✓ 100% natural</span>
            <span className="bg-white text-xs px-3.5 py-1.5 rounded-full border border-rose-mist/75 text-ink/90 shadow-sm font-semibold">✓ Desde el día 1</span>
            <span className="bg-white text-xs px-3.5 py-1.5 rounded-full border border-rose-mist/75 text-ink/90 shadow-sm font-semibold">✓ En tu celular</span>
            <span className="bg-white text-xs px-3.5 py-1.5 rounded-full border border-rose-mist/75 text-ink/90 shadow-sm font-semibold">✓ Plan estructurado</span>
          </div>

          <a 
            href="https://bikain.iagentflow.pro/checkout" 
            target="_blank"
            referrerPolicy="no-referrer"
            className="block w-full bg-wine hover:bg-wine-light text-white text-center font-bold py-4.5 px-6 rounded-2xl text-base transition-all duration-200 active:scale-95 shadow-lg shadow-wine/20"
          >
            Acceder al Programa — $9 USD →
          </a>
          <p className="text-center text-xs text-ink/60 mt-3.5 font-semibold">
            Acceso inmediato · Pago único de 30 días · Sin cobros sorpresa
          </p>
        </div>
      </section>

      {/* PAIN POINTS CHECKLIST */}
      <section className="px-5 py-9 bg-white border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono">¿TE IDENTIFICAS?</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-5 leading-tight">El ciclo de autosaboteo amoroso</h2>
        
        <div className="flex gap-4 items-center mb-6 border border-rose-mist/30 rounded-2xl p-4 bg-paper/30">
          <SmartImage 
            src="/stress.jpg"
            fallbackSrc="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=150&q=80" 
            alt="Relationship stress" 
            className="w-20 h-24 rounded-xl object-cover flex-shrink-0" 
          />
          <div>
            <div className="text-xs font-bold text-wine uppercase font-mono">ANTES DE BIKAIN</div>
            <p className="text-sm text-ink/80 leading-relaxed mt-1">
              Callas para no incomodar, contestas en segundos para que no te olviden, y terminas con dolor preguntándote qué hiciste mal en lugar de qué te faltó exigir.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6.5">
          <div className="flex items-center gap-3.5 bg-paper p-3.5 rounded-xl border border-rose-mist/30">
            <span className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-base flex-shrink-0">😰</span>
            <p className="text-sm text-ink/85 leading-relaxed">Te despiertas con angustia y revisas el teléfono buscando un mensaje que valide tu día</p>
          </div>
          <div className="flex items-center gap-3.5 bg-paper p-3.5 rounded-xl border border-rose-mist/30">
            <span className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-base flex-shrink-0">🤫</span>
            <p className="text-sm text-ink/85 leading-relaxed">Te callas lo que te molesta para no "ser dramática" o causar que decidan alejarse</p>
          </div>
          <div className="flex items-center gap-3.5 bg-paper p-3.5 rounded-xl border border-rose-mist/30">
            <span className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-base flex-shrink-0">🥖</span>
            <p className="text-sm text-ink/85 leading-relaxed">Te conformas con "buenos días" a las 2 p.m. y migajas de atención y las llamas "señales"</p>
          </div>
          <div className="flex items-center gap-3.5 bg-paper p-3.5 rounded-xl border border-rose-mist/30">
            <span className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-base flex-shrink-0">💔</span>
            <p className="text-sm text-ink/85 leading-relaxed">Los ciclos dolorosos de ida y vuelta se repiten con diferentes personas, pero el mismo final</p>
          </div>
        </div>

        <div className="bg-[#f0fdff] rounded-2xl p-5 border border-[#a5f3fc]">
          <div className="text-xs font-bold text-[#0e7490] tracking-wider mb-1.5 uppercase font-mono">LA VERDAD REVELADA</div>
          <h4 className="text-sm font-bold text-ink mb-1.5">No es falta de amor propio. Y no es tu culpa.</h4>
          <p className="text-sm text-ink/75 leading-relaxed">
            Es un patrón de apego inconsciente que se activa de forma biológica y psicológica. Se reescribe practicando respuestas distintas de forma estructurada, no solo leyendo frases bonitas de Instagram.
          </p>
        </div>
      </section>

      {/* THE ACTUAL CAUSE */}
      <section className="px-5 py-9 bg-white border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono font-semibold">LA CAUSA REAL</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-4 leading-tight">El problema no está en tus sentimientos</h2>
        
        <div className="grid grid-cols-2 gap-4 my-5">
          <div className="bg-paper p-4.5 rounded-xl border border-rose-mist/40 text-center">
            <div className="text-4xl font-extrabold text-wine">90%</div>
            <div className="text-xs text-ink/70 font-semibold mt-1.5 leading-snug">de tus reacciones amorosas dependen de tu apego infantil</div>
          </div>
          <div className="bg-paper p-4.5 rounded-xl border border-rose-mist/40 text-center">
            <div className="text-4xl font-extrabold text-wine">3 de 4</div>
            <div className="text-xs text-ink/70 font-semibold mt-1.5 leading-snug">mujeres con ansiedad amorosa repiten patrones inconscientes</div>
          </div>
        </div>

        <p className="text-sm text-ink/80 leading-relaxed mb-6">
          Cuando tu sistema de apego se desregula, tu mente entra en pánico biológico ante el más mínimo silencio. Sobreanalizas porque necesitas calmar esa amenaza. No es un capricho dramático: es tu cerebro sintiéndose desamparado.<br /><br />
          <strong>Esto es biológico y psicológico.</strong> Y requiere ejercicios diarios cortos dirigidos a reentrenar tu sistema nervioso y tu seguridad personal.
        </p>

        <div className="relative rounded-2xl overflow-hidden border border-rose-mist/30 shadow-sm mb-2">
          <SmartImage 
            src="/boundaries.jpg"
            fallbackSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" 
            alt="Límites sanos" 
            className="w-full h-[180px] object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-4.5 flex flex-col justify-end text-white">
            <div className="text-xs font-bold text-wine-light tracking-wide uppercase font-mono">CON BIKAIN APRENDES</div>
            <h4 className="text-base font-bold text-white mt-0.5">La asertividad radical y el autorespeto firme</h4>
          </div>
        </div>
      </section>

      {/* THE METHOD: 4 PROGRAMS */}
      <section className="bg-paper px-5 py-9 border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono">EL PLAN DIARIO</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-3 leading-tight">La ruta interactiva de Bikain</h2>
        <p className="text-sm text-ink/70 leading-relaxed mb-6">
          Sigue cada lección y ejercicio diario de 10 minutos desde tu celular con checkboxes, progreso por semana y racha guardada.
        </p>

        <div className="flex flex-col gap-4">
          {programs.map((p, idx) => (
            <div key={idx} className="bg-white border border-rose-mist/40 rounded-2xl p-4.5 shadow-sm">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-rose-mist text-wine font-serif font-extrabold flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{p.code}: {p.title}</div>
                  <div className="text-xs text-ink/50 font-semibold">{p.weeksText} · {p.sub}</div>
                </div>
              </div>
              <p className="text-sm text-ink/70 leading-relaxed mb-3.5">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t, tIdx) => (
                  <span key={tIdx} className="bg-paper text-ink/75 text-[10px] font-bold px-3 py-1 rounded-full border border-rose-mist/30">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4.5 bg-white border border-rose-mist/40 rounded-xl text-center text-sm text-ink/70 leading-relaxed">
          No necesitas devorar tomos de psicología.<br />
          Solo sigues <strong>10 minutos por día</strong> de forma guiada.<br />
          <strong>El programa hace el trabajo. Tú solo lo sigues.</strong>
        </div>
      </section>

      {/* RESULTS LIST */}
      <section className="px-5 py-9 bg-white border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono font-semibold">LO QUE CAMBIA</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-4 leading-tight">Resultados reales para ti</h2>
        
        <div className="relative rounded-2xl overflow-hidden border border-rose-mist/30 shadow-sm mb-6">
          <SmartImage 
            src="/results.jpg"
            fallbackSrc="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=600&q=80" 
            alt="Relaciones sanas" 
            className="w-full h-[180px] object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-4.5 flex flex-col justify-end text-white">
            <div className="text-xs font-bold text-wine-light tracking-wide uppercase font-mono font-mono">DESPUÉS DE BIKAIN</div>
            <h4 className="text-base font-bold text-white mt-0.5">"Por fin elijo mis conexiones desde la seguridad"</h4>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            'Calma mental — sin esfuerzo, silenciando la rumiación destructiva',
            'Cero ataques de ansiedad o pánico emocional ante el silencio',
            'Límites claros y expresados sin miedo ni sentimiento de culpa',
            'Sueño reparador, autoestima fuerte y más energía propia',
            'Filtros de merecimiento activos para no aceptar migajas en citas',
            'Control de tu vida afectiva — por primera vez con hechos'
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start bg-paper/40 p-3.5 rounded-xl border border-rose-mist/20 text-sm">
              <span className="w-5.5 h-5.5 bg-rose-mist rounded-full text-wine flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
              <span className="text-ink/85 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERT/AUTHORITY TEAM */}
      <section className="px-5 py-9 bg-white border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono">RESPALDO PROFESIONAL</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-5 leading-tight">Diseñado por psicóloga experta</h2>
        
        <div className="relative rounded-2xl overflow-hidden min-h-[350px] flex flex-col justify-end p-5 text-white border border-rose-mist/30 shadow-md">
          <SmartImage 
            src="/psicologa_vanessa.jpg"
            fallbackSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" 
            alt="Vanessa Valencia" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
          <div className="relative z-10">
            <span className="text-xs font-bold text-wine-light tracking-widest uppercase font-mono">PSICÓLOGA HOLÍSTICA</span>
            <h3 className="text-xl font-serif font-bold text-white mt-1">Vanessa Valencia</h3>
            <p className="text-sm text-rose-mist/95 leading-relaxed mt-1.5">
              Diseña, estructura y revisa cada diario y lección diaria en Bikain. Además, está disponible para asesorías individuales directas desde la aplicación.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-base font-bold text-ink mb-2 font-serif">No es otro ebook de autoayuda genérico</h4>
          <p className="text-sm text-ink/70 leading-relaxed">
            Cada lección cuenta con bases de psicología clínica y de apego. Bikain no reemplaza la terapia, pero es el mejor acompañamiento diario de reprogramación mental. Siempre tienes la opción de conectar con un terapeuta real si lo decides.
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="bg-paper p-5 py-6 border-b border-rose-mist/30 text-center">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono font-semibold">PRUEBA SOCIAL</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-5 leading-tight">Qué dicen quienes lo siguieron</h2>

        {/* Counter Widget */}
        <div className="bg-ink text-white rounded-2xl p-4.5 flex items-center gap-4 text-left border border-white/5 shadow-sm mb-6">
          <div className="flex -space-x-2 flex-shrink-0">
            <Avatar initials="SC" className="w-9 h-9 border-2 border-ink text-xs" bgClass="bg-wine" />
            <Avatar initials="VM" className="w-9 h-9 border-2 border-ink text-xs" bgClass="bg-wine-light" />
            <Avatar initials="KR" className="w-9 h-9 border-2 border-ink text-xs" bgClass="bg-gold" />
            <Avatar initials="LG" className="w-9 h-9 border-2 border-ink text-xs" bgClass="bg-[#164e63]" />
          </div>
          <div>
            <div className="text-xl font-bold text-wine-light font-mono leading-none">4,291</div>
            <p className="text-xs text-rose-mist/85 leading-snug mt-1 font-semibold">mujeres ya tienen el programa interactivo completo</p>
          </div>
        </div>

        {/* Dynamic purchase notification toasts */}
        <div className="flex flex-col gap-3 mb-6 text-left">
          {socialNotifs.map((notif, index) => (
            <div 
              key={notif.name + index} 
              className="bg-white border border-rose-mist/40 rounded-xl p-3.5 flex items-center gap-3.5 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <Avatar initials={notif.initials} className="w-9 h-9 text-xs" bgClass="bg-rose-mist text-wine" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-ink truncate">{notif.name} — {notif.location}</div>
                <div className="text-xs text-ink/50 leading-none mt-1">{notif.action}</div>
              </div>
              <div className="text-[11px] text-ink/40 flex-shrink-0 font-medium">{notif.time}</div>
            </div>
          ))}
        </div>

        {/* Global Rating Card */}
        <div className="bg-white border border-rose-mist/40 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="text-2xl mb-1.5 select-none">⭐⭐⭐⭐⭐</div>
          <div className="text-5xl font-extrabold text-ink leading-tight font-sans">4.9</div>
          <div className="text-xs text-ink/50 mt-1 font-medium">Basado en 1,847 valoraciones de usuarias verificadas</div>
          
          <div className="flex flex-col gap-2 mt-4 text-left">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right font-medium text-ink/60">5 ★</span>
              <div className="flex-1 bg-rose-mist/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: '89%' }} />
              </div>
              <span className="w-10 text-left text-ink/40">1,642</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right font-medium text-ink/60">4 ★</span>
              <div className="flex-1 bg-rose-mist/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: '8%' }} />
              </div>
              <span className="w-10 text-left text-ink/40">148</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right font-medium text-ink/60">3 ★</span>
              <div className="flex-1 bg-rose-mist/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: '2%' }} />
              </div>
              <span className="w-10 text-left text-ink/40">37</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right font-medium text-ink/60">2 ★</span>
              <div className="flex-1 bg-rose-mist/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: '0.5%' }} />
              </div>
              <span className="w-10 text-left text-ink/40">12</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right font-medium text-ink/60">1 ★</span>
              <div className="flex-1 bg-rose-mist/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: '0.5%' }} />
              </div>
              <span className="w-10 text-left text-ink/40">8</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&q=80" alt="App screenshot" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Vanessa Valencia" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80" alt="Yoga serenity" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=80" alt="Pen journal" />
        </div>

        {/* Detailed Reviews */}
        <div className="flex flex-col gap-4 text-left">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="bg-white border border-rose-mist/40 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={testi.avatar} className="w-9 h-9 text-sm" bgClass="bg-rose-mist text-wine" />
                <div>
                  <div className="text-sm font-bold text-ink">{testi.name}</div>
                  <div className="text-xs text-ink/40">{testi.location}</div>
                  <div className="text-xs text-gold mt-0.5">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed italic">
                "{testi.text}"
              </p>
              <div className="mt-3.5 pt-2 border-t border-rose-mist/20 flex flex-col gap-1 text-xs text-wine font-bold">
                <span>{testi.result}</span>
                <span className="text-ink/40 font-semibold">✓ Compra verificada · {testi.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Warranty block */}
        <div className="bg-white border-2 border-wine/50 rounded-2xl p-4.5 text-left flex gap-3.5 items-start mt-6 shadow-sm">
          <span className="text-3xl select-none flex-shrink-0">🛡️</span>
          <div>
            <h4 className="text-sm font-bold text-ink mb-1.5">Garantía total de 7 días, sin rodeos</h4>
            <p className="text-sm text-ink/70 leading-relaxed">
              Si por cualquier razón sientes que Bikain no te entrega la claridad mental esperada en tu primera semana, te devolvemos el 100% de tu dinero de inmediato. Comienzas sin riesgo.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL PRICING BOARD */}
      <section className="p-5 py-6 bg-white border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono font-semibold">TU INVERSIÓN</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-4 leading-tight">Accede hoy al programa completo</h2>
        
        <div className="bg-red-50 border border-red-200 text-red-950 rounded-xl p-4 mb-5 flex gap-3 items-start text-sm leading-relaxed">
          <span className="text-xl select-none mt-0.5">⏰</span>
          <div>
            El precio especial de lanzamiento de <strong>$9 USD</strong> es por tiempo limitado. <strong className="font-bold">{liveViews}</strong> personas lo están analizando hoy.
          </div>
        </div>

        <div className="relative overflow-hidden bg-paper rounded-2xl p-6 text-center border border-rose-mist/50 mb-5 shadow-sm">
          <div className="absolute top-3.5 right-[-24px] bg-wine text-white text-[8px] font-bold py-1.5 px-8 rotate-45 tracking-wider uppercase font-sans">
            OFERTA
          </div>
          <div className="text-sm text-ink/50 font-semibold line-through">Valor real: $47 USD</div>
          <div className="text-5xl font-extrabold text-ink leading-none my-2 font-sans">
            <span className="text-base text-wine font-bold align-super mr-0.5">$</span>9
          </div>
          <div className="text-xs text-ink/60 font-semibold font-sans">USD · Renovación manual cada 30 días · Sin cobros sorpresa</div>
        </div>

        <div className="text-sm font-bold text-ink mb-3">¿Qué está incluido?</div>
        <div className="flex flex-col gap-2.5 mb-5">
          {[
            'Acceso a los 4 programas diarios estructurados (112 días)',
            'Diario interactivo de journaling con checkboxes y guardado',
            'Soporte por correo electrónico y racha de constancia',
            'Guiones reales para conversaciones y establecimiento de límites',
            'Supervisión y respaldo de contenido por la psicóloga Vanessa Valencia',
            'Garantía incondicional de reembolso por 7 días sin preguntas'
          ].map((item, idx) => (
            <div key={idx} className="flex gap-2.5 text-sm items-center">
              <span className="w-5 h-5 bg-wine rounded-full text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
              <span className="text-ink/85 font-semibold">{item}</span>
            </div>
          ))}
        </div>

        <a 
          href="https://bikain.iagentflow.pro/checkout" 
          target="_blank"
          referrerPolicy="no-referrer"
          className="block w-full bg-wine hover:bg-wine-light text-white text-center font-bold py-4.5 px-6 rounded-2xl text-base transition-all duration-200 active:scale-95 shadow-lg shadow-wine/20"
        >
          Quiero el Programa Completo →
        </a>

        <div className="flex justify-center gap-4 mt-4">
          <span className="text-xs text-ink/50 flex items-center gap-1 font-semibold">🔒 Pago seguro</span>
          <span className="text-xs text-ink/50 flex items-center gap-1 font-semibold">⚡ Acceso inmediato</span>
          <span className="text-xs text-ink/50 flex items-center gap-1 font-semibold">🛡️ Garantizado</span>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="p-5 py-6 bg-paper border-b border-rose-mist/30">
        <div className="text-xs font-bold text-wine tracking-widest mb-2 uppercase font-mono">PREGUNTAS FRECUENTES</div>
        <h2 className="font-serif text-2xl font-bold text-ink mb-5 leading-tight">Dudas resueltas</h2>
        
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white border border-rose-mist/40 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => handleFaqToggle(idx)}
                  className="w-full text-left p-4.5 flex justify-between items-center text-sm font-bold text-ink focus:outline-none cursor-pointer"
                >
                  <span className="font-serif leading-snug">{faq.q}</span>
                  <span className={`text-base text-wine font-bold transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 text-sm text-ink/75 leading-relaxed border-t border-rose-mist/10 pt-2.5 bg-paper/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-rose-mist/50 p-6 py-8 text-center text-xs leading-relaxed">
        <p className="font-bold text-rose-mist/70 text-sm mb-2 font-serif">Bikain<span className="text-wine">.</span></p>
        <p className="max-w-[340px] mx-auto mb-4 font-semibold text-rose-mist/40">
          Crecimiento personal diario. Contenido supervisado por psicóloga profesional. No sustituye la atención clínica personalizada.
        </p>
        <p className="border-t border-white/5 pt-3 font-semibold text-rose-mist/30">
          © {new Date().getFullYear()} Bikain · Todos los derechos reservados.
        </p>
      </footer>

      {/* STICKY BOTTOM CTA */}
      <div className="sticky-cta fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-rose-mist/50 p-5 z-100 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-ink/40 line-through leading-none">$47.00</div>
          <div className="text-lg font-extrabold text-ink leading-tight font-sans">$9 USD<span className="text-xs text-wine font-semibold">/mes</span></div>
        </div>
        <a 
          href="https://bikain.iagentflow.pro/checkout" 
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex-1 bg-wine hover:bg-wine-light text-white text-center font-bold py-3.5 rounded-xl text-sm shadow-md shadow-wine/25"
        >
          Acceder ahora →
        </a>
      </div>
    </div>
  );
}
