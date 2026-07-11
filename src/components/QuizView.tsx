import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from '../data';

interface QuizViewProps {
  onComplete: (scores: number[]) => void;
}

export default function QuizView({ onComplete }: QuizViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(0));

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (score: number) => {
    const updated = [...answers];
    updated[currentIdx] = score;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentIdx] === 0) return; // Guard

    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const progressPct = Math.round((currentIdx / quizQuestions.length) * 100);

  return (
    <div id="quiz-view" className="w-full max-w-[430px] mx-auto min-h-screen bg-paper text-ink flex flex-col shadow-xl border-x border-rose-mist/30">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-rose-mist/50 flex items-center justify-between">
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

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#fff0f6] to-[#fad1e4] text-ink px-5 py-9 text-center border-b border-rose-mist/40">
        <span className="inline-block bg-wine/10 text-wine text-[11px] font-bold tracking-[2px] px-3.5 py-1.5 rounded-full border border-wine/20 mb-4 uppercase">
          DIAGNÓSTICO GRATUITO
        </span>
        <h1 className="font-serif text-[26px] font-bold leading-tight mb-3 text-ink">
          ¿Por qué tus relaciones<br />no pueden <span className="text-wine italic font-semibold">prosperar</span>?
        </h1>
        <p className="text-sm text-ink/90 leading-relaxed mb-6 max-w-[340px] mx-auto">
          Responde 7 preguntas diseñadas por psicólogas y descubre el patrón exacto que autosabotea tu vida amorosa — y qué hacer al respecto.
        </p>
        <div className="flex justify-center gap-6 text-center border-t border-rose-mist/40 pt-5">
          <div>
            <div className="text-xl font-bold text-wine">48,291</div>
            <div className="text-[11px] text-ink/70 font-semibold mt-0.5">test realizados</div>
          </div>
          <div className="w-px bg-rose-mist" />
          <div>
            <div className="text-xl font-bold text-wine">2 min</div>
            <div className="text-[11px] text-ink/70 font-semibold mt-0.5">tiempo promedio</div>
          </div>
          <div className="w-px bg-rose-mist" />
          <div>
            <div className="text-xl font-bold text-wine">100%</div>
            <div className="text-[11px] text-ink/70 font-semibold mt-0.5">gratuito</div>
          </div>
        </div>
      </section>

      {/* PROGRESS BAR */}
      <div className="bg-white px-5 py-4 border-b border-rose-mist/30">
        <div className="flex justify-between text-xs text-ink/70 mb-2 font-semibold">
          <span>Tu progreso</span>
          <span className="font-bold text-wine">Pregunta {currentIdx + 1} de {quizQuestions.length}</span>
        </div>
        <div className="w-full h-2 bg-rose-mist/40 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-wine rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* QUIZ WRAPPER */}
      <div className="flex-1 px-5 py-7 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-start"
          >
            <div className="text-xs font-bold text-wine tracking-widest mb-2 font-mono">
              {currentQuestion.qNumText}
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-ink leading-snug mb-2.5">
              {currentQuestion.qText}
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-6">
              {currentQuestion.qSub}
            </p>

            {/* OPTIONS */}
            <div className="flex flex-col gap-3.5">
              {currentQuestion.options.map((opt, index) => {
                const isSelected = answers[currentIdx] === opt.score;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(opt.score)}
                    className={`flex items-center gap-4 w-full text-left p-4.5 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer focus:outline-none ${
                      isSelected 
                        ? 'border-wine bg-[#fffcfb] shadow-sm shadow-wine/5' 
                        : 'border-rose-mist/50 bg-white hover:border-wine/30'
                    }`}
                  >
                    <span className="text-3xl select-none">{opt.emoji}</span>
                    <div className="flex-1 text-base font-semibold leading-snug text-ink/85">
                      {opt.text}
                    </div>
                    <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isSelected ? 'border-wine bg-wine' : 'border-rose-mist/80 bg-white'
                    }`}>
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="1.5,5 4,7.5 8.5,2.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NEXT BUTTON */}
        <div className="mt-10">
          <button
            onClick={handleNext}
            disabled={answers[currentIdx] === 0}
            className={`w-full py-4.5 px-6 rounded-xl font-bold text-base transition-all duration-200 shadow-md ${
              answers[currentIdx] !== 0
                ? 'bg-wine hover:bg-wine-light text-white shadow-wine/10 cursor-pointer'
                : 'bg-rose-mist/40 text-ink/30 shadow-none cursor-not-allowed'
            }`}
          >
            {currentIdx === quizQuestions.length - 1 ? 'Ver mi diagnóstico →' : 'Siguiente pregunta →'}
          </button>
        </div>
      </div>
    </div>
  );
}
