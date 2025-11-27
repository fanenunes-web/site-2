import React from 'react';
import { Mail, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-black text-white pt-24 pb-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-3xl font-display font-bold mb-6">Junte-se ao Movimento.</h3>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Receba atualizações exclusivas, insights dos hosts e lançamentos de produtos antes de todo mundo.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Seu melhor e-mail" 
                                className="bg-white/5 border border-gray-700 px-6 py-4 rounded-lg flex-1 focus:outline-none focus:border-brand-purple transition-colors text-white"
                            />
                            <button className="bg-white text-brand-black font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-brand-purple hover:text-white transition-colors flex items-center justify-center gap-2">
                                Inscrever <Mail size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold mb-6 text-brand-purple">Mapa do Site</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#feed" className="hover:text-white transition-colors">Conteúdos</a></li>
                                <li><a href="#hosts" className="hover:text-white transition-colors">Colunistas</a></li>
                                <li><a href="#awards" className="hover:text-white transition-colors">Prêmios</a></li>
                                <li><a href="#studio" className="hover:text-white transition-colors">Sobre o Estúdio</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-brand-purple">Redes Sociais</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-magenta transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-magenta transition-colors">
                                    <Youtube size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-magenta transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">© 2025 PO Labs (16.15). Todos os direitos reservados.</p>
                    <div className="text-gray-600 text-sm flex gap-6">
                        <a href="#" className="hover:text-white">Privacidade</a>
                        <a href="#" className="hover:text-white">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;