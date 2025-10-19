import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PhoneCustomizer from '@/components/PhoneCustomizer';
import Gallery from '@/components/Gallery';
import Profile from '@/components/Profile';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="border-b border-white/50 backdrop-blur-lg bg-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Icon name="Smartphone" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                PhoneCustom
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2 bg-white/50 rounded-full p-1">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className={activeTab === 'home' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeTab === 'constructor' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('constructor')}
                className={activeTab === 'constructor' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
              >
                <Icon name="Palette" size={18} className="mr-2" />
                Конструктор
              </Button>
              <Button
                variant={activeTab === 'gallery' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('gallery')}
                className={activeTab === 'gallery' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
              >
                <Icon name="Image" size={18} className="mr-2" />
                Галерея
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className={activeTab === 'profile' ? 'rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'rounded-full'}
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full">
              <Icon name="Share2" size={18} className="mr-2" />
              Поделиться
            </Button>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/50 z-50">
        <div className="flex justify-around p-2">
          {[
            { id: 'home', icon: 'Home', label: 'Главная' },
            { id: 'constructor', icon: 'Palette', label: 'Конструктор' },
            { id: 'gallery', icon: 'Image', label: 'Галерея' },
            { id: 'profile', icon: 'User', label: 'Профиль' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'text-purple-600 bg-purple-100'
                  : 'text-gray-600'
              }`}
            >
              <Icon name={tab.icon as any} size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {activeTab === 'home' && <HomePage onStartCustomizing={() => setActiveTab('constructor')} />}
        {activeTab === 'constructor' && <PhoneCustomizer />}
        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
}

function HomePage({ onStartCustomizing }: { onStartCustomizing: () => void }) {
  return (
    <div className="space-y-20">
      <section className="text-center py-20 animate-fade-in">
        <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Создай телефон мечты
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Дизайн, цвета, стикеры — всё в твоих руках. Создавай уникальные образы и делись ими с друзьями
        </p>
        <Button
          onClick={onStartCustomizing}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          <Icon name="Sparkles" size={24} className="mr-2" />
          Начать создание
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: 'Palette',
            title: 'Выбор цветов',
            desc: 'Тысячи оттенков для корпуса, чехла и интерфейса',
            gradient: 'from-purple-500 to-pink-500',
          },
          {
            icon: 'Sticker',
            title: 'Стикеры и декор',
            desc: 'Добавь уникальные наклейки и элементы',
            gradient: 'from-pink-500 to-orange-500',
          },
          {
            icon: 'View',
            title: '3D просмотр',
            desc: 'Вращай и изучай свой телефон со всех сторон',
            gradient: 'from-blue-500 to-purple-500',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-scale-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
              <Icon name={feature.icon as any} className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="text-center">
        <h3 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Популярные дизайны
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { color: 'from-purple-400 to-pink-400', name: 'Sunset Dream' },
            { color: 'from-blue-400 to-cyan-400', name: 'Ocean Breeze' },
            { color: 'from-orange-400 to-red-400', name: 'Fire Soul' },
            { color: 'from-green-400 to-emerald-400', name: 'Forest Vibe' },
          ].map((design, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={onStartCustomizing}
            >
              <div className={`aspect-[9/16] bg-gradient-to-br ${design.color} rounded-3xl shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-105 animate-float`}
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
              <p className="mt-3 font-semibold text-gray-700">{design.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
