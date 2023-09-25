<script setup>
import { computed } from 'vue';
import store from '../store';
import { useRouter } from 'vue-router';
const props = defineProps({
    todo: {}
})
const router = useRouter()
const todo = (computed(() => props.todo))


function moveToProgress(todo) {

    store.dispatch('saveTodo', {...todo, status: "PROGRESS"}).then(({data}) => {
        router.go(0)
    })
}
function moveToDone(todo) {
    store.dispatch('saveTodo', {...todo, status: "DONE"}).then(({data}) => {
        router.go(0)
    })
}
function deleteTodo(todo) {
   
   store.dispatch('deleteTodo', todo).then(() => {
   router.go(0)
 })
}
const modal =  computed(() => store.state.modal)
function openModal(open, id) {
    store.dispatch('openModal', {open, id} );
}

const isOverDue = new Date(todo.value.due_date) < new Date();
</script>

<template>
    <div class="flex flex-col rounded-md shadow-md bg-white ">
      <div class="mt-3">
        <button
          @click="openModal(!modal.open, todo.id)"
          class="w-full h-full text-left"
        >
            <div class="mb-4 w-full">
    
            <!-- {{ modal.open === true && modal.id === todo.id ? 'Collapse' : 'Expand' }} -->
        
                <span class="text-lg font-normal p-6">{{ todo.title }}</span>
            </div>
        </button> 
      </div>
    
      
      <div v-if="modal.open === true && modal.id === todo.id" class="mb-4 p-6">
        <div>
          <p class="text-base font-light">{{ todo.description }}</p>
          <p class="text-sm font-thin">Due date: 
            <span
              :class="[
                isOverDue ? 'text-red-400 font-bold' : 'font-bold'
              ]"
            >
              {{ todo.due_date }} {{ isOverDue ? '(Overdue)' : '' }}
            </span>
          </p>
        </div>
  
        <div class="flex mt-4 ">
          <h2 class="text-base font-light">Move To:</h2>
          <div class="flex flex-row space-x-3 ml-2">
            <button @click="moveToProgress(todo)" class="">Progress</button>
            <button @click="moveToDone(todo)" class="btn-action">Done</button>
          </div>
        </div>
      </div>
  
      <div class="flex justify-between px-6 pb-6">
        <button @click="deleteTodo(todo)" class="bg-red-600 text-white font-normal rounded-md px-2 mx-auto">Delete</button>
      </div>
    </div>
  </template>


  
  