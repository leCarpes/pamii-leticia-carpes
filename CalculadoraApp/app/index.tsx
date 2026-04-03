import React, { useState } from 'react'; 
// Importa o React e o hook useState
// useState é usado para criar variáveis que, quando mudam, atualizam a tela automaticamente

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// Componentes do React Native:
// View: container (tipo uma div)
// Text: exibir texto
// SafeAreaView: evita sobreposição com elementos do sistema

import Botao from './components/Botao';
// Importa o componente Botao separado
// Agora o botão é reutilizável e independente da lógica

export default function Index() {
 
  // ESTADOS DA APLICAÇÃO

  // Guarda a expressão digitada pelo usuário (ex: "2+3*5")
  const [expressao, setExpressao] = useState<string>('');

  // Guarda o valor exibido no display (resultado ou expressão)
  const [resultado, setResultado] = useState<string>('0');

  // Lista de operadores usados para validação
  // Serve para saber quando o usuário digitou um operador
  const operadores = ['+', '-', 'x', '÷', '.'];

  // ESTRUTURA DOS BOTÕES

  // Cada array interno forma uma matriz (array de arrays)
  // Cada linha representa uma linha do teclado
  const linhasDeBotoes = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '=']
  ];

  // DEFINIÇÃO DE CORES

  // Essa função define a cor de cada botão baseado no seu tipo
  const obterCorFundo = (botao: string): string => {

    // Botão de limpar → vermelho
    if (botao === 'C') return '#ff3b30';

    // Botão de resultado → verde
    if (botao === '=') return '#34c759';

    // includes verifica se um valor existe dentro do array
    // Retorna true ou false (usado para identificar operadores)
    if (['÷', 'x', '-', '+'].includes(botao)) return '#ff9500'; // operadores → laranja

    if (['(', ')', '⌫'].includes(botao)) return '#555555'; // botões especiais → cinza

    // Números → cor padrão
    return '#333333';
  };

  // LÓGICA PRINCIPAL

  // Essa função é chamada SEMPRE que um botão é pressionado
  const lidarComToque = (valor: string): void => {

    // LIMPAR TUDO
    if (valor === 'C') {
      setExpressao(''); // limpa a expressão
      setResultado('0'); // volta o display para o alor incial (0)
    }

    // APAGAR ÚLTIMO CARACTERE
    else if (valor === '⌫') {

      // slice não inclui o final
      // Começa do índice 0 e vai até antes do último caractere (-1)
      // Remove o último caractere da string
      const novaExpressao = expressao.slice(0, -1);

      setExpressao(novaExpressao);

      // Se a expressão ficar vazia, mostra "0"
      setResultado(novaExpressao.length > 0 ? novaExpressao : '0');
    }

    // CALCULAR RESULTADO
    else if (valor === '=') {
      try {

        // replace substitui partes da string por outros valores
        // /x/g → substitui TODOS os "x" (g = global) por "*" 
        // /÷/g → substitui TODOS os "÷" por "/"
        const expressaoFormatada = expressao
          .replace(/x/g, '*')
          .replace(/÷/g, '/');

        // eval executa a string como código JavaScript (realiza o cálculo) 
        // Ex: "2+2" → 4
        // Deve ser usado com cuidado por questões de segurança
        const resultadoCalculado = eval(expressaoFormatada);

        // Atualiza o display e a expressão com o resultado
        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));

      } catch (e) {

        // Se der erro (ex: "2++2"), mostra erro
        setResultado('Erro');
      }
    }

    // DIGITAÇÃO NORMAL
    else {

      // includes verifica se o valor digitado está dentro do array de operadores
      if (operadores.includes(valor)) {

        // Impede começar com operador (exceto "-")
        if (expressao === '' && valor !== '-') return;

        // slice(-1) pega apenas o último caractere da string
        const ultimoCaractere = expressao.slice(-1);

        // Evita dois operadores seguidos (ex: "2++3")
        if (operadores.includes(ultimoCaractere)) {

          // Remove o último operador e substitui pelo novo
          const novaExpressao = expressao.slice(0, -1) + valor;

          setExpressao(novaExpressao);
          setResultado(novaExpressao);
          return;
        }
      }

      // Adiciona o valor digitado no final da expressão
      const novaExpressao = expressao + valor;

      setExpressao(novaExpressao);
      setResultado(novaExpressao);
    }
  };

  // RENDERIZAÇÃO DA TELA
  return (
    <SafeAreaView style={styles.container}>

      {/* DISPLAY (visor da calculadora) */}
      <View style={styles.displayContainer}>
        <Text
          style={styles.textoDisplay}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {resultado}
        </Text>
      </View>

      {/* TECLADO */}
      <View style={styles.tecladoContainer}>

        {/* 
          map percorre o array "linhasDeBotoes"
          Para cada linha, retorna uma nova View com botões
        */}

        {linhasDeBotoes.map((linha, indexLinha) => (

          <View key={indexLinha} style={styles.linha}>

            {/* 
              map percorre cada botão dentro da linha 
              Para cada item, cria um componente <Botao/>

              Agora o botão recebe a função por propriedade (onPress)
              Isso deixa o componente independente da lógica 
              O Index controla o que acontece ao clicar
            */}

            {linha.map((botao) => (
              <Botao
                key={botao}
                titulo={botao}
                corFundo={obterCorFundo(botao)}
                onPress={() => lidarComToque(botao)} // função passada para o botão
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  textoDisplay: {
    fontSize: 70,
    color: '#ffffff',
    fontWeight: '300',
  },
  tecladoContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});