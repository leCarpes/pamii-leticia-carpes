// ======================================================
// IMPORTAÇÕES
// ======================================================

import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { Ionicons } from '@expo/vector-icons';

import { db } from './firebaseConfig';


// ======================================================
// MODEL
// ======================================================

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
}


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function App() {

  // ======================================================
  // STATES
  // ======================================================

  // Campo título
  const [titulo, setTitulo] =
    useState<string>('');

  // Campo autor
  const [autor, setAutor] =
    useState<string>('');

  // Campo preço
  const [preco, setPreco] =
    useState<string>('');

  // Lista de livros
  const [livros, setLivros] =
    useState<Livro[]>([]);

  // Mensagem erro
  const [mensagemErro, setMensagemErro] =
    useState<string>('');


  // ======================================================
  // CONTROLLER - BUSCAR LIVROS
  // ======================================================

  async function buscarLivros() {

    // Busca coleção livros

    const querySnapshot = await getDocs(
      collection(db, 'livros')
    );

    // Lista temporária

    let lista: Livro[] = [];

    // Percorre documentos

    querySnapshot.forEach((documento) => {

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


  // ======================================================
  // CONTROLLER - FORMATAR PREÇO
  // ======================================================

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


  // ======================================================
  // CONTROLLER - VALIDAR LIVRO
  // ======================================================

  function validarLivro(): string | null {

    // VALIDAR TÍTULO

    if (!titulo.trim()) {

      return 'O título é obrigatório';
    }

    if (titulo.trim().length < 3) {

      return
        'Título precisa ter no mínimo 3 letras';
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


    // ======================================================
    // REGRAS DE NEGÓCIO
    // ======================================================

    // Preço mínimo

    if (valorNumerico <= 0) {

      return
        'Preço deve ser maior que zero';
    }

    // Preço máximo

    if (valorNumerico > 200) {

      return
        'Livro ultrapassa o limite permitido';
    }


    // ======================================================
    // IMPEDIR DUPLICADOS
    // ======================================================

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


  // ======================================================
  // CONTROLLER - CADASTRAR LIVRO
  // ======================================================

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

      )

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

    // Atualiza lista

    buscarLivros();
  }


  // ======================================================
  // CONTROLLER - EXCLUIR LIVRO
  // ======================================================

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


  // ======================================================
  // useEffect
  // ======================================================

  useEffect(() => {

    buscarLivros();

  }, []);


  // ======================================================
  // VIEW
  // ======================================================

  return (

    <View style={styles.container}>


      {/* ======================================================
          FORMULÁRIO
      ====================================================== */}

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


        {/* ======================================================
            MENSAGEM DE ERRO
        ====================================================== */}

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


      {/* ======================================================
          LISTA DE LIVROS
      ====================================================== */}

      <FlatList

        data={livros}

        keyExtractor={(item) => item.id!}

        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (

          <View style={styles.card}>


            {/* TOPO CARD */}

            <View style={styles.topoCard}>

              <Ionicons
                name="book"
                size={22}
                color="#7B2CBF"
              />

              <Text style={styles.nomeLivro}>
                {item.titulo}
              </Text>

            </View>


            {/* AUTOR */}

            <Text style={styles.info}>
              ✍️ Autor: {item.autor}
            </Text>


            {/* PREÇO */}

            <Text style={styles.precoLivro}>
              💰 R$ {item.preco.toFixed(2)}
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


// ======================================================
// ESTILOS
// ======================================================

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

    color: '#D62828',

    marginBottom: 12,

    fontWeight: 'bold',

    fontSize: 14
  },


  // Botão cadastrar

  botao: {

    backgroundColor: '#7B2CBF',

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


  // Topo card

  topoCard: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,

    marginBottom: 10
  },


  // Nome livro

  nomeLivro: {

    fontSize: 20,

    fontWeight: 'bold',

    color: '#333'
  },


  // Informações

  info: {

    fontSize: 15,

    color: '#555',

    marginBottom: 8
  },


  // Preço

  precoLivro: {

    fontSize: 18,

    fontWeight: 'bold',

    color: '#2E7D32',

    marginBottom: 15
  },


  // Botão excluir

  botaoExcluir: {

    backgroundColor: '#D62828',

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