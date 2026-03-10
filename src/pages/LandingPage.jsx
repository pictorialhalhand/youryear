import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, ArrowRight, CheckCircle, Image, Lock, Layers } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-notion-bg">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-notion-text" strokeWidth={1.5} />
          <span className="font-semibold text-notion-text">YourYear</span>
        </div>
        <Link 
          to="/app"
          className="text-sm text-notion-text-secondary hover:text-notion-text transition-colors duration-150"
        >
          Open App →
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-semibold text-notion-text tracking-tight mb-6">
            Your goals,<br />organized.
          </h1>
          <p className="text-xl text-notion-text-secondary max-w-lg mx-auto mb-10">
            Break down big dreams into small, achievable steps. 
            Track progress. Stay motivated. All private, all local.
          </p>
          <Link to="/app">
            <motion.button
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-notion-text text-white font-medium rounded-lg hover:bg-black transition-colors duration-150"
            >
              Get Started
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={<Target className="w-5 h-5" strokeWidth={1.5} />}
            title="Centralize your goals"
            description="Keep all your goals in one place. See everything at a glance."
          />
          <FeatureCard
            icon={<Layers className="w-5 h-5" strokeWidth={1.5} />}
            title="Break it down"
            description="Split big goals into smaller, manageable subgoals you can actually do."
          />
          <FeatureCard
            icon={<Image className="w-5 h-5" strokeWidth={1.5} />}
            title="Stay motivated"
            description="Attach images to remind yourself why you started in the first place."
          />
          <FeatureCard
            icon={<Lock className="w-5 h-5" strokeWidth={1.5} />}
            title="100% private"
            description="Your data stays on your device. No accounts, no servers, no tracking."
          />
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          className="mt-24"
        >
          <div className="border border-notion-border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-notion-bg-secondary px-4 py-3 border-b border-notion-border flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-notion-border" />
              <div className="w-3 h-3 rounded-full bg-notion-border" />
              <div className="w-3 h-3 rounded-full bg-notion-border" />
            </div>
            <div className="p-6 bg-white">
              <div className="space-y-3">
                <PreviewGoal title="Learn a new language" progress={60} />
                <PreviewGoal title="Run a marathon" progress={25} />
                <PreviewGoal title="Read 24 books this year" progress={100} completed />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-notion-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-notion-text-muted">
          <span>YourYear</span>
          <span>Your data never leaves your device.</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-5 rounded-xl border border-notion-border hover:bg-notion-bg-secondary transition-colors duration-150">
      <div className="w-10 h-10 rounded-lg bg-notion-bg-secondary flex items-center justify-center text-notion-text mb-4">
        {icon}
      </div>
      <h3 className="font-medium text-notion-text mb-1">{title}</h3>
      <p className="text-sm text-notion-text-secondary">{description}</p>
    </div>
  );
}

function PreviewGoal({ title, progress, completed }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center ${
        completed ? 'bg-notion-text border-notion-text' : 'border-notion-border'
      }`}>
        {completed && <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <span className={`flex-1 ${completed ? 'text-notion-text-muted line-through' : 'text-notion-text'}`}>
        {title}
      </span>
      <div className="w-20 h-1 bg-notion-border rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${completed ? 'bg-green-500' : 'bg-notion-text'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-notion-text-muted w-8">{progress}%</span>
    </div>
  );
}

export default LandingPage;
