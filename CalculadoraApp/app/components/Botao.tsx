
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Interface define as propriedades do botão
interface BotaoProps {
  titulo: string; // Texto que aparece no botão (ex: "1", "+") - Sem o ? OBRIGATÓRIO
  corFundo?: string; // cor de fundo (opcional - com o ?)
  corTexto?: string; // cor do texto (opcional - com o ?)
  onPress: () => void; // função executada ao clicar (vem do Index)
}

// Componente reutilizável para criar todos os botões
const Botao: React.FC<BotaoProps> = ({
  titulo,
  corFundo = '#333333',
  corTexto = '#ffffff',
  onPress
}) => (
  <TouchableOpacity
    style={[styles.botao, { backgroundColor: corFundo }]}
    onPress={onPress} // executa a função recebida do componente pai (Index)
  >
    <Text style={[styles.textoBotao, { color: corTexto }]}>
      {titulo}
    </Text>
  </TouchableOpacity>
);

export default Botao;

// ESTILOS BOTAO
const styles = StyleSheet.create({
  botao: {
    width: 80,
    height: 80,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 32,
    fontWeight: '400',
  },
});