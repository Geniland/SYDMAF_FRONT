<template>
    <div class="bodyclass">
        <div class="form-container">
            <div class="form-toggle">
                <button id="btn-login" @click="authmode('connexion')">Conexion</button>
                <button id="btn-register" @click="authmode('inscription')">Inscription</button>
            </div>
            <div class="form-content">
                <!-- Formulaire de connexion -->
                <form v-if="auth=='connexion'" id="login-form" class="form active" >
                    <h2>Conexion</h2>
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Mot de passe" required>
                    <button type="submit">Se connecter</button>
                    <p>Pas encore inscrit ? <a href="#" @click="authmode('inscription')">Créer un compte</a></p>
                    <p>retour Page<RouterLink to="/"> <a> d'accueil</a></RouterLink></p>

                </form>

                <!-- Formulaire d'inscription -->
                <form v-if="auth=='inscription'" id="register-form" class="form" onsubmit="return false">
                    <h2>Inscription</h2>
                    <input type="text" placeholder="Nom complet" required>
                    <input type="email" placeholder="Email" required>
                    <input type="password" class="inputpass" placeholder="Mot de passe" required>
                    <div class="telparent">
                        <input type="tel" class="inputel" placeholder="telephone" required>
                        <div class=" absolut"></div>
                        <div class="dropdown dropup dropabsolut">
                            <div class=" d-flex minput"  type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" aria-expanded="false">
                                <img :src=pys.flag alt=""   height="32px" width="40px">
                                <p>{{ pys.phone_code }}</p>
                            </div>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <input type="text" v-model="inputcherche" class="form-control mb-2 mx-auto" placeholder="Rechercher..." style="width: 90%;"/>
                                <div id="dropdownItems" class="ps-0 dropdiv">
                                    <ul class=" g-3 " style=" padding: 0;">
                                        <li v-for="i in cherchepays " class="dropdown-item ps-1" @click="payschoisie(i)" style="height: 38px">
                                            <div class=" d-flex ms-0" style="height: 35px ;" >  
                                                <img class="ps-2 my-1" :src="i.flag" alt="drapeau" height="30px">
                                                <p  class=" ms-1 pt-1 " style="text-align: center ; width: 150px; " >{{i.name }}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="identite">
                        <h6>enter la photo de votre piece d'identité</h6>
                        <div>
                            <label for="inputrecto" ><img class="img-fluid" :src="carte_recto" alt="recto" id="imgrecto"></label>
                            <input type="file" v-on:change="cange_recto()" id="inputrecto"  accept="image/png,image/jpg,image/jpeg" required>
                            <label for="inputverso" ><img class="img-fluid" :src="carte_verso" alt="verso" id="imgverso"></label>
                            <input type="file" src="" v-on:change="cange_verso()" id="inputverso" accept="image/png,image/jpg,image/jpeg" required>
                        </div>
                    </div>
                    <button type="submit">S'inscrire</button>
                    <p>Déjà un compte ? <a href="#" @click="authmode('connexion')">Se connecter</a></p>
                    <p>retour Page<RouterLink to="/"> <a> d'accueil</a></RouterLink></p>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { ref ,onMounted ,computed} from "vue";
    import axios from 'axios';
    const apiUrl = "https://restcountries.com/v3.1/all";
    const countries = ref('hummm')
    const countryList = ref('')
    const pys =ref({ "name": "Afghanistan", "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg", "phone_code": "+93" })
    const carte_recto = ref('/identitérecto.png')
    const carte_verso = ref('/identitéverso.png')
    const inputcherche = ref('')

    
    

    const  auth = ref('connexion')
    // Fonction d'affichage de la page de connexion\inscription
    const authmode = (page) =>{
            auth.value = page
    }

    // Recuperation de la list des pays
    const recuperation =()=>{
        axios.get(apiUrl)
        .then(response =>{
            countries.value = response.data;
            countryList.value = countries.value.map(country => ({ 
                name: country.name.common, 
                flag: country.flags.svg, 
                phone_code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') 
            }));
            countryList.value.sort((a,b)=>
                a.name.localeCompare(b.name));
            console.log(countryList.value)
               
        }).catch(erro =>{
            console.error("Erreur lors de la récupération des données :", error); 
            countries.value = ref('malleur')
        });
    }
    recuperation()
    // Gestion de carte d'identité
        const cange_verso=()=>{
            const imageverso = ref(document.getElementById('inputverso'))
            carte_verso.value=URL.createObjectURL(imageverso.value.files[0])
        }
        const cange_recto=()=>{
            const imagerecto = ref(document.getElementById('inputrecto'))
            carte_recto.value=URL.createObjectURL(imagerecto.value.files[0])
        }
        // Rechercher de pays
    const cherchepays = computed(()=>{
        if (inputcherche.value ==''){
            return countryList.value
        }else{
            return  countryList.value.filter(item =>item.name.toLocaleLowerCase().
                includes(inputcherche.value.toLocaleLowerCase()))}
    })
    const payschoisie = (i) =>{
        pys.value = i
        inputcherche.value = ''
    }
    
</script>

<style scoped>
    .bodyclass {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #4CAF50, #81C784);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #fff;
    }

    /* Conteneur principal */
    .form-container {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        width: 350px;
        max-width: 100%;
        overflow: hidden;
        /*max-height: 98%;*/
    }

    /* Toggle entre connexion et inscription */
    .form-toggle {
        display: flex;
        justify-content: center;
        background: #4CAF50;
    }

    .form-toggle button {
        flex: 1;
        padding: 15px;
        border: none;
        background: transparent;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .form-toggle button:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    /* Contenu des formulaires */
    .form-content {
        padding: 20px;
    }
    /* padding: 30px */

    /* Formulaires
    .form {
        display: none;
        text-align: center;
    } */

    .form.active {
        display: block;
    }

    .form h2 {
        color: #333;
        margin-bottom: 20px;
    }

    .form input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        
    }



    .form button {
        width: 100%;
        padding: 10px;
        background: #4CAF50;
        border: none;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .form button:hover {
        background: #45A049;
    }

    .form p {
        color: #666;
        font-size: 14px;
        margin-top: 10px;
    }

    .form a {
        color: #4CAF50;
        text-decoration: none;
        font-weight: bold;
    }

    .form a:hover {
        text-decoration: underline;
    }

    .telparent{
        position: relative;
    }
    .dropabsolut{
        position: absolute;
        bottom: 10px;
        left: 3px;
    }
    .telparent .inputel{
        padding-left: 90px;
    }
    .dropdiv{
        max-height:250px; 
        width: 250px;
        overflow-y: scroll ;
        overflow-x:hidden;
    }
    .dropup{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dropup img{
        margin-top: 3px;
    }
  
    /* pièce d'identié */
    .identite h6{
        color: #000;
    }
    .identite div{
        display: flex;
        justify-content:space-around;
        padding-bottom: 10px;
    }
    .identite label{
        height: 60px;
        width: 100px;
        margin-bottom: 5px;
        color: #00000093;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .identite label img {
        height: 60px;
        width: 100px;
        border-radius: 5px;

    }

    .identite input{
        display: none;
    }





</style>