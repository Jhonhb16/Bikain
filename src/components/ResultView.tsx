import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { testimonials, purchaseNotifications } from '../data';
import { PurchaseNotification } from '../types';

interface ResultViewProps {
  answers: number[];
  onGoToLanding: () => void;
}

export default function ResultView({ answers, onGoToLanding }: ResultViewProps) {
  // Calculate score percentage (max raw score is 28, min is 7)
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const pct = Math.round(((totalScore - 7) / 21) * 100);

  const [liveViews, setLiveViews] = useState(247);
  const [notifs, setNotifs] = useState<PurchaseNotification[]>([
    purchaseNotifications[0],
    purchaseNotifications[1],
    purchaseNotifications[2],
  ]);
  const [notifIdx, setNotifIdx] = useState(3);

  // Live page view increments
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViews((prev) => prev + Math.floor(Math.random() * 3));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Live purchase notification shifts
  useEffect(() => {
    const interval = setInterval(() => {
      const nextNotif = purchaseNotifications[notifIdx % purchaseNotifications.length];
      setNotifIdx((prev) => prev + 1);
      setNotifs((prev) => {
        const updated = [nextNotif, ...prev];
        if (updated.length > 3) updated.pop(); // Hold maximum 3 in lists
        return updated;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [notifIdx]);

  // Determine content mapping based on calculated score percentage
  let title = '';
  let sub = '';
  let diagTitle = '';
  let diagText = '';
  let alertLabel = 'NIVEL DE RIESGO';

  if (pct >= 75) {
    title = 'Tu patrón de apego está en ';
    diagTitle = 'Apego ansioso severo con tendencia al autosabotaje por complacencia';
    sub = 'Tus respuestas indican un patrón profundo de sobreanálisis, abandono de tus propios límites y un miedo persistente al abandono. Requiere reprogramación activa hoy.';
    diagText = 'Priorizas la tranquilidad del otro sobre la tuya, guardas silencio ante lo que te hiere por miedo al conflicto y te conformas con migajas de atención que justificas como "señales". <strong>Esto no se cura solo con "quererte más" — es un patrón de apego inconsciente aprendido que requiere una práctica diaria y sistemática para reprogramar tu mente.</strong>';
  } else if (pct >= 50) {
    title = 'Tus relaciones muestran ';
    diagTitle = 'Apego inestable con dificultades moderadas para sostener límites';
    sub = 'Tus respuestas muestran una inestabilidad que, si no es atendida conscientemente, te conducirá a repetir dinámicas de abandono y frustración.';
    diagText = 'Estás en un punto medio donde tus límites fluctúan: a veces toleras lo intolerable y luego reaccionas con intensidad o culpa. Te cuesta confiar plenamente y pasas días sobreanalizando pequeños gestos. <strong>Este es el momento perfecto para intervenir y sanar tus patrones, antes de entrar en otra dinámica amorosa dolorosa.</strong>';
  } else {
    title = 'Tus relaciones muestran ';
    diagTitle = 'Patrón defensivo temprano con tendencia a la evitación protectora';
    sub = 'Muestras tendencias de alerta iniciales. Soportas tensión emocional y tiendes a aislarte para que no logren herirte profundamente.';
    diagText = 'Aunque intentas mantenerte racional, tu mente inconsciente prefiere replegarse antes de mostrar vulnerabilidad. Esto te protege a corto plazo, pero sabotea tu capacidad de conectar profundamente y de sostener una pareja asertiva. <strong>Al tener una base de autorespeto parcial, avanzarás de forma sumamente rápida con nuestro plan estructurado.</strong>';
  }

  return (
    <div id="result-view" className="w-full max-w-[430px] mx-auto min-h-screen bg-paper text-ink flex flex-col shadow-xl border-x border-rose-mist/30 pb-20">
      {/* HEADER */}
      <header className="bg-white px-5 py-4 border-b border-rose-mist/50 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-wine text-white flex items-center justify-center text-base shadow-md shadow-wine/20">
            💖
          </div>
          <span className="font-serif text-base font-bold tracking-tight text-ink">Bikain<span className="text-wine">.</span></span>
        </div>
        <span className="bg-rose-mist text-wine text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          GRATIS
        </span>
      </header>

      {/* RESULT HERO CARD */}
      <section className="bg-gradient-to-br from-[#fff0f6] to-[#fad1e4] text-ink px-5 py-9 text-center border-b border-rose-mist/40">
        {/* Score Ring Gauge */}
        <div className="w-26 h-26 rounded-full border-4 border-wine flex flex-col items-center justify-center mx-auto mb-6 bg-white shadow-md shadow-wine/10">
          <span className="text-4xl font-extrabold text-wine font-sans">{pct}%</span>
          <span className="text-[10px] text-ink/70 font-bold tracking-wider font-mono mt-0.5">{alertLabel}</span>
        </div>
        
        <h2 className="font-serif text-2xl font-bold leading-tight mb-2.5 text-ink">
          {title}{' '}
          <span className="text-wine block font-bold mt-1">
            {pct >= 75 ? 'modo alerta crítico' : pct >= 50 ? 'estrés constante' : 'señales tempranas'}
          </span>
        </h2>
        <p className="text-sm text-ink/90 leading-relaxed max-w-[340px] mx-auto">
          {sub}
        </p>
      </section>

      {/* DIAGNOSTIC DETAILED SUMMARY */}
      <section className="bg-white p-5 py-6 border-b border-rose-mist/30">
        <div className="mb-6">
          <div className="text-[11px] font-bold text-wine tracking-widest mb-2 uppercase font-mono">TU DIAGNÓSTICO</div>
          <h3 className="text-lg font-serif font-bold text-ink mb-3 leading-tight">
            {diagTitle}
          </h3>
          <p className="text-sm text-ink/75 leading-relaxed" dangerouslySetInnerHTML={{ __html: diagText }} />
        </div>

        {/* PROGRESS INDICATORS LIST */}
        <div className="mb-2">
          <div className="text-[11px] font-bold text-wine tracking-widest mb-3 uppercase font-mono">TUS INDICADORES CLAVE</div>
          <div className="flex flex-col gap-4">
            {/* Ind 1 */}
            <div className="bg-paper p-3.5 rounded-xl border border-rose-mist/40">
              <div className="flex justify-between items-center text-sm mb-2 font-semibold">
                <span className="text-ink/80">Límites y Autorespeto</span>
                <span className={`font-bold ${pct >= 75 ? 'text-red-500' : pct >= 50 ? 'text-orange-500' : 'text-wine'}`}>
                  {pct >= 75 ? 'Comprometido' : pct >= 50 ? 'Desregulado' : 'Estable'}
                </span>
              </div>
              <div className="w-full h-2 bg-rose-mist/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${pct >= 75 ? 'bg-red-500' : pct >= 50 ? 'bg-orange-500' : 'bg-wine'}`}
                  style={{ width: `${Math.max(pct, 40)}%` }}
                />
              </div>
            </div>

            {/* Ind 2 */}
            <div className="bg-paper p-3.5 rounded-xl border border-rose-mist/40">
              <div className="flex justify-between items-center text-sm mb-2 font-semibold">
                <span className="text-ink/80">Nivel de Sobreanálisis</span>
                <span className="font-bold text-red-500">Crítico</span>
              </div>
              <div className="w-full h-2 bg-rose-mist/30 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Ind 3 */}
            <div className="bg-paper p-3.5 rounded-xl border border-rose-mist/40">
              <div className="flex justify-between items-center text-sm mb-2 font-semibold">
                <span className="text-ink/80">Seguridad en el Apego</span>
                <span className="font-bold text-red-500">Bajo el óptimo</span>
              </div>
              <div className="w-full h-2 bg-rose-mist/30 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            {/* Ind 4 */}
            <div className="bg-paper p-3.5 rounded-xl border border-rose-mist/40">
              <div className="flex justify-between items-center text-sm mb-2 font-semibold">
                <span className="text-ink/80">Capacidad de Elegir Pareja</span>
                <span className="font-bold text-orange-500">Basada en Ansiedad</span>
              </div>
              <div className="w-full h-2 bg-rose-mist/30 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT ADVICE BRIDGE */}
      <section className="bg-white px-5 py-6 border-b border-rose-mist/30">
        <div className="text-[11px] font-bold text-wine tracking-widest mb-2 uppercase font-mono">LO QUE RECOMIENDA EL EXPERTIS</div>
        <h3 className="text-lg font-serif font-bold text-ink mb-3 leading-tight">
          El Programa Bikain está hecho para tu perfil
        </h3>
        <p className="text-sm text-ink/75 leading-relaxed mb-4">
          De las <strong>4,291 mujeres con tu patrón de apego exacto</strong> que comenzaron el Programa Bikain este año, el <strong>89% reportó cambios rotundos en sus límites en las primeras 2 semanas</strong>.<br /><br />
          El programa ataca de raíz lo que revela tu diagnóstico: detiene el sobreanálisis destructivo, sana el autoconcepto, y te enseña a poner límites sin culpa con guiones reales en tu teléfono.
        </p>
      </section>

      {/* LIVE VIEWERS COUNTER STRIP */}
      <div className="bg-ink text-white py-3 px-5 flex items-center justify-center gap-2">
        <span className="text-wine-light font-bold text-base tracking-wide animate-pulse">{liveViews}</span>
        <span className="text-xs text-rose-mist/80 font-medium">personas están analizando su resultado hoy</span>
      </div>

      {/* SOCIAL PROOF & TESTIMONIALS */}
      <section className="bg-paper p-5 py-6 border-b border-rose-mist/30">
        <h3 className="text-center font-serif text-base font-bold text-ink mb-5 leading-snug">
          Mujeres que tenían tu mismo diagnóstico y lo cambiaron
        </h3>

        {/* Live Purchase Toasts */}
        <div className="flex flex-col gap-3 mb-6">
          {notifs.map((notif, index) => (
            <motion.div 
              key={notif.name + index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-rose-mist/50 rounded-xl p-3.5 flex items-center gap-3.5 shadow-sm"
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0" />
              <div className="w-9 h-9 rounded-full bg-rose-mist text-wine flex items-center justify-center text-sm font-bold font-serif flex-shrink-0">
                {notif.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-ink truncate">{notif.name} — {notif.location}</div>
                <div className="text-xs text-ink/60 mt-0.5">{notif.action}</div>
              </div>
              <div className="text-xs text-ink/40 flex-shrink-0">{notif.time}</div>
            </motion.div>
          ))}
        </div>

        {/* Global Rating Card */}
        <div className="bg-white border border-rose-mist/40 rounded-2xl p-5 text-center mb-6 shadow-sm">
          <div className="text-2xl mb-1.5 select-none">⭐⭐⭐⭐⭐</div>
          <div className="text-5xl font-extrabold text-ink leading-tight font-sans">4.9</div>
          <div className="text-xs text-ink/50 mt-1 font-medium">Basado en 1,847 valoraciones de usuarias verificadas</div>
          
          <div className="flex flex-col gap-2 mt-4">
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

        {/* App Image Gallery Placeholder */}
        <div className="text-xs font-bold text-ink/60 mb-2.5">Imágenes compartidas por usuarias del programa</div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&q=80" alt="App interface" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Vanessa workshop" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80" alt="Meditation serenity" />
          <img className="w-[85px] h-[110px] rounded-lg object-cover border border-rose-mist/40 flex-shrink-0" src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=80" alt="Diary journal" />
        </div>

        {/* Custom reviews */}
        <div className="flex flex-col gap-4">
          {testimonials.slice(0, 3).map((testi, idx) => (
            <div key={idx} className="bg-white border border-rose-mist/40 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-rose-mist text-wine flex items-center justify-center font-bold text-base font-serif">
                  {testi.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{testi.name}</div>
                  <div className="text-xs text-ink/50">{testi.location}</div>
                  <div className="text-xs text-gold mt-0.5">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed italic">
                "{testi.text}"
              </p>
              <div className="mt-3.5 pt-2 border-t border-rose-mist/20 flex justify-between text-xs text-wine font-bold">
                <span>{testi.result}</span>
                <span className="text-ink/40 font-semibold">Compra verificada</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white p-5 py-6 border-t border-rose-mist/30">
        <div className="bg-red-50 border border-red-200 text-red-950 rounded-xl p-4 mb-5 flex gap-3 items-start">
          <span className="text-xl mt-0.5 select-none">⏰</span>
          <div className="text-xs font-medium leading-relaxed">
            El precio especial de lanzamiento de <strong>$9 USD</strong> solo está disponible por tiempo limitado para conseguir testimonios. Las personas que comienzan hoy informan los primeros cambios en 72 horas.
          </div>
        </div>

        <div className="bg-paper rounded-2xl p-5 text-center border border-rose-mist/50 mb-5 shadow-sm">
          <div className="text-xs text-ink/50 font-semibold line-through">Valor real: $47 USD</div>
          <div className="text-5xl font-extrabold text-ink leading-none my-1.5 font-sans">
            <span className="text-base text-wine font-bold align-super mr-0.5">$</span>9
          </div>
          <div className="text-xs text-ink/70 font-semibold mt-1">Suscripción manual de 30 días · Sin cobros automáticos</div>
        </div>

        <button
          onClick={onGoToLanding}
          className="w-full bg-wine hover:bg-wine-light text-white font-bold py-4.5 px-6 rounded-2xl text-center text-base shadow-md shadow-wine/25 transition-all duration-200 active:scale-[0.99] cursor-pointer"
        >
          Ver el Programa Completo →
        </button>

        <a
          href="https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=233233780-d861c2e8-1b6b-4ae9-a3e5-d3f2b42eda58"
          target="_blank"
          referrerPolicy="no-referrer"
          className="block w-full text-center mt-3 bg-ink hover:bg-ink/90 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-200"
        >
          Acceder directamente por $9 →
        </a>

        <div className="text-center text-xs text-ink/50 leading-relaxed mt-4 max-w-[320px] mx-auto">
          Acceso inmediato · Diario interactivo + PDF completo · Diseñado para celulares · Respaldado por garantía de 7 días
        </div>
      </section>

      {/* DISCLAIMER FOOTER */}
      <footer className="bg-ink text-rose-mist/50 p-6 py-8 text-center text-xs leading-relaxed border-t border-white/5">
        <p className="font-bold text-rose-mist/70 mb-2 text-xs">Bikain · Crecimiento Personal Diario</p>
        Este diagnóstico es de carácter netamente informativo y no reemplaza la evaluación o atención psicológica médica individualizada.<br />
        © {new Date().getFullYear()} Bikain · Todos los derechos reservados.
      </footer>
    </div>
  );
}
