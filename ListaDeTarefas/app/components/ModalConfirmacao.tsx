// Importa o React para criar componentes
import React from 'react';

// Importa componentes do React Native:
// Modal = janela que aparece sobre a tela
// View = contêiner para organizar elementos
// Text = exibe texto
// StyleSheet = cria estilos organizados
import { Modal, View, Text, StyleSheet } from 'react-native';

// Importa o componente BotaoAcao criado anteriormente
import BotaoAcao from './BotaoAcao';

// Interface define as propriedades que o modal pode receber
interface ModalConfirmacaoProps {
  visivel: boolean; // controla se o modal aparece ou não
  aoConfirmar: () => void; // função chamada ao confirmar
  aoCancelar: () => void; // função chamada ao cancelar
}

// Componente funcional ModalConfirmacao
const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  visivel,     // controla visibilidade do modal
  aoConfirmar, // função executada ao confirmar
  aoCancelar   // função executada ao cancelar
}) => (

  // Modal é uma janela sobreposta à tela
  <Modal transparent visible={visivel} animationType="fade">

    {/* Fundo escuro semitransparente */}
    <View style={styles.overlay}>

      {/* Caixa branca centralizada do modal */}
      <View style={styles.modal}>

        {/* Texto de confirmação */}
        <Text style={styles.texto}>Deseja excluir?</Text>

        {/* Botão cancelar */}
        <BotaoAcao
          titulo="Cancelar"       // texto do botão
          corFundo="#666666"      // cor cinza
          onPress={aoCancelar}    // chama função ao cancelar
        />

        {/* Botão confirmar */}
        <BotaoAcao
          titulo="Confirmar"      // texto do botão
          corFundo="#04521e"      // cor verde escura
          onPress={aoConfirmar}   // chama função ao confirmar
        />

      </View>
    </View>
  </Modal>
);

// Exporta o componente para ser usado em outros arquivos
export default ModalConfirmacao;

// Estilos do modal
const styles = StyleSheet.create({

  // Fundo escuro transparente que cobre toda a tela
  overlay: {
    flex: 1, // ocupa toda a tela
    backgroundColor: 'rgba(0,0,0,0.5)', // preto semitransparente
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
  },

  // Caixa branca centralizada
  modal: {
    backgroundColor: '#fff', // fundo branco
    padding: 20,             // espaçamento interno
    borderRadius: 10,        // bordas arredondadas
    width: '80%',            // largura proporcional à tela
    gap: 10,                 // espaçamento entre elementos
  },

  // Texto exibido dentro do modal
  texto: {
    fontSize: 16,            // tamanho da fonte
    textAlign: 'center',     // centraliza texto
  },
});
