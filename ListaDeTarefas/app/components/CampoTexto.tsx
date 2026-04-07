import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// Interface define as propriedades do input
interface CampoTextoProps {
  valor: string; // valor digitado
  onChange: (texto: string) => void; // função ao digitar
  placeholder?: string;
}

// Componente de input reutilizável
const CampoTexto: React.FC<CampoTextoProps> = ({
  valor,
  onChange,
  placeholder
}) => (
  <TextInput
    style={styles.input}
    value={valor}
    onChangeText={onChange}
    placeholder={placeholder}
  />
);

export default CampoTexto;

// Estilos do input
const styles = StyleSheet.create({
  input: {
    outlineStyle: 'none',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
});