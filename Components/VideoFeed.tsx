import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { generateVideoSummary } from '../services/geminiService';
import { VideoData } from '../types';

// Mock Data representing "Latest"
const MOCK_VIDEOS: VideoData[] = [
  {
    id: 'v1',
    title: 'O FUTURO DA COMUNICAÇÃO GLOBAL',
    channelName: '16.15 PODCAST',
    channelUrl: 'https://www.youtube.com/@1615PODCAST',
    thumbnailUrl: 'https://picsum.photos/seed/pod1615/600/400', // Placeholder
    uploadDate: '2 dias atrás',
  },
  {
    id: 'v2',
    title: 'SUPERAÇÃO E RESILIÊNCIA: CICATRIZES',
    channelName: 'Cicatrizes Que Viram Asas',
    channelUrl: 'https://www.youtube.com/@cicatrizesqueviramasas',
    thumbnailUrl: 'https://picsum.photos/seed/cicatriz/600/400',
    uploadDate: '4 dias atrás',
  },
  {
    id: 'v3',
    title: 'AUTOMOBILISMO: A ÚLTIMA CURVA',
    channelName: 'Parada Obrigatória',
    channelUrl: 'https://www.youtube.com/@paradaobrigatoria16.15',
    thumbnailUrl: 'https://picsum.photos/seed/parada/600/400',
    uploadDate: '1 semana atrás',
  },
  {
    id: 'v4',
    title: 'FILOSOFIA UBUNTU NOS DIAS DE HOJE',
    channelName: 'UbuntuCast 16.15',
    channelUrl: 'https://www.youtube.com/@UbuntuCast16.15',
    thumbnailUrl: 'https://picsum.photos/seed/ubuntu/600/400',
    uploadDate: '1 semana atrás',
  },
   {
    id: 'v5',
    title: 'EDUCAÇÃO FINANCEIRA PARA JOVENS',
    channelName: 'PodCofrinho',
    channelUrl: 'https://www.youtube.com/@podcofrinho',
    thumbnailUrl: 'https://picsum.photos/seed/cofrinho/600/400',
    uploadDate: '2 semanas atrás',
  }
];

const VideoCard: React.FC<{ video: VideoData }> = ({ video }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (summary) return;
    setLoading(true);
    const result = await generateVideoSummary(video.title, video.channelName);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="group relative bg-brand-dark border border-gray-800 hover:border-brand-purple/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
        
        <a 
          href={video.channelUrl} 
          target="_blank" 
          rel="noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play fill="white" size={24} />
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-brand-purple uppercase tracking-wider">{video.channelName}</span>
            <span className="text-xs text-gray-500">{video.uploadDate}</span>
        </div>
        
        <h3 className="text-xl font-display font-bold leading-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-brand-gradient transition-all">
          {video.title}
        </h3>

        {/* AI Summary Section */}
        <div className="mt-auto pt-4 border-t border-gray-800">
           {!summary && !loading && (
             <button 
                onClick={handleGenerateSummary}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
             >
                <Sparkles size={12} className="text-brand-magenta" />
                Gerar Resumo IA
             </button>
           )}
           
           {loading && (
             <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
                <div className="w-2 h-2 bg-brand-purple rounded-full" />
                Processando conteúdo...
             </div>
           )}

           {summary && (
             <p className="text-sm text-gray-300 italic font-light leading-relaxed border-l-2 border-brand-magenta pl-3 py-1 bg-white/5">
                "{summary}"
             </p>
           )}
        </div>
      </div>
    </div>
  );
};

const VideoFeed: React.FC = () => {
  return (
    <section id="feed" className="py-24 bg-brand-black relative">
       <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                    Últimas <span className="text-transparent bg-clip-text bg-brand-gradient">Transmissões</span>
                </h2>
                <p className="text-gray-400 max-w-md">
                    Curadoria automática dos episódios mais recentes da nossa rede.
                </p>
            </div>
            <div className="hidden md:block">
                <div className="flex items-center gap-2 text-brand-magenta animate-pulse">
                    <span className="w-2 h-2 bg-brand-magenta rounded-full"></span>
                    <span className="text-xs font-mono uppercase">Feed Ao Vivo Ativo</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {MOCK_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
             ))}
          </div>
       </div>
    </section>
  );
};

export default VideoFeed;