// Importa o React, necessário para criar componentes
import React from 'react';

// Importa componentes do React Native:
// TextInput = campo de texto para digitação
// StyleSheet = utilitário para organizar estilos
import { TextInput, StyleSheet } from 'react-native';

// Interface define as propriedades que o componente pode receber
interface CampoTextoProps {
  valor: string; // valor atual do input (controlado pelo estado)
  onChange: (texto: string) => void; // função chamada sempre que o usuário digita
  placeholder?: string; // texto de dica exibido quando o campo está vazio (opcional)
}

// Componente funcional reutilizável chamado CampoTexto
// Ele recebe as propriedades definidas na interface acima
const CampoTexto: React.FC<CampoTextoProps> = ({
  valor, // valor controlado pelo estado (state)
  onChange, // função que atualiza o estado ao digitar
  placeholder // texto exibido quando o campo está vazio
}) => (

  // TextInput é o campo de texto do React Native
  <TextInput
    style={styles.input} // aplica estilo definido no StyleSheet
    value={valor} // valor atual do campo (controlado externamente)
    onChangeText={onChange} // chama a função passada sempre que o usuário digita
    placeholder={placeholder} // exibe texto de dica quando não há valor
  />
);

// Exporta o componente para ser usado em outros arquivos
export default CampoTexto;

// Definição dos estilos usando StyleSheet
const styles = StyleSheet.create({

  // Estilo aplicado ao campo de texto
  input: {
    outlineStyle: 'none', // remove borda padrão (apenas em web)
    borderWidth: 1, // espessura da borda
    borderColor: '#ccc', // cor da borda (cinza claro)
    borderRadius: 8, // borda arredondada
    padding: 10, // espaço interno entre texto e borda
    marginBottom: 10, // espaço abaixo do campo
    marginTop: 10, // espaço acima do campo
    backgroundColor: '#fff', // fundo branco
  },
});
