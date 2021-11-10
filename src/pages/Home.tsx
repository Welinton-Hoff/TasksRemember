import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  View
} from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.title === newTaskTitle)

    if (!foundItem) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }

      setTasks(oldState => [...oldState, newTask])
    }
    else Alert.alert('Você não pode cadastrar uma task com o mesmo nome.')
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id)

    if (!foundItem) return
    else {
      foundItem.done = !foundItem.done

      setTasks(updatedTasks)
    }

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim', onPress: () => {
            const updatedTasks = tasks.filter(skill => skill.id !== id)

            setTasks(updatedTasks)
          }
        },
        { text: 'Não' },
      ],
      { cancelable: false }
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTaskToUpdate = updatedTasks.find(item => item.id === taskId)

    if (!foundTaskToUpdate) return
    else {
      foundTaskToUpdate.title = taskNewTitle

      setTasks(updatedTasks)
    }

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})