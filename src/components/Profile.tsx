import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const USER_DESIGNS = [
  {
    id: 1,
    name: 'My First Design',
    gradient: 'from-purple-600 to-pink-600',
    created: '2 дня назад',
    likes: 45,
  },
  {
    id: 2,
    name: 'Ocean Theme',
    gradient: 'from-blue-400 to-cyan-400',
    created: '5 дней назад',
    likes: 123,
  },
  {
    id: 3,
    name: 'Fire Edition',
    gradient: 'from-orange-500 to-red-500',
    created: '1 неделю назад',
    likes: 89,
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'designs' | 'liked' | 'stats'>('designs');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400">
              UD
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">User Designer</h2>
            <p className="opacity-90 mb-4">Создатель уникальных дизайнов телефонов</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Icon name="Award" size={14} className="mr-1" />
                Pro Designer
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Icon name="Zap" size={14} className="mr-1" />
                100+ дизайнов
              </Badge>
            </div>
          </div>

          <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6 bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Icon name="Palette" className="text-white" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">127</div>
          <div className="text-sm text-gray-600">Дизайнов</div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Icon name="Heart" className="text-white" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2.5K</div>
          <div className="text-sm text-gray-600">Лайков</div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Icon name="Users" className="text-white" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">456</div>
          <div className="text-sm text-gray-600">Подписчиков</div>
        </Card>
      </div>

      <div className="flex gap-2 bg-white/50 rounded-full p-1">
        <Button
          variant={activeTab === 'designs' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('designs')}
          className={activeTab === 'designs' ? 'flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'flex-1 rounded-full'}
        >
          <Icon name="Grid" size={18} className="mr-2" />
          Мои дизайны
        </Button>
        <Button
          variant={activeTab === 'liked' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('liked')}
          className={activeTab === 'liked' ? 'flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'flex-1 rounded-full'}
        >
          <Icon name="Heart" size={18} className="mr-2" />
          Избранное
        </Button>
        <Button
          variant={activeTab === 'stats' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('stats')}
          className={activeTab === 'stats' ? 'flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600' : 'flex-1 rounded-full'}
        >
          <Icon name="BarChart" size={18} className="mr-2" />
          Статистика
        </Button>
      </div>

      {activeTab === 'designs' && (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {USER_DESIGNS.map((design, index) => (
            <Card
              key={design.id}
              className="overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`aspect-[9/16] bg-gradient-to-br ${design.gradient} relative`}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/50 rounded-full"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{design.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{design.created}</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>{design.likes}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 rounded-full">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Изменить
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Icon name="Trash" size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer group">
            <div className="aspect-[9/16] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name="Plus" className="text-white" size={32} />
                </div>
                <p className="font-semibold text-gray-600">Создать новый</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'liked' && (
        <Card className="p-12 bg-white/80 backdrop-blur-sm text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Icon name="Heart" className="text-white" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Пока пусто</h3>
          <p className="text-gray-600 mb-6">Лайкайте понравившиеся дизайны в галерее</p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full">
            <Icon name="Image" size={18} className="mr-2" />
            Перейти в галерею
          </Button>
        </Card>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-4">Активность за неделю</h3>
            <div className="space-y-3">
              {[
                { day: 'Понедельник', designs: 3, views: 145 },
                { day: 'Вторник', designs: 5, views: 234 },
                { day: 'Среда', designs: 2, views: 98 },
                { day: 'Четверг', designs: 4, views: 187 },
                { day: 'Пятница', designs: 6, views: 312 },
                { day: 'Суббота', designs: 8, views: 456 },
                { day: 'Воскресенье', designs: 7, views: 389 },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-600">{stat.day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                      style={{ width: `${(stat.views / 500) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">{stat.views} просмотров</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <div className="flex items-center gap-4">
              <Icon name="TrendingUp" size={32} />
              <div>
                <h4 className="font-bold text-lg">Рост популярности</h4>
                <p className="opacity-90">Твои дизайны набрали +340 лайков за последнюю неделю</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
