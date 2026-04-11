// Importa o React para criar componentes
import React from 'react';

// Importa componentes do React Native:
// View = contêiner para organizar elementos
// Text = exibe texto na tela
// StyleSheet = cria estilos organizados
import { View, Text, StyleSheet } from 'react-native';

// Importa o componente BotaoAcao criado anteriormente
import BotaoAcao from './BotaoAcao';

// Define o tipo de cada tarefa
interface Tarefa {
  id: number;   // identificador único da tarefa
  texto: string; // descrição da tarefa
}

// Define as propriedades que o componente ListaTarefas pode receber
interface ListaTarefasProps {
  tarefas: Tarefa[]; // lista completa de tarefas
  aoExcluir: (id: number) => void; // função chamada para excluir uma tarefa
}

// Componente funcional que representa uma "tabela" de tarefas
// Usa View + flexDirection para simular linhas e colunas
const ListaTarefas: React.FC<ListaTarefasProps> = ({
  tarefas,   // lista de tarefas recebida como prop
  aoExcluir  // função para excluir tarefa
}) => (

  // Contêiner principal da tabela
  <View style={styles.container}>

    {/* Cabeçalho da tabela */}
    <View style={styles.linha}>
      <Text style={styles.colunaHeader}>Tarefa</Text>
      <Text style={styles.colunaHeader}>Ação</Text>
    </View>

    {/* Renderiza cada tarefa como uma linha */}
    {tarefas.map((item) => (

      // Cada item da lista vira uma linha
      <View key={item.id} style={styles.linha}>

        {/* Primeira coluna: texto da tarefa */}
        <Text style={styles.coluna}>
          {item.texto}
        </Text>

        {/* Segunda coluna: botão de ação */}
        <View style={styles.coluna}>
          <BotaoAcao
            titulo="Excluir"       // texto do botão
            corFundo="#850b05"     // cor de fundo vermelha
            onPress={() => aoExcluir(item.id)} // ao clicar, chama função passando o id
          />
        </View>

      </View>
    ))}

  </View>
);

// Exporta o componente para ser usado em outros arquivos
export default ListaTarefas;

// Definição dos estilos usando StyleSheet
const styles = StyleSheet.create({

  // Estilo do contêiner principal
  container: {
    marginTop: 10,       // espaço acima da tabela
    borderWidth: 1,      // espessura da borda externa
    borderColor: '#ccc', // cor da borda externa
    borderRadius: 10,    // bordas arredondadas
    overflow: 'hidden',  // evita que conteúdo ultrapasse borda
  },

  // Estilo de cada linha (simula <tr>)
  linha: {
    flexDirection: 'row',   // organiza elementos em linha
    padding: 10,            // espaçamento interno
    borderBottomWidth: 1,   // linha divisória inferior
    borderColor: '#eee',    // cor da linha divisória
  },

  // Estilo do cabeçalho (simula <th>)
  colunaHeader: {
    flex: 1,                // ocupa espaço proporcional
    textAlign: 'center',    // centraliza texto
    fontWeight: 'bold',     // deixa em negrito
  },

  // Estilo das colunas (simula <td>)
  coluna: {
    flex: 1,                // ocupa espaço proporcional
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
  },
});
