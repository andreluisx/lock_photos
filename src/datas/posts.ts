import foto from '@/assets/images/foto1.png'
import hot from '@/assets/images/hot_foto2.png'
import cama from '@/assets/images/cama2.png'
import mato from '@/assets/images/mato5.png'

const USER_PREMIUM = false

export const posts = [
  {
    id: 1,
    photo: { path: foto, forPremium: false, categories: ['Natureza', 'Pôr do Sol'] },
    description: 'Curtindo um belo pôr do sol!',
    likes: 120,
    date: '02/09/2024 às 18:30',
    isPremium: USER_PREMIUM,
  },
  {
    id: 2,
    photo: { path: hot, forPremium: true, categories: ['Trabalho', 'Projetos', 'Pelada'] },
    description: 'Novo projeto saindo do forno!',
    likes: 85,
    date: '01/09/2024 às 14:15',
    isPremium: USER_PREMIUM,
  },
  {
    id: 3,
    photo: { path: cama, forPremium: true, categories: ['Fitness', 'Academia'] },
    description: 'Dia de treino intenso na academia!',
    likes: 200,
    date: '31/08/2024 às 08:45',
    isPremium: USER_PREMIUM,
  },
  {
    id: 4,
    photo: { path: mato, forPremium: true, categories: ['Natureza', 'Trilhas', 'Aventura'] },
    description: 'Explorando novas trilhas e paisagens!',
    likes: 150,
    date: '30/08/2024 às 10:00',
    isPremium: USER_PREMIUM,
  }
];