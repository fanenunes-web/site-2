import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const HOSTS = [
    {
        name: "Host Principal 16.15",
        role: "Fundador & Visionário",
        title: "A Nova Era da Voz",
        excerpt: "Como a inteligência artificial está redefinindo a maneira como consumimos áudio e o que isso significa para o futuro.",
        image: "https://picsum.photos/seed/host1/400/500"
    },
    {
        name: "Apresentadora Direito",
        role: "Especialista Jurídica",
        title: "Justiça e Tecnologia",
        excerpt: "Analisando os impactos das novas regulações digitais no cenário de produção de conteúdo independente.",
        image: "https://picsum.photos/seed/host2/400/500"
    },
    {
        name: "Comentarista Sport",
        role: "Analista Esportivo",
        title: "Além do Placar",
        excerpt: "O esporte como ferramenta de transformação social e a responsabilidade dos novos comunicadores.",
        image: "https://picsum.photos/seed/host3/400/500"
    }
];

const Columnists: React.FC = () => {
    return (
        <section id="hosts" className="py-24 bg-white text-brand-black">
            <div className="container mx-auto px-6">
                <div className="mb-16 border-b-2 border-brand-black pb-8 flex justify-between items-end">
                    <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
                        VOZES & <br/> OPINIÕES
                    </h2>
                    <p className="hidden md:block text-right max-w-xs font-medium">
                        Artigos exclusivos dos nossos hosts sobre tendências, mercado e sociedade.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {HOSTS.map((host, idx) => (
                        <article key={idx} className="group cursor-pointer">
                            <div className="overflow-hidden mb-6 relative">
                                <img 
                                    src={host.image} 
                                    alt={host.name} 
                                    className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                />
                                <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            
                            <div className="border-l-2 border-transparent group-hover:border-brand-purple pl-4 transition-all duration-300">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">{host.role}</span>
                                <h3 className="text-2xl font-bold leading-tight mb-3 group-hover:text-brand-purple transition-colors">
                                    {host.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {host.excerpt}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-[1px] bg-brand-black"></div>
                                    <span className="font-display font-bold">{host.name}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Columnists;