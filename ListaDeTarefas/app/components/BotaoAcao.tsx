import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Interface define as propriedades do botão
interface BotaoAcaoProps {
  titulo: string; // Texto exibido no botão
  corFundo?: string; // Cor de fundo opcional
  onPress: () => void; // Função executada ao clicar
}

// Componente reutilizável de botão
const BotaoAcao: React.FC<BotaoAcaoProps> = ({
  titulo,
  corFundo = '#0067ee', // cor padrão (roxo)
  onPress
}) => (
  <TouchableOpacity
    style={[styles.botao, { backgroundColor: corFundo }]}
    onPress={onPress}
  >
    <Text style={styles.texto}>{titulo}</Text>
  </TouchableOpacity>
);

export default BotaoAcao;

// Estilos do botão
const styles = StyleSheet.create({
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});