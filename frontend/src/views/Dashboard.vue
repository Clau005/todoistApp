<script setup>
import { computed, onMounted,  ref } from 'vue';
import axiosClient from '../axios';
import store from '../store';
import {  useRouter } from 'vue-router';
import OpenTodo from "../components/OpenTodo.vue";
import ProgressTodo from "../components/ProgressTodo.vue";
import DoneTodo from "../components/DoneTodo.vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {  PlusCircleIcon } from '@heroicons/vue/24/outline'

const open = ref(false)

const router = useRouter();

const user =ref();
const getUser = () => {
  axiosClient.get('/user')
  .then(({data}) => {
    user.value = data
  })
}

const todos = computed(() => store.state.todos.data);

store.dispatch("getTodos");



  const model = ref({
      title: '',
      description: '',
      status: 'OPEN',
      user_id: user.id,
      due_date: Date()
    })
  
  function createTodo() {
      store.dispatch('saveTodo', model.value).then(({data}) => {
        router.go(0)
      })
  };

  onMounted(() =>  {
    getUser();
 
  })  
  
// Filter todos by status
const doneTodos = ref([]);
const progressTodos = ref([]);
const openTodos = ref([]);


 openTodos.value = computed(() => todos.value.filter((todo) => todo.status === "OPEN"))
 progressTodos.value = computed(() => todos.value.filter((todo) => todo.status === "PROGRESS"))
 doneTodos.value = computed(() => todos.value.filter((todo) => todo.status === "DONE"))

 
  const modal = computed(() => store.state.modal);


</script>



<template>
     <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="w-full sm:flex sm:items-start ">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusCircleIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div class="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Create a new todo</DialogTitle>
                    <div class="min-w-2xl py-6 sm:px-6 lg:px-0 ">
                          <form class="space-y-6 "  @submit.prevent="createTodo">
                              <div class="flex flex-col">
                                  <div class="">
                                    <label for="title" class="font-light text-base text-gray-600">Title</label>
                                    <input id="title" name="title" type="text"  required class="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  v-model="model.title">
                                  </div>
                              
                                  <div class="">
                                    <label for="title" class="font-light text-base text-gray-600">Description</label>
                                    <textarea id="description" name="description" type="text-area" required cols="2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="model.description"></textarea>
                                  </div>
                                  
                                  <div class="">
                                    <label for="title" class="font-light text-base text-gray-600">Due Date</label>
                                    <input id="due_date" name="due_date" type="date" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  v-model="model.due_date">
                                  </div>
                              </div>

                              <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 space-x-2">
                                <button
                                  type="submit"
                                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Create
                                </button>
                                <button
                                  type="button"
                                  class="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-200"
                                  @click="open = false"
                                  ref="cancelButtonRef"
                                >
                                  Cancel
                                </button>
                              </div>
                        </form>
                    </div>
                  </div>
                </div> -
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
    
      <main class="w-full">
        <div class="max-w-sm py-6 sm:px-6 lg:px-0">
          <div  class="">
            <button @click="open = true" class="text-xl bg-blue-500 text-white hover:bg-blue-600 border rounded-md py-2 px-4">
              Add Todo
            </button>
          </div>
          </div>
          <div v-if="todos" class="w-full">
         
         <div class="w-full grid grid-cols-3 gap-6">
            <OpenTodo  :todos="openTodos"/>
            <ProgressTodo :todos="progressTodos"/>
            <DoneTodo  :todos="doneTodos"/>
         </div>     
          </div>
      </main>
 </template>