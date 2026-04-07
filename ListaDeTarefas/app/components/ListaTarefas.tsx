import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BotaoAcao from './BotaoAcao';

// Tipo da tarefa
interface Tarefa {
  id: number;
  texto: string;
}

// Props da tabela
interface ListaTarefasProps {
  tarefas: Tarefa[];
  aoExcluir: (id: number) => void;
}

// Componente que representa uma TABELA
const ListaTarefas: React.FC<ListaTarefasProps> = ({
  tarefas,
  aoExcluir
}) => (
  <View style={styles.container}>

    {/* CABEÇALHO DA TABELA */}
    <View style={styles.linha}>
      <Text style={styles.colunaHeader}>Tarefa</Text>
      <Text style={styles.colunaHeader}>Ação</Text>
    </View>

    {/* LINHAS DA TABELA */}
    {tarefas.map((item) => (
      <View key={item.id} style={styles.linha}>
        <Text style={styles.coluna}>{item.texto}</Text>

        <View style={styles.coluna}>
          <BotaoAcao
            titulo="Excluir"
            corFundo="#ff3b30"
            onPress={() => aoExcluir(item.id)}
          />
        </View>
      </View>
    ))}

  </View>
);

export default ListaTarefas;

// Estilos da tabela
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },

  // Cada linha da tabela
  linha: {
    flexDirection: 'row', // cria colunas
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  // Cabeçalho
  colunaHeader: {
    flex: 1, // divide espaço igualmente
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // Conteúdo
  coluna: {
    flex: 1, // mantém alinhamento perfeito
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});