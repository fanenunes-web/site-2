import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VideoFeed from './components/VideoFeed';
import Columnists from './components/Columnists';
import AwardsSection from './components/AwardsSection';
import StudioSection from './components/StudioSection';
import MerchStore from './components/MerchStore';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-magenta selection:text-white font-sans">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation />
          
          <main>
            <Hero />
            <VideoFeed />
            <Columnists />
            <AwardsSection />
            <StudioSection />
            <MerchStore />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
