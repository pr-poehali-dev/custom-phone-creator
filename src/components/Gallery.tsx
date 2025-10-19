import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const GALLERY_DESIGNS = [
  {
    id: 1,
    name: 'Cosmic Purple',
    author: 'Anna_Design',
    likes: 1234,
    gradient: 'from-purple-600 via-pink-500 to-purple-600',
    stickers: ['⭐', '🌙'],
  },
  {
    id: 2,
    name: 'Ocean Wave',
    author: 'Mike_Creative',
    likes: 987,
    gradient: 'from-blue-400 to-cyan-300',
    stickers: ['🌊', '🐚'],
  },
  {
    id: 3,
    name: 'Sunset Vibes',
    author: 'Lisa_Art',
    likes: 2341,
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
    stickers: ['🔥', '💫'],
  },
  {
    id: 4,
    name: 'Forest Dream',
    author: 'Nature_Lover',
    likes: 756,
    gradient: 'from-emerald-500 to-green-600',
    stickers: ['🌿', '🦋'],
  },
  {
    id: 5,
    name: 'Midnight Sky',
    author: 'Dark_Mode',
    likes: 1567,
    gradient: 'from-gray-900 via-blue-900 to-purple-900',
    stickers: ['⭐', '🌟'],
  },
  {
    id: 6,
    name: 'Cherry Blossom',
    author: 'Sakura_Fan',
    likes: 1890,
    gradient: 'from-pink-300 via-rose-400 to-pink-500',
    stickers: ['🌸', '💮'],
  },
  {
    id: 7,
    name: 'Electric Blue',
    author: 'Neon_King',
    likes: 2102,
    gradient: 'from-blue-600 to-indigo-600',
    stickers: ['⚡', '💎'],
  },
  {
    id: 8,
    name: 'Golden Hour',
    author: 'Sunset_Pro',
    likes: 1445,
    gradient: 'from-yellow-400 via-orange-400 to-red-500',
    stickers: ['☀️', '🌅'],
  },
];

export default function Gallery() {
  const [likedDesigns, setLikedDesigns] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all');

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedDesigns);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedDesigns(newLiked);
  };

  const sortedDesigns = [...GALLERY_DESIGNS].sort((a, b) => {
    if (filter === 'popular') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Галерея дизайнов
          </h2>
          <p className="text-gray-600 mt-2">Вдохновляйся работами других пользователей</p>
        </div>
        
        <div className="flex gap-2 bg-white/50 rounded-full p-1">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            onClick={() => setFilter('all')}
            size="sm"
            className={filter === 'all' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
          >
            Все
          </Button>
          <Button
            variant={filter === 'popular' ? 'default' : 'ghost'}
            onClick={() => setFilter('popular')}
            size="sm"
            className={filter === 'popular' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
          >
            Популярные
          </Button>
          <Button
            variant={filter === 'recent' ? 'default' : 'ghost'}
            onClick={() => setFilter('recent')}
            size="sm"
            className={filter === 'recent' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
          >
            Новые
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedDesigns.map((design, index) => (
          <Card
            key={design.id}
            className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all hover:-translate-y-2 animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <div className={`aspect-[9/16] bg-gradient-to-br ${design.gradient} rounded-t-2xl relative overflow-hidden`}>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/50 rounded-full"></div>
                
                {design.stickers.map((sticker, i) => (
                  <div
                    key={i}
                    className="absolute text-3xl animate-float"
                    style={{
                      left: `${30 + i * 40}%`,
                      top: `${40 + i * 20}%`,
                      animationDelay: `${i * 500}ms`,
                    }}
                  >
                    {sticker}
                  </div>
                ))}
              </div>

              <button
                onClick={() => toggleLike(design.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Icon
                  name="Heart"
                  size={20}
                  className={likedDesigns.has(design.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{design.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="User" size={14} />
                  <span>{design.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Icon name="Heart" size={14} />
                  <span>{design.likes}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Copy" size={14} className="mr-1" />
                  Копировать
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Icon name="Share2" size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <Button variant="outline" size="lg" className="rounded-full">
          <Icon name="RefreshCw" size={18} className="mr-2" />
          Загрузить ещё
        </Button>
      </div>
    </div>
  );
}
