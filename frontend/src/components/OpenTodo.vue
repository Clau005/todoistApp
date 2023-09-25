<script setup>
import { computed, onMounted, ref } from 'vue';
import TodoCard from './TodoCard.vue';
import store from '../store';
import axiosClient from '../axios';
import { useRouter } from 'vue-router';

const props = defineProps({
    todos: []
})

const router= useRouter();
const todos = (computed(() => props.todos.value))

const user =ref();
const getUser = () => {
  axiosClient.get('/user')
  .then(({data}) => {
    user.value = data
  })
}



const model = ref({
      title: '',
      description: '',
      status: 'OPEN',
      user_id: user.id,
      due_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })


function createTodo() {
      store.dispatch('saveTodo', model.value).then(({data}) => {
        router.go(0)
      })
  };

  onMounted(() =>  {
    getUser();
 
  })  

</script>
<template>
    <div class="flex flex-col gap-3 grow">
        <h1 class="text-center underline">Open</h1>

        <div v-for="todo in todos" class="flex flex-col" >
            <div v-if="todo">
                <TodoCard :todo="todo"/>
            </div>
            <div v-else>
                No todos
            </div>
        </div>  
    </div>
</template>