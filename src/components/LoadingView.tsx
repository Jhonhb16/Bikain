import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingViewProps {
  onFinish: () => void;
}

export default function LoadingView({ onFinish }: LoadingViewProps) {
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    'Evaluando patrones de apego y comunicación...',
    'Analizando gestión emocional y nivel de sobreanálisis...',
    'Revisando límites personales y nivel de autorespeto...',
    'Calculando tipo de patrón dominante (ansioso, evitativo, etc.)...',
    'Preparando recomendación personalizada de 4 programas...',
  ];

  useEffect(() => {
    // Progress bar increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.25; // Completes in about 4 seconds
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Step checkboxes ticking sequentially
    const stepTimers = steps.map((_, index) => {
      return setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
      }, (index + 1) * 750); // Tick every 750ms
    });

    // Finish entire sequence after 4.5 seconds
    const finalTimer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => {
      stepTimers.forEach((t) => clearTimeout(t));
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <div id="loading-view" className="w-full max-w-[430px] mx-auto min-h-screen bg-paper text-ink flex flex-col justify-center px-6 py-12 shadow-xl border-x border-rose-mist/30">
      <div className="text-center mb-8">
        <motion.div 
          className="text-5xl mb-4 select-none inline-block"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          🔬
        </motion.div>
        <h2 className="font-serif text-xl font-bold mb-1.5 text-ink">
          Analizando tus respuestas...
        </h2>
        <p className="text-xs text-ink/60 leading-relaxed max-w-[280px] mx-auto">
          Por favor espera un momento mientras procesamos tu diagnóstico personalizado de apego.
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-rose-mist/30 rounded-full h-2 mb-8 overflow-hidden">
        <div 
          className="bg-wine h-full rounded-full transition-all duration-100 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="flex flex-col gap-3.5 max-w-[340px] mx-auto w-full">
        {steps.map((step, index) => {
          const isDone = completedSteps.includes(index);
          return (
            <div 
              key={index} 
              className={`flex items-start gap-3 text-xs transition-colors duration-300 ${
                isDone ? 'text-wine font-medium' : 'text-ink/40'
              }`}
            >
              {/* Animated checkmark/dot */}
              <div className="mt-0.5 flex-shrink-0 flex items-center justify-center">
                {isDone ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4.5 h-4.5 rounded-full bg-rose-mist text-wine flex items-center justify-center font-bold text-[9px]"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <div className="w-4.5 h-4.5 rounded-full border border-rose-mist/80 bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-mist" />
                  </div>
                )}
              </div>
              <span className="leading-tight">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
