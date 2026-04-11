// Importa o React e o hook useState para gerenciar estados
import React, { useState } from 'react';

// Importa o Stack do expo-router para configurar cabeçalho da tela
import { Stack } from 'expo-router';

// Importa componentes básicos do React Native
// View = contêiner
// StyleSheet = estilos
// ScrollView = permite rolagem da tela
import { View, StyleSheet, ScrollView } from 'react-native';

// Importação dos componentes criados anteriormente
import CampoTexto from './components/CampoTexto';
import BotaoAcao from './components/BotaoAcao';
import ListaTarefas from './components/ListaTarefas';
import ModalConfirmacao from './components/ModalConfirmacao';

// Define o tipo de uma tarefa
interface Tarefa {
  id: number;   // identificador único
  texto: string; // descrição da tarefa
}

// Componente principal da tela
export default function Index() {

  // Estado que guarda o texto digitado no input
  const [texto, setTexto] = useState('');

  // Estado que guarda todas as tarefas adicionadas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Estado que controla se o modal está visível
  const [modalVisivel, setModalVisivel] = useState(false);

  // Estado que guarda o ID da tarefa selecionada para exclusão
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  // Função para adicionar nova tarefa
  const adicionarTarefa = () => {

    // Não adiciona se o campo estiver vazio
    if (!texto) return;

    // Cria nova tarefa com ID único baseado no tempo
    const novaTarefa = {
      id: Date.now(),
      texto,
    };

    // Atualiza lista adicionando a nova tarefa
    setTarefas([...tarefas, novaTarefa]);

    // Limpa o campo de texto
    setTexto('');
  };

  // Função chamada ao clicar em excluir (abre modal)
  const solicitarExclusao = (id: number) => {
    setIdSelecionado(id);   // guarda ID da tarefa
    setModalVisivel(true);  // abre modal
  };

  // Função chamada ao confirmar exclusão
  const confirmarExclusao = () => {

    // Remove tarefa filtrando pelo ID
    setTarefas(tarefas.filter(t => t.id !== idSelecionado));

    // Fecha modal
    setModalVisivel(false);
  };

  // Renderização da tela
  return (
    <ScrollView style={styles.container}>

      {/* Cabeçalho da tela */}
      <Stack.Screen options={{ 
        title: 'Lista de Tarefas',          // título exibido
        headerTitleAlign: 'center',         // centraliza título
        headerStyle: { height: 60 },        // altura do cabeçalho
        headerTitleStyle: { marginTop: 10 } // margem superior do título
      }} />

      {/* Campo de texto para digitar tarefa */}
      <CampoTexto
        valor={texto}                       // valor atual do input
        onChange={setTexto}                 // atualiza estado ao digitar
        placeholder="Digite uma tarefa..."  // texto de dica
      />

      {/* Botão para adicionar tarefa */}
      <BotaoAcao
        titulo="Adicionar"                  // texto do botão
        onPress={adicionarTarefa}           // função chamada ao clicar
      />

      {/* Lista de tarefas exibida em formato de tabela */}
      <ListaTarefas
        tarefas={tarefas}                   // lista completa
        aoExcluir={solicitarExclusao}       // função chamada ao excluir
      />

      {/* Modal de confirmação de exclusão */}
      <ModalConfirmacao
        visivel={modalVisivel}              // controla visibilidade
        aoCancelar={() => setModalVisivel(false)} // fecha modal sem excluir
        aoConfirmar={confirmarExclusao}     // confirma exclusão
      />

    </ScrollView>
  );
}

// Estilos da tela principal
const styles = StyleSheet.create({
  container: {
    flex: 1,              // ocupa toda a tela
    padding: 20,          // espaçamento interno
    backgroundColor: '#f2f2f2', // cor de fundo cinza claro
  },
});
