import React from 'react';
import { Mic2, Settings, Wifi } from 'lucide-react';

const StudioSection: React.FC = () => {
    return (
        <section id="studio" className="py-32 bg-brand-black relative flex items-center min-h-screen">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/10 via-transparent to-transparent opacity-50"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <p className="text-brand-magenta font-mono uppercase tracking-[0.3em] mb-4">A Infraestrutura</p>
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                        BEM-VINDO À CASA. <br/>
                        <span className="text-gray-600">ONDE VOZES SE TORNAM MOVIMENTO.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Mic2, title: "Acústica Premium", desc: "Isolamento de nível industrial e microfones Shure de alta fidelidade para capturar cada nuance." },
                        { icon: Settings, title: "Personalização", desc: "Cenários modulares que se adaptam à identidade visual única de cada podcast." },
                        { icon: Wifi, title: "Transmissão 4K", desc: "Pipeline de vídeo de ultra-baixa latência para lives estáveis e cristalinas." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-md">
                            <feature.icon size={40} className="text-brand-orange mb-6" />
                            <h3 className="text-2xl font-display font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudioSection;