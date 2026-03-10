import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Trash2,
  Edit3,
  Image as ImageIcon
} from 'lucide-react';
import Checkbox from './Checkbox';
import { calculateProgress, formatDate } from '../utils/helpers';

function GoalCard({ goal, index, onToggleSubgoal, onToggleGoal, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const hasSubgoals = goal.subgoals && goal.subgoals.length > 0;
  
  // Calculate completion status
  const progress = calculateProgress(goal.subgoals);
  const isCompleted = hasSubgoals ? progress === 100 : goal.completed;

  const handleGoalCheckChange = (checked) => {
    if (hasSubgoals) {
      // Toggle all subgoals
      goal.subgoals.forEach(sg => {
        if (sg.completed !== checked) {
          onToggleSubgoal(sg.id);
        }
      });
    } else {
      // Toggle goal directly
      onToggleGoal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, delay: index * 0.02 }}
      className="border-b border-notion-border group"
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-notion-bg-secondary transition-colors duration-150">
        {/* Goal Checkbox */}
        <Checkbox 
          checked={isCompleted}
          onCheckedChange={handleGoalCheckChange}
        />

        {/* Content */}
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => hasSubgoals && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className={`font-medium ${isCompleted ? 'text-notion-text-muted line-through' : 'text-notion-text'}`}>
              {goal.title}
            </span>
            {hasSubgoals && (
              <span className="text-xs text-notion-text-muted bg-notion-bg-secondary px-1.5 py-0.5 rounded">
                {goal.subgoals.filter(sg => sg.completed).length}/{goal.subgoals.length}
              </span>
            )}
          </div>
          {goal.description && (
            <p className="text-sm text-notion-text-muted mt-0.5 truncate">
              {goal.description}
            </p>
          )}
        </div>

        {/* Expand Arrow */}
        {hasSubgoals && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-notion-bg-hover transition-colors duration-150"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <ChevronDown className="w-4 h-4 text-notion-text-muted" strokeWidth={1.5} />
            </motion.div>
          </button>
        )}

        {/* Actions - visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {goal.image && (
            <button
              onClick={() => setShowImage(!showImage)}
              className={`p-1.5 rounded transition-colors duration-150 ${
                showImage 
                  ? 'bg-notion-text text-white' 
                  : 'hover:bg-notion-bg-hover text-notion-text-muted'
              }`}
            >
              <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-notion-bg-hover text-notion-text-muted transition-colors duration-150"
          >
            <Edit3 className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-red-50 text-notion-text-muted hover:text-red-600 transition-colors duration-150"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Image Preview */}
      <AnimatePresence>
        {goal.image && showImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 160 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="overflow-hidden mx-4 mb-3"
          >
            <img 
              src={goal.image} 
              alt="Goal inspiration" 
              className="w-full h-40 object-cover rounded-lg border border-notion-border"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subgoals */}
      <AnimatePresence>
        {isExpanded && hasSubgoals && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pl-12 pr-4 pb-3 space-y-1">
              {goal.subgoals.map((subgoal) => (
                <div
                  key={subgoal.id}
                  className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-md hover:bg-notion-bg-secondary cursor-pointer transition-colors duration-150"
                >
                  <Checkbox
                    checked={subgoal.completed}
                    onCheckedChange={() => onToggleSubgoal(subgoal.id)}
                  />
                  <span 
                    className={`text-sm ${subgoal.completed ? 'text-notion-text-muted line-through' : 'text-notion-text'}`}
                    onClick={() => onToggleSubgoal(subgoal.id)}
                  >
                    {subgoal.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar - only when has subgoals and not expanded */}
      {hasSubgoals && !isExpanded && progress > 0 && (
        <div className="mx-4 mb-3 ml-12">
          <div className="h-1 bg-notion-border rounded-full overflow-hidden w-24">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-notion-text'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default GoalCard;
