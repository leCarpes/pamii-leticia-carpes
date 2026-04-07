import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import BotaoAcao from './BotaoAcao';

// Interface define propriedades do modal
interface ModalConfirmacaoProps {
  visivel: boolean; // controla se aparece ou não
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

// Componente de confirmação
const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  visivel,
  aoConfirmar,
  aoCancelar
}) => (
  <Modal transparent visible={visivel} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.texto}>Deseja excluir?</Text>

        {/* Botões com nomes semânticos */}
        <BotaoAcao titulo="Cancelar" corFundo="#999" onPress={aoCancelar} />
        <BotaoAcao titulo="Confirmar" corFundo="#ff3b30" onPress={aoConfirmar} />
      </View>
    </View>
  </Modal>
);

export default ModalConfirmacao;

// Estilos do modal
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // fundo escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    gap: 10,
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
  },
});