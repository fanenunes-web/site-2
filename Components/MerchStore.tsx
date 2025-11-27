import React from 'react';
import { ShoppingBag } from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: "Moletom PO Labs Signature", price: 289.90, image: "https://picsum.photos/seed/hoodie/400/400" },
    { id: 2, name: "Caneca Vibe Coding", price: 59.90, image: "https://picsum.photos/seed/mug/400/400" },
    { id: 3, name: "T-Shirt Minimal 16.15", price: 119.90, image: "https://picsum.photos/seed/tshirt/400/400" },
    { id: 4, name: "Boné Trucker Logo", price: 89.90, image: "https://picsum.photos/seed/cap/400/400" },
];

const MerchStore: React.FC = () => {
    return (
        <section id="store" className="py-24 bg-brand-dark border-t border-gray-900">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-white">Loja Oficial</h2>
                    <a href="#" className="text-brand-purple hover:text-white transition-colors uppercase font-bold text-sm tracking-widest flex items-center gap-2">
                        Ver Todos <ShoppingBag size={16} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="group">
                            <div className="relative overflow-hidden bg-gray-900 rounded-lg mb-4 aspect-square">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                                />
                                <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                    <ShoppingBag size={20} />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-magenta transition-colors">{product.name}</h3>
                            <p className="text-gray-400 font-mono">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MerchStore;