import React, { useState } from 'react';
import { Trophy, Star, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AwardData } from '../types';

const AWARDS_2024: AwardData[] = [
    { year: 2024, podcastName: "Parada Obrigatória", category: "Automobilismo", place: 1 },
    { year: 2024, podcastName: "16.15", category: "Espiritualidade", place: 1 },
    { year: 2024, podcastName: "Excelentíssimo Podcast", category: "Direito", place: 2 },
    { year: 2024, podcastName: "NaCativaCast", category: "Esporte", place: 2 },
];

const AWARDS_2025: AwardData[] = [
    { year: 2025, podcastName: "Parada Obrigatória", category: "Automobilismo", place: 1 },
    { year: 2025, podcastName: "Entre Lábios e labirintos", category: "Diversidade", place: 2 },
    { year: 2025, podcastName: "Excelentíssimo Podcast", category: "Direito", place: 2 },
    { year: 2025, podcastName: "16.15", category: "Espiritualidade", place: 3 },
    { year: 2025, podcastName: "NaCativaCast", category: "Esporte", place: 3 },
    { year: 2025, podcastName: "Inspiracats", category: "Autocuidado", place: 3 },
    { year: 2025, podcastName: "UbuntuCast", category: "Comunicação", place: 3 },
];

const AwardItem: React.FC<{ award: AwardData; index: number }> = ({ award, index }) => {
    let iconColor = "text-gray-400";
    if (award.place === 1) iconColor = "text-yellow-400";
    if (award.place === 2) iconColor = "text-gray-300";
    if (award.place === 3) iconColor = "text-amber-700";

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-6 p-6 border-b border-gray-800 hover:bg-white/5 transition-colors group"
        >
            <div className={`text-4xl font-display font-bold opacity-30 group-hover:opacity-100 transition-opacity w-12 ${iconColor}`}>
                #{award.place}
            </div>
            <div className="flex-1">
                <h4 className="text-xl font-bold text-white group-hover:text-brand-purple transition-colors">{award.podcastName}</h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{award.category}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-magenta">
                <Trophy size={20} />
            </div>
        </motion.div>
    )
}

const AwardsSection: React.FC = () => {
    const [year, setYear] = useState<2024 | 2025>(2025);

    return (
        <section id="awards" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left Column: Title & Controls */}
                    <div className="md:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-5xl font-display font-bold mb-8 leading-tight">
                                Hall de <br/>
                                <span className="text-brand-orange">Conquistas</span>
                            </h2>
                            <p className="text-gray-400 mb-12">
                                Reconhecimento nacional pela excelência em produção de conteúdo, roteiro e impacto social.
                            </p>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setYear(2025)}
                                    className={`px-8 py-3 rounded-full font-bold transition-all border ${year === 2025 ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700 hover:border-white'}`}
                                >
                                    2025
                                </button>
                                <button 
                                    onClick={() => setYear(2024)}
                                    className={`px-8 py-3 rounded-full font-bold transition-all border ${year === 2024 ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700 hover:border-white'}`}
                                >
                                    2024
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: List */}
                    <div className="md:w-2/3">
                        <div className="bg-brand-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-white/5">
                                <h3 className="font-mono text-sm uppercase tracking-widest text-gray-300">Ranking Oficial</h3>
                                <Star size={16} className="text-yellow-400" />
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={year}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {(year === 2025 ? AWARDS_2025 : AWARDS_2024).map((award, idx) => (
                                        <AwardItem key={`${award.year}-${award.podcastName}`} award={award} index={idx} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;