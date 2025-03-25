'use client';
import Image from 'next/image';
import background_image from '@/assets/images/hot_foto2.png';
import perfil_image from '@/assets/images/fone.png';
import trilha_image from '@/assets/images/mato5.png';
import praia_image from '@/assets/images/praia2.png';
import pelada_image from '@/assets/images/pelada.png';
import Link from 'next/link';;
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkUser } from './(auth)/login/loginActions';

export default function SubscriptionLanding() {
  const router = useRouter();

  useEffect(()=>{
    const ative = async ()=>{
      const response = await checkUser()
      if(response?.user){
        router.push('/feed');
      }
    }
    ative()
  },[router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header/Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={background_image}
            alt="Cover Image"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-black/90"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-pink-500">Curtiza</span>
            <span className="text-white">Rodriguez</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-pink-400 transition">
              Sobre Mim
            </a>
            <a href="#content" className="hover:text-pink-400 transition">
              Conteúdo
            </a>
            <a href="#plans" className="hover:text-pink-400 transition">
              Planos
            </a>
            <a href="#faq" className="hover:text-pink-400 transition">
              FAQ
            </a>
          </div>
          <Link href={'/login'} className="bg-pink-500 cursor-pointer hover:bg-pink-600 px-4 py-2 rounded-full font-medium transition">
            Entrar
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Curtiza Rodriguez Exclusive
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Assine agora e tenha acesso ao meu conteúdo exclusivo, com fotos e vídeos
            deliciosos, sem sensura.
          </p>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
          >
            Entrar Gratuitamente
          </Link>

          <div className="mt-10 flex md:flex-row gap-4 md:gap-1 items-center flex-col justify-center space-x-4">
          <div className="flex items-center">
              <svg
                className="w-5 h-5 text-pink-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Fotos Pelada</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-pink-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Conteúdo Atualizado Semanalmente</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-pink-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Pedidos Personalizados</span>
            </div>
            
          </div>
          
          <div className='flex justify-center items-center w-full pt-5 md:hidden'> 
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-pink-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="m20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z"
            ></path>
          </svg>
        </div>
        </div>
       
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative w-64 h-64 mx-auto md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-pink-500">
                <Image
                  src={perfil_image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Mim</h2>
              <p className="text-lg opacity-90 mb-6">
                Olá! Me chamo Curtiza Rodriguez, tenho 20 anos, nasci no Brasil, mas atualmente moro na Argentina. 
                Adoro tirar fotos e amo quando me fazem elogios. Gosto de viajar, praias, e de ficar em casa descansando.
              </p>
              <p className="text-lg opacity-90 mb-6">
                Assinando comigo, você terá acesso a conteúdo exclusivo que
                não compartilho em nenhum outro lugar 🤫. Busco criar uma
                experiência única e personalizada para cada assinante, estou aberta a palpites.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#plans"
                  className="flex items-center text-pink-400 hover:text-pink-300 font-medium"
                >
                  <span>Ver Planos</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview Section */}
      <section
        id="content"
        className="py-20 px-6 bg-gradient-to-b from-black to-purple-900"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Conteúdo Exclusivo
          </h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Uma prévia do tipo de conteúdo que você terá acesso ao assinar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Content Category 1 */}
            <div className="bg-purple-800/40 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105">
              <div className="h-64 relative">
                <Image
                  src={trilha_image}
                  alt="Lifestyle Content"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl text-left font-bold">Lifestyle</h3>
                  <p className="text-sm opacity-90">
                    Momentos do cotidiano e estilos variados
                  </p>
                </div>
              </div>
            </div>

            {/* Content Category 2 */}
            <div className="bg-purple-800/40 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105">
              <div className="h-64 relative">
                <Image
                  src={praia_image}
                  alt="Seasonal Content"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl text-left font-bold">Sensuais</h3>
                  <p className="text-sm opacity-90">
                    Fotos e vídeos com poucas peças de roupas
                  </p>
                </div>
              </div>
            </div>

            {/* Content Category 3 */}
            <div className="bg-purple-800/40 backdrop-blur-sm rounded-xl overflow-hidden transition transform hover:scale-105">
              <div className="h-64 relative">
                <Image
                  src={pelada_image}
                  alt="Custom Content"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl text-left font-bold">Sem Roupa</h3>
                  <p className="text-sm opacity-90">
                    Fotos e vídeos peladinha, você vai ver tudo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/register"
              className="inline-block cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition"
            >
              Ter Acesso Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="plans" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Planos de Assinatura
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta a você
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gradient-to-b from-purple-900 to-purple-800 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
              <div className="p-8  flex justify-between flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
                  <div className="text-4xl font-bold mb-4">
                    R$ 0,00
                    <span className="text-sm font-normal opacity-80">/mês</span>
                  </div>
                </div>
                <ul className="text-left mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a todo conteúdo básico</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Atualizações semanais</span>
                  </li>
                </ul>
                <Link href='/login' className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  Assinar Agora
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-b from-purple-900 to-purple-800 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
              <div className="p-8  flex justify-between flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Mensal</h3>
                  <div className="text-4xl font-bold mb-4">
                    R$ 17,90
                    <span className="text-sm font-normal opacity-80">/mês</span>
                  </div>
                </div>
                <ul className="text-left mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a todo conteúdo básico</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Atualizações semanais</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a galeria de fotos</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-pink-400 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a fotos exclusivas</span>
                  </li>
                </ul>
                <button className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  Assinar Agora
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-b from-pink-600 to-purple-700 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 ring-4 ring-pink-500">
              <div className="bg-pink-500 text-white py-2 text-sm font-bold">
                MAIS POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Anual</h3>
                <div className="text-4xl font-bold ">
                  R$ 12,90
                  <span className="text-sm font-normal opacity-80">/mês</span>
                </div>
                <p className="mb-4">R$154,80/ano</p>
                <ul className="text-left mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-white mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a todo conteúdo do plano basico</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-white mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Atualizações semanais</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-white mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a galeria de fotos</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-white mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Acesso a fotos exclusivas</span>
                  </li>
                  
                </ul>
                <button className="w-full cursor-pointer bg-white text-pink-600 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg transition">
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 px-6 bg-gradient-to-b from-purple-900 to-black"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-purple-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                O que está incluído na minha assinatura?
              </h3>
              <p className="opacity-90">
                Dependendo do plano escolhido, você terá acesso a fotos
                exclusivas, conteúdo temático, e
                possibilidade de pedidos personalizados conforme detalhado em
                cada plano.
              </p>
            </div>

            <div className="bg-purple-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h3>
              <p className="opacity-90">
                Sim, você pode cancelar sua assinatura a qualquer momento. Após
                o cancelamento, você continuará tendo acesso ao conteúdo até o
                final do período pago.
              </p>
            </div>

            <div className="bg-purple-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Com que frequência você publica novo conteúdo?
              </h3>
              <p className="opacity-90">
                Novo conteúdo é publicado semanalmente, com atualizações
                adicionais para assinantes. Notifico nas Redes sempre que
                for postar algo novo aqui pra você.
              </p>
            </div>

            <div className="bg-purple-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Como faço um pedido personalizado?
              </h3>
              <p className="opacity-90">
                me manda mensagem no instagram me provando que você
                é um assinante premium, que eu realizo seu desejo.
              </p>
            </div>

            <div className="bg-purple-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                O conteúdo é voltado para maiores de 18 anos?
              </h3>
              <p className="opacity-90">
                Sim, todo o conteúdo é exclusivamente para adultos maiores de 18
                anos. Verificamos a idade durante o processo de registro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de assinantes que já desfrutam de conteúdo
            exclusivo e personalizado.
          </p>
          <a
            href="#plans"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
          >
            Escolher um Plano
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-2xl font-bold mb-6 md:mb-0">
              <span className="text-pink-500">Curtiza</span>
              <span className="text-white">Rodriguez</span>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mb-6 md:mb-0">
              <a href="#about" className="hover:text-pink-400 transition">
                Sobre Mim
              </a>
              <a href="#content" className="hover:text-pink-400 transition">
                Conteúdo
              </a>
              <a href="#plans" className="hover:text-pink-400 transition">
                Planos
              </a>
              <a href="#faq" className="hover:text-pink-400 transition">
                FAQ
              </a>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574059871543"
                className="text-white hover:text-pink-400 transition"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/curtizarodriguez/"
                className="text-white hover:text-pink-400 transition"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center mt-8 opacity-75">
            <p>
              &copy; {new Date().getFullYear()} Curtiza Rodriguez. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
