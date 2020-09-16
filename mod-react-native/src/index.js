import React, {useEffect, useState} from 'react'
import {SafeAreaView,View, Text,StyleSheet, TouchableOpacity,StatusBar, Button,FlatList, ScrollView} from 'react-native'
//import api from './services/api'
//scrollView - permite fazer scroll, coloco no lugar da View
//no caso da ScroolView nao podemos ter o justify e o align do
// no caso de listas(map) nao vamos usar o ScrollView, mas sim o ..
//FlatList - que é um compponent performatico pra listas no rn, tenta ocupar o maximo de espaço possivel
//safeAreaView - usado em vez do View - ocupa toda area segura, e nao fica atras da status bar
//nela tem que se colocar estilizacao pra funcionar
//Button - tem uma estilizacao propria
//TouchableOpacity - um botao que quando clicado diminui a opacidade


export default function App() {
  //const [projects, setProjects] = useState([])

  {/** useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []) */}

  async function handleAddProject() {
     const response = await api.post('/projects', {
       title: `new project ${new Date()}`,
       owner: 'erik'
     })

     setProjects([...projects, response.data])
  }
  return (
    <>
    <StatusBar //barra de status
      barStyle="light-content"//cor do conteudo da barra de status
      backgroundColor="#7159c1"//cor de fundo da barra de status
      translucent //deixa a status bar transparent

    />
    {/**
      <SafeAreaView>
     <FlatList 
      style={styles.container}
      data={} //qual é a variavel que armazena os dados da nossa lista
      keyExtractor={project => project.id} //igual o key do rjs
      renderItem={({item: project}) => (// o item representa cada um dos projectos
        <Text>{project.title}</Text>
      )}//retorna algo  
    
    /> 
    <TouchableOpacity
    onPress={handleAddProject}
        activeOpacity={0.9}//opacidade ao clicao
    style={styles.button}>
        <Text style={styles.buttonText}>Add Project</Text>
    <TouchableOpacity>
    </SafeAreaView>  
    */}

  <ScrollView style={styles.container}>
  {/** {Map.projects(project => (
      //<Text key={project.id}>{project.title}</Text>
    //))} */}
    <Text style={styles.title}>erildo patricio hihangua francisco</Text>
  </ScrollView>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    
  },
  title: {
    color: '#FFF',
    fontSize: 103,
    fontWeight: 'bold'
  },
  button: {
    alignSelf: 'stretch',//ja é por padrao
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',//alinha o texto do button ao centro
    alignItems: 'center'//alinha o texto do button ao centro
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,

  }
})