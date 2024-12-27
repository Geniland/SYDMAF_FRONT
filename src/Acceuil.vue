<template>
    <div class="container-fluid">
      <h1>SYDMAF PROJET</h1>
      <p>Bienvenus</p>
      <button class="btn btn-primary">button </button><br>
      <RouterLink :to="link"><button class="btn btn-primary my-4">Page1 </button></RouterLink><br>
      <RouterLink :to="{name:'page2'}"><button class="btn btn-primary my-4">Page2 </button></RouterLink><br>
      <!----><RouterLink :to="{name:'Authentification'}"><button class="btn btn-primary my-4">Authentification</button></RouterLink><br>
    </div>
    <div class="container">
      <RouterView/>
    </div>
  </template>
  
  <script setup>
    import { ref ,onMounted ,computed} from "vue";
    const nom = ref(25)
    const link = computed(() =>({
      name:'page1',
      params:{id:nom.value}
    }))
  
  </script>