<script setup>
import { computed } from 'vue';
import TodoCard from './TodoCard.vue';


const props = defineProps({
    todos: []
})

const todos = (computed(() => props.todos.value))
</script>
<template>
   
   <div class="flex flex-col gap-3 grow">
        <h1 class="text-center underline">Done</h1>

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