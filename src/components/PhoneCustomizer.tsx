import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const COLORS = [
  { name: 'Midnight', value: '#1a1a2e', gradient: 'from-gray-900 to-black' },
  { name: 'Ocean', value: '#0ea5e9', gradient: 'from-blue-600 to-cyan-400' },
  { name: 'Sunset', value: '#f97316', gradient: 'from-orange-500 to-pink-500' },
  { name: 'Forest', value: '#10b981', gradient: 'from-emerald-600 to-green-400' },
  { name: 'Purple', value: '#8b5cf6', gradient: 'from-purple-600 to-pink-600' },
  { name: 'Rose', value: '#ec4899', gradient: 'from-pink-600 to-rose-400' },
];

const STICKERS = [
  { emoji: '⭐', name: 'Star' },
  { emoji: '💎', name: 'Diamond' },
  { emoji: '🔥', name: 'Fire' },
  { emoji: '🌈', name: 'Rainbow' },
  { emoji: '🎨', name: 'Art' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '💫', name: 'Sparkle' },
  { emoji: '🌙', name: 'Moon' },
];

const CASES = [
  { name: 'Прозрачный', style: 'border-2 border-gray-300 bg-white/20' },
  { name: 'Матовый', style: 'bg-gray-100' },
  { name: 'Глянцевый', style: 'bg-white shadow-lg' },
  { name: 'Карбон', style: 'bg-gradient-to-br from-gray-800 to-gray-900' },
];

export default function PhoneCustomizer() {
  const [phoneColor, setPhoneColor] = useState(COLORS[4]);
  const [caseStyle, setCaseStyle] = useState(CASES[0]);
  const [rotation, setRotation] = useState([0]);
  const [placedStickers, setPlacedStickers] = useState<Array<{ emoji: string; x: number; y: number; id: number }>>([]);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handlePhoneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPlacedStickers([...placedStickers, { 
      emoji: selectedSticker, 
      x, 
      y, 
      id: Date.now() 
    }]);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Твой дизайн
        </h2>
        
        <div className="relative mb-8">
          <div 
            className="mx-auto w-64 h-[500px] relative cursor-crosshair"
            style={{ 
              transform: `rotateY(${rotation[0]}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease'
            }}
            onClick={handlePhoneClick}
          >
            <div className={`absolute inset-0 rounded-[3rem] ${caseStyle.style} shadow-2xl`}>
              <div 
                className="absolute inset-4 rounded-[2.5rem] overflow-hidden"
                style={{ 
                  background: `linear-gradient(to bottom right, ${phoneColor.value}, ${phoneColor.value}dd)`
                }}
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div>
                
                {placedStickers.map((sticker) => (
                  <div
                    key={sticker.id}
                    className="absolute text-4xl cursor-move hover:scale-110 transition-transform"
                    style={{ left: `${sticker.x}%`, top: `${sticker.y}%`, transform: 'translate(-50%, -50%)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlacedStickers(placedStickers.filter(s => s.id !== sticker.id));
                    }}
                  >
                    {sticker.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium mb-2 block">Вращение 3D</label>
            <Slider
              value={rotation}
              onValueChange={setRotation}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full"
            onClick={() => {
              setPlacedStickers([]);
              setRotation([0]);
            }}
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Сбросить
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full"
          >
            <Icon name="Download" size={18} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 rounded-full p-1">
            <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Цвета
            </TabsTrigger>
            <TabsTrigger value="cases" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Чехлы
            </TabsTrigger>
            <TabsTrigger value="stickers" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Стикеры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4">Выбери цвет корпуса</h3>
              <div className="grid grid-cols-3 gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setPhoneColor(color)}
                    className={`group relative aspect-square rounded-2xl bg-gradient-to-br ${color.gradient} transition-all hover:scale-105 ${
                      phoneColor.name === color.name ? 'ring-4 ring-purple-600 ring-offset-2' : ''
                    }`}
                  >
                    {phoneColor.name === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Check" className="text-white drop-shadow-lg" size={32} />
                      </div>
                    )}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="mt-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4">Тип чехла</h3>
              <div className="grid grid-cols-2 gap-4">
                {CASES.map((caseItem) => (
                  <button
                    key={caseItem.name}
                    onClick={() => setCaseStyle(caseItem)}
                    className={`p-6 rounded-2xl ${caseItem.style} transition-all hover:scale-105 ${
                      caseStyle.name === caseItem.name ? 'ring-4 ring-purple-600 ring-offset-2' : ''
                    }`}
                  >
                    <p className={`font-semibold ${caseItem.name === 'Карбон' ? 'text-white' : 'text-gray-900'}`}>
                      {caseItem.name}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stickers" className="mt-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4">
                {selectedSticker ? 'Кликни на телефон чтобы добавить стикер' : 'Выбери стикер'}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {STICKERS.map((sticker) => (
                  <button
                    key={sticker.name}
                    onClick={() => setSelectedSticker(selectedSticker === sticker.emoji ? null : sticker.emoji)}
                    className={`aspect-square text-4xl rounded-2xl bg-white hover:bg-purple-100 transition-all hover:scale-110 ${
                      selectedSticker === sticker.emoji ? 'ring-4 ring-purple-600 scale-110 bg-purple-100' : ''
                    }`}
                  >
                    {sticker.emoji}
                  </button>
                ))}
              </div>
              {selectedSticker && (
                <p className="mt-4 text-sm text-center text-purple-600 font-medium">
                  Стикер выбран! Кликни по телефону для размещения
                </p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="flex items-start gap-4">
            <Icon name="Lightbulb" size={24} className="mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Совет</h4>
              <p className="text-sm opacity-90">
                Используй слайдер для поворота телефона и посмотри дизайн со всех сторон. 
                Кликни по стикеру на телефоне, чтобы удалить его.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
