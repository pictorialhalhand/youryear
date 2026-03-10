import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { generateId } from '../utils/helpers';

function GoalModal({ goal, onSave, onClose }) {
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [image, setImage] = useState(goal?.image || null);
  const [subgoals, setSubgoals] = useState(goal?.subgoals || []);
  const [newSubgoal, setNewSubgoal] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      image,
      subgoals,
    });
  };

  const handleAddSubgoal = () => {
    if (!newSubgoal.trim()) return;
    setSubgoals([...subgoals, { id: generateId(), title: newSubgoal.trim(), completed: false }]);
    setNewSubgoal('');
  };

  const handleRemoveSubgoal = (id) => {
    setSubgoals(subgoals.filter(sg => sg.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubgoal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, transform: 'scale(0.98) translateY(-8px)' }}
        animate={{ opacity: 1, transform: 'scale(1) translateY(0px)' }}
        exit={{ opacity: 0, transform: 'scale(0.98) translateY(-8px)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ transformOrigin: 'top center' }}
        className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-notion-border">
          <h2 className="text-lg font-semibold text-notion-text">
            {goal ? 'Edit goal' : 'New goal'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-notion-bg-hover text-notion-text-muted hover-transition"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-notion-text-secondary mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you want to achieve?"
              className="w-full px-3 py-2 bg-notion-bg-secondary border border-notion-border rounded-md text-notion-text placeholder-notion-text-muted focus:border-notion-accent focus:ring-1 focus:ring-notion-accent hover-transition"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-notion-text-secondary mb-1.5">
              Why this matters
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Remind yourself why you started..."
              rows={2}
              className="w-full px-3 py-2 bg-notion-bg-secondary border border-notion-border rounded-md text-notion-text placeholder-notion-text-muted focus:border-notion-accent focus:ring-1 focus:ring-notion-accent hover-transition resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-notion-text-secondary mb-1.5">
              Inspiration image
            </label>
            
            {image ? (
              <div className="relative rounded-md overflow-hidden border border-notion-border">
                <img src={image} alt="Goal inspiration" className="w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 text-notion-text-secondary hover:text-red-600 hover:bg-white hover-transition"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border border-dashed border-notion-border rounded-md hover:border-notion-text-muted hover:bg-notion-bg-secondary hover-transition flex items-center justify-center gap-2 text-notion-text-muted"
              >
                <Upload className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">Upload image</span>
              </button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Subgoals */}
          <div>
            <label className="block text-sm font-medium text-notion-text-secondary mb-1.5">
              Break it down
            </label>

            {/* Existing Subgoals */}
            {subgoals.length > 0 && (
              <div className="space-y-1 mb-3">
                {subgoals.map((subgoal, index) => (
                  <motion.div
                    key={subgoal.id}
                    initial={{ opacity: 0, transform: 'translateX(-8px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex items-center gap-2 py-1.5 px-2 bg-notion-bg-secondary rounded-md group"
                  >
                    <span className="w-5 h-5 rounded bg-notion-border flex items-center justify-center text-xs text-notion-text-muted font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm text-notion-text">{subgoal.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubgoal(subgoal.id)}
                      className="p-1 rounded text-notion-text-muted hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 hover-transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Add New Subgoal */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubgoal}
                onChange={(e) => setNewSubgoal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a step..."
                className="flex-1 px-3 py-2 bg-notion-bg-secondary border border-notion-border rounded-md text-notion-text placeholder-notion-text-muted focus:border-notion-accent focus:ring-1 focus:ring-notion-accent hover-transition"
              />
              <button
                type="button"
                onClick={handleAddSubgoal}
                disabled={!newSubgoal.trim()}
                className="px-3 py-2 border border-notion-border rounded-md text-notion-text-muted hover:bg-notion-bg-secondary hover:text-notion-text disabled:opacity-40 disabled:cursor-not-allowed hover-transition"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-notion-text-secondary hover:bg-notion-bg-secondary rounded-md hover-transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 text-sm font-medium bg-notion-text text-white rounded-md hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed btn-press hover-transition"
            >
              {goal ? 'Save changes' : 'Create goal'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default GoalModal;
