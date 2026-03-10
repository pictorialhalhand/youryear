import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId, calculateProgress, getMotivationalQuote } from '../utils/helpers';
import GoalCard from '../components/GoalCard';
import GoalModal from '../components/GoalModal';
import { Target, Plus, ArrowLeft } from 'lucide-react';

function GoalsApp() {
  const [goals, setGoals] = useLocalStorage('youryear-goals', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [quote] = useState(getMotivationalQuote);

  const handleAddGoal = (goalData) => {
    const newGoal = {
      id: generateId(),
      ...goalData,
      completed: false,
      createdAt: new Date().toISOString(),
      subgoals: goalData.subgoals || [],
    };
    setGoals([newGoal, ...goals]);
    setIsModalOpen(false);
  };

  const handleUpdateGoal = (goalData) => {
    setGoals(goals.map(g => g.id === editingGoal.id ? { ...g, ...goalData } : g));
    setEditingGoal(null);
    setIsModalOpen(false);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const handleToggleGoal = (goalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    }));
  };

  const handleToggleSubgoal = (goalId, subgoalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          subgoals: goal.subgoals.map(sg =>
            sg.id === subgoalId ? { ...sg, completed: !sg.completed } : sg
          )
        };
      }
      return goal;
    }));
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => {
    const hasSubgoals = g.subgoals && g.subgoals.length > 0;
    return hasSubgoals ? calculateProgress(g.subgoals) === 100 : g.completed;
  }).length;

  return (
    <div className="min-h-screen bg-notion-bg">
      {/* Header */}
      <header className="border-b border-notion-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-sm text-notion-text-muted hover:text-notion-text transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back
            </Link>
            <div className="flex items-center gap-2 text-sm text-notion-text-muted">
              <span><strong className="text-notion-text">{completedGoals}</strong>/{totalGoals} completed</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-7 h-7 text-notion-text" strokeWidth={1.5} />
              <h1 className="text-2xl font-semibold text-notion-text">
                YourYear
              </h1>
            </div>
            <p className="text-notion-text-secondary text-sm">
              {quote}
            </p>
          </motion.div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto pb-24">
        {/* New Goal Button */}
        <div className="px-4 py-3 border-b border-notion-border">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm text-notion-text-muted hover:text-notion-text hover:bg-notion-bg-secondary px-2 py-1 -mx-2 rounded transition-colors duration-150"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            New goal
          </button>
        </div>

        {goals.length === 0 ? (
          <EmptyState onAddGoal={() => setIsModalOpen(true)} />
        ) : (
          <div>
            {goals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                index={index}
                onToggleGoal={() => handleToggleGoal(goal.id)}
                onToggleSubgoal={(subgoalId) => handleToggleSubgoal(goal.id, subgoalId)}
                onEdit={() => handleEditGoal(goal)}
                onDelete={() => handleDeleteGoal(goal.id)}
              />
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <GoalModal
            goal={editingGoal}
            onSave={editingGoal ? handleUpdateGoal : handleAddGoal}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ onAddGoal }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-16 h-16 rounded-lg border-2 border-dashed border-notion-border flex items-center justify-center mb-6">
        <span className="text-4xl">🎯</span>
      </div>
      
      <h2 className="text-xl font-semibold text-notion-text mb-2">
        No goals yet
      </h2>
      <p className="text-notion-text-secondary text-center max-w-sm mb-6">
        Create your first goal and break it down into achievable steps.
      </p>
      
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onAddGoal}
        className="flex items-center gap-2 px-4 py-2 bg-notion-text text-white font-medium rounded-md hover:bg-black transition-colors duration-150"
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
        New goal
      </motion.button>
    </motion.div>
  );
}

export default GoalsApp;
