import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import VideoFeed from './Components/VideoFeed';
import Columnists from './Components/Columnists';
import AwardsSection from './Components/AwardsSection';
import StudioSection from './Components/StudioSection';
import MerchStore from './Components/MerchStore';
import Footer from './Components/Footer';
import Preloader from './Components/Preloader';

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
