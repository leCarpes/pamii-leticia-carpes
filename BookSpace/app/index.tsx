// IMPORTAÇÕES
import React, {
  useEffect,
  useState
} from 'react';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';

import { Ionicons } from '@expo/vector-icons';

import { db } from './firebaseConfig';


// MODEL
// Interface que representa um livro

interface Livro {

  // ID do Firebase
  id?: string;

  // Título
  titulo: string;

  // Autor
  autor: string;

  // Preço
  preco: number;

  // Avaliação
  avaliacao: string;
}

// COMPONENTE PRINCIPAL

export default function App() {
  // STATES
  const [titulo, setTitulo] =   // Campo título
    useState<string>('');

  const [autor, setAutor] =   // Campo autor
    useState<string>('');

  const [preco, setPreco] =   // Campo preço
    useState<string>('');

  const [avaliacao, setAvaliacao] =   // Campo avaliação
  useState<string>('');

  const [livros, setLivros] =  // Lista de livros
    useState<Livro[]>([]);

  const [mensagemErro, setMensagemErro] =  // Mensagem erro
    useState<string>('');

  // CONTROLLER - BUSCAR LIVROS

  async function buscarLivros() {

    const querySnapshot = await getDocs(  // Busca coleção livros
      collection(db, 'livros')
    );

    let lista: Livro[] = [];    // Lista temporária

    querySnapshot.forEach((documento) => {     // Percorre documentos
      lista.push({
        // ID Firebase
        id: documento.id,
        // Dados
        ...(documento.data() as Livro)
      });
    });

    // Atualiza state
    setLivros(lista);
  }

  // CONTROLLER - FORMATAR PREÇO

  function formatarPreco(valor: string) {
    // Remove tudo que não for número
    let numeros =
      valor.replace(/\D/g, '');

    // Evita erro se vazio
    if (numeros === '') {
      setPreco('');
      return;
    }

    // Formata valor
    let valorFormatado = (
      Number(numeros) / 100
    )
      .toFixed(2)
      .replace('.', ',');

    // Atualiza state
    setPreco(`R$ ${valorFormatado}`);
  }


  // CONTROLLER - VALIDAR LIVRO
  function validarLivro(): string | null {

    // VALIDAR TÍTULO
    if (!titulo.trim()) {
      return 'O título é obrigatório';
    }

    if (titulo.trim().length < 3) {
      return
    }


    // VALIDAR AUTOR
    if (!autor.trim()) {
      return 'O autor é obrigatório';
    }

    if (autor.trim().length < 3) {
      return 'Autor inválido';
    }


    // VALIDAR PREÇO
    if (!preco.trim()) {
      return 'O preço é obrigatório';
    }

    // Remove máscara
    const valorNumerico = Number(
      preco
        .replace('R$', '')
        .replace(',', '.')
        .trim()
    );

    // Verifica NaN
    if (isNaN(valorNumerico)) {
      return 'Preço inválido';
    }

    // REGRAS DE NEGÓCIO

    // Preço mínimo
    if (valorNumerico <= 0) {
      return
    }

    // Preço máximo
    if (valorNumerico > 200) {
      return
    }

    // IMPEDIR DUPLICADOS
    const livroExistente = livros.find(
      (livro) =>
        livro.titulo.toLowerCase().trim() ===
        titulo.toLowerCase().trim()
    );

    if (livroExistente) {
      return 'Livro já cadastrado';
    }

    // Sem erros
    return null;
  }

  // CONTROLLER - CADASTRAR LIVRO
  async function cadastrarLivro() {
    // Executa validação
    const erro = validarLivro();
    // Se houver erro
    if (erro) {
      setMensagemErro(erro);
      return;
    }

    // Limpa erro
    setMensagemErro('');

    // Objeto livro
    const livro: Livro = {
      titulo,
      autor,
      preco: Number(
        preco
          .replace('R$', '')
          .replace(',', '.')
          .trim()
      ),
      avaliacao,
    };

    // Salva Firebase
    await addDoc(
      collection(db, 'livros'),
      livro
    );

    // Mensagem sucesso
    Alert.alert(
      'Sucesso',
      'Livro cadastrado'
    );

    // Limpar campos
    setTitulo('');
    setAutor('');
    setPreco('');
    setAvaliacao('');
    // Atualiza lista
    buscarLivros();
  }

  // CONTROLLER - EXCLUIR LIVRO
  async function excluirLivro(id: string) {
    // Remove documento
    await deleteDoc(
      doc(db, 'livros', id)
    );
    Alert.alert(
      'Sucesso',
      'Livro excluído'
    );
    // Atualiza lista
    buscarLivros();
  }

  // useEffect
  useEffect(() => {
    buscarLivros();
  }, []);

  // VIEW
  return (
    <View style={styles.container}>
      {/*formulario*/}

      <View style={styles.formulario}>
        {/* INPUT TÍTULO */}

        <TextInput
          style={styles.input}
          placeholder="Título do livro"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* INPUT AUTOR */}

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />

        {/* INPUT PREÇO */}

        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={preco}
          onChangeText={formatarPreco}
        />

        {/* INPUT AVALIAÇÃO */}

        <TextInput
          style={styles.input}
          placeholder="Avaliação do livro"
          value={avaliacao}
          onChangeText={setAvaliacao}
        />

        {/* MENSAGEM DE ERRO  */}

        {
          mensagemErro !== '' && (
            <Text style={styles.erro}>
              ⚠️ {mensagemErro}
            </Text>

          )
        }

        {/* BOTÃO CADASTRAR */}

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrarLivro}
        >

          <Ionicons
            name="add-circle"
            size={20}
            color="#FFF"
          />

          <Text style={styles.textoBotao}>
            Cadastrar Livro
          </Text>

        </TouchableOpacity>

      </View>

      {/* LISTA DE LIVROS */}

      <FlatList

        data={livros}
        keyExtractor={(item) => item.id!}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View style={styles.card}>

            {/* TOPO CARD */}
          
            <Text style={styles.nomeLivro}>
              {item.titulo}
            </Text>

            {/* AUTOR */}
            <Text style={styles.info}>
              ✍️ Autor: {item.autor}
            </Text>

            {/* PREÇO */}
            <Text style={styles.info}>
              💰 R$ {item.preco.toFixed(2)}
            </Text>

            {/* AVALIAÇÃO */}
            <Text style={styles.info}>
              📌 {item.avaliacao}
            </Text>

            {/* BOTÃO EXCLUIR */}
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() =>
                excluirLivro(item.id!)
              }
            >

              <Ionicons
                name="trash"
                size={18}
                color="#FFF"
              />

              <Text style={styles.textoExcluir}>
                Excluir
              </Text>

            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// ESTILOS

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
    paddingTop: 25
  },


  // Formulário
  formulario: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5
  },

  // Inputs
  input: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE'
  },

  // Mensagem erro
  erro: {
    color: '#5C0A0A',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 14
  },

  // Botão cadastrar
  botao: {
    backgroundColor: '#0A1D5C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10
  },

  // Texto botão
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  // Card livro
  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4
  },

  // Nome livro
  nomeLivro: {
    fontSize: 23,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333'
  },

  // Informações
  info: {
    fontSize: 17,
    color: '#555',
    marginBottom: 10
  },


  // Botão excluir
  botaoExcluir: {
    backgroundColor: '#700505',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },

  // Texto excluir
  textoExcluir: {
    color: '#FFF',
    fontWeight: 'bold'
  }

});