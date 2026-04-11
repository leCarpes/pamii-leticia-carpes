// Importa o React para criar componentes
import React from 'react';

// Importa componentes do React Native:
// TouchableOpacity = botão clicável com efeito de opacidade
// Text = exibe texto na tela
// StyleSheet = cria estilos organizados
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Interface define quais propriedades o componente pode receber
interface BotaoAcaoProps {
  titulo: string; // Texto exibido dentro do botão (obrigatório)
  corFundo?: string; // Cor de fundo do botão (opcional, pode ser passada pelo usuário)
  onPress: () => void; // Função que será chamada quando o botão for pressionado
}

// Componente funcional reutilizável chamado BotaoAcao
// Ele recebe as propriedades definidas na interface acima
const BotaoAcao: React.FC<BotaoAcaoProps> = ({
  titulo, // Texto que será exibido
  corFundo = '#666666', // Cor de fundo padrão caso não seja passada
  onPress // Função executada ao clicar
}) => (

  // TouchableOpacity cria um botão clicável
  <TouchableOpacity
    style={[
      styles.botao, // Aplica estilo fixo definido no StyleSheet
      { backgroundColor: corFundo } // Aplica cor dinâmica passada pela prop
    ]}
    onPress={onPress} // Define a ação ao clicar
  >
    {/* Texto exibido dentro do botão */}
    <Text style={styles.texto}>
      {titulo} {/* Mostra o texto recebido pela prop */}
    </Text>
  </TouchableOpacity>
);

// Exporta o componente para ser usado em outros arquivos
export default BotaoAcao;

// Definição dos estilos usando StyleSheet
const styles = StyleSheet.create({

  // Estilo do botão
  botao: {
    paddingVertical: 10, // Espaçamento interno vertical
    paddingHorizontal: 15, // Espaçamento interno horizontal
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },

  // Estilo do texto dentro do botão
  texto: {
    color: '#fff', // Cor branca para contraste
    fontWeight: 'bold', // Texto em negrito
  },
});
