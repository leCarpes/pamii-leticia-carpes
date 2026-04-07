import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import CampoTexto from './components/CampoTexto';
import BotaoAcao from './components/BotaoAcao';
import ListaTarefas from './components/ListaTarefas';
import ModalConfirmacao from './components/ModalConfirmacao';

// Tipo de tarefa
interface Tarefa {
  id: number;
  texto: string;
}

export default function Index() {

  // Estado do input
  const [texto, setTexto] = useState('');

  // Lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Controle do modal
  const [modalVisivel, setModalVisivel] = useState(false);

  // Guarda o ID que será excluído
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  // Adiciona tarefa
  const adicionarTarefa = () => {
    if (!texto) return;

    const novaTarefa = {
      id: Date.now(),
      texto,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto('');
  };

  // Abre modal
  const solicitarExclusao = (id: number) => {
    setIdSelecionado(id);
    setModalVisivel(true);
  };

  // Confirma exclusão
  const confirmarExclusao = () => {
    setTarefas(tarefas.filter(t => t.id !== idSelecionado));
    setModalVisivel(false);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* INPUT */}
      <CampoTexto
        valor={texto}
        onChange={setTexto}
        placeholder="Digite uma tarefa..."
      />

      {/* BOTÃO ADICIONAR */}
      <BotaoAcao titulo="Adicionar" onPress={adicionarTarefa} />

      {/* TABELA */}
      <ListaTarefas tarefas={tarefas} aoExcluir={solicitarExclusao} />

      {/* MODAL */}
      <ModalConfirmacao
        visivel={modalVisivel}
        aoCancelar={() => setModalVisivel(false)}
        aoConfirmar={confirmarExclusao}
      />

    </SafeAreaView>
  );
}

// Estilos gerais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
});