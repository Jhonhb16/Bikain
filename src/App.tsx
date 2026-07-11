import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from './types';
import QuizView from './components/QuizView';
import LoadingView from './components/LoadingView';
import ResultView from './components/ResultView';
import LandingView from './components/LandingView';

export default function App() {
  const [view, setView] = useState<ViewType>('quiz');
  const [answers, setAnswers] = useState<number[]>([]);

  const handleQuizComplete = (quizScores: number[]) => {
    setAnswers(quizScores);
    setView('loading');
  };

  const handleLoadingFinish = () => {
    setView('result');
  };

  const handleGoToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToQuiz = () => {
    setAnswers([]);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fff5f8] flex items-center justify-center font-sans antialiased">
      <AnimatePresence mode="wait">
        {view === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[430px]"
          >
            <QuizView onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[430px]"
          >
            <LoadingView onFinish={handleLoadingFinish} />
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[430px]"
          >
            <ResultView answers={answers} onGoToLanding={handleGoToLanding} />
          </motion.div>
        )}

        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[430px]"
          >
            <LandingView onBackToQuiz={handleBackToQuiz} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

