"use client"
import DataAccount from '@/components/DataAccount';
import React, { useState } from 'react';

export default function Account() {
  const [activeTab, setActiveTab] = useState('meus-dados');
  const [isPremium, setIsPremium] = useState(true);

  // Funções para mudar de tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Componente de Meus Dados
  const MeusDados = () => {
    return (
      <DataAccount/>
    );
  };

  // Componente de Minha Assinatura
  const MinhaAssinatura = () => {
    if (!isPremium) {
      return (
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-6 text-pink-500">Minha Assinatura</h2>
          
          <div className="bg-gray-900 border border-slate-600 rounded-md p-6 mb-6">
            <h3 className="text-xl mb-4">Você ainda não possui uma assinatura Premium</h3>
            <p className="mb-6">
              Assine agora e tenha acesso a todo o conteúdo exclusivo disponível apenas para assinantes.
              Nossas imagens premium são criadas com tecnologia avançada de IA para garantir a melhor experiência.
            </p>
            
            <div className="bg-gray-800 rounded-md p-4 mb-6">
              <h4 className="text-lg font-bold text-pink-500 mb-2">Benefícios do Premium ★</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Acesso ilimitado a todas as imagens exclusivas</li>
                <li>Conteúdo novo adicionado semanalmente</li>
                <li>Suporte prioritário 24/7</li>
                <li>Solicite modelos personalizados</li>
                <li>Sem anúncios</li>
              </ul>
            </div>
            
            <button className="bg-pink-800 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md w-full text-lg">
              Ativar Premium ★
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 text-pink-500">Minha Assinatura</h2>
        
        <div className="bg-gray-900 border border-slate-600 rounded-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">Status da Assinatura</h3>
            <span className="bg-green-800 text-white px-3 py-1 rounded-md">Ativa</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">Plano</p>
              <p className="font-bold">Premium Mensal ★</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Próxima cobrança</p>
              <p className="font-bold">15/04/2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Valor</p>
              <p className="font-bold">R$ 39,90</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Ciclo</p>
              <p className="font-bold">Mensal</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">
              Atualizar método de pagamento
            </button>
            <button className="border border-red-700 text-red-500 hover:bg-red-900 hover:text-white font-bold py-2 px-4 rounded-md">
              Cancelar assinatura
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Deletar Conta
  const DeletarConta = () => {
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 text-pink-500">Deletar Conta</h2>
        
        <div className="bg-gray-900 border border-red-900 rounded-md p-6 mb-6">
          <h3 className="text-xl text-red-500 mb-4">Tem certeza que deseja excluir sua conta?</h3>
          
          <div className="bg-gray-800 p-4 rounded-md mb-6">
            <p className="mb-4 text-yellow-500 font-bold">Importante: A exclusão da conta não cancela automaticamente sua assinatura.</p>
            <p className="mb-4">
              Se você possui uma assinatura ativa, será necessário cancelá-la primeiro na seção "Minha Assinatura" 
              para evitar cobranças futuras.
            </p>
          </div>
          
          <p className="mb-6">
            Antes de nos deixar, adoraríamos saber o motivo. Talvez possamos melhorar sua experiência:
          </p>
          
          <div className="mb-6">
            <p className="font-bold mb-2">O que te fez querer excluir a conta?</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <input type="radio" id="reason1" name="reason" />
                <label htmlFor="reason1">Não encontrei o conteúdo que procurava</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="radio" id="reason2" name="reason" />
                <label htmlFor="reason2">Problemas técnicos ou de usabilidade</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="radio" id="reason3" name="reason" />
                <label htmlFor="reason3">Preço muito alto</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="radio" id="reason4" name="reason" />
                <label htmlFor="reason4">Outro motivo</label>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-bold mb-2">Lembre-se que ao excluir sua conta:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Você perderá acesso a todo o conteúdo exclusivo</li>
              <li>Suas preferências e histórico serão removidos</li>
              <li>Não receberá mais atualizações sobre novos conteúdos</li>
              <li>Você não terá mais acesso ao nosso catálogo exclusivo de imagens</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => handleTabChange('meus-dados')}
              className="bg-pink-800 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Quero continuar na plataforma
            </button>
            <button className="border border-red-700 text-red-500 hover:bg-red-900 hover:text-white font-bold py-2 px-4 rounded-md">
              Confirmar exclusão
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar conteúdo baseado na tab ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'meus-dados':
        return <MeusDados />;
      case 'minha-assinatura':
        return <MinhaAssinatura />;
      case 'deletar-conta':
        return <DeletarConta />;
      default:
        return <MeusDados />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 border-r border-slate-600">
        <div className="p-4 border-b border-slate-600">
          <h1 className="text-xl font-bold text-pink-500">Minha Conta</h1>
        </div>
        
        <nav className="p-2">
          <ul>
            <li className="mb-1">
              <button 
                onClick={() => handleTabChange('meus-dados')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'meus-dados' ? 'bg-pink-800 text-white' : 'hover:bg-gray-800'}`}
              >
                Meus Dados
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => handleTabChange('minha-assinatura')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'minha-assinatura' ? 'bg-pink-800 text-white' : 'hover:bg-gray-800'}`}
              >
                Minha Assinatura
                {isPremium && <span className="ml-2 text-yellow-400">★</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => handleTabChange('deletar-conta')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'deletar-conta' ? 'bg-pink-800 text-white' : 'hover:bg-gray-800'}`}
              >
                Deletar Conta
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto p-4 border-t border-slate-600">
          <button 
            className="flex items-center text-gray-400 hover:text-white gap-2"
            onClick={() => setIsPremium(!isPremium)} // Apenas para demonstração
          >
            {isPremium ? (
              <>
                <span className="text-yellow-400">★</span> Premium Ativo
              </>
            ) : (
              <>Ativar Premium</>
            )}
          </button>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}