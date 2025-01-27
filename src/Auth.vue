<template>
  <div class="bodyclass">
    <div class="form-container">
      <div class="form-toggle">
        <button @click="authmode('connexion')">Connexion</button>
        <button @click="authmode('inscription')">Inscription</button>
       
      </div>
      <div class="form-content">
        <!-- Formulaire de connexion -->
        <form
          v-if="auth === 'connexion'"
          @submit.prevent="handleLogin"
          class="form"
        >
          <h2>Connexion</h2>
          <input
            type="email"
            v-model="loginData.email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="loginData.password"
            placeholder="Mot de passe"
            required
          />
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button type="submit">Se connecter</button>
          <p>
            Pas encore inscrit ?
            <a href="#" @click="authmode('inscription')">Créer un compte</a>
          </p>
        </form>

        <!-- Formulaire d'inscription -->
        <form
          v-if="auth === 'inscription'"
          @submit.prevent="handleRegister"
          class="form"
        >
          <h2>Inscription</h2>
          <input
            type="text"
            v-model="registerData.name"
            placeholder="Nom complet"
            required
          />
          <input
            type="email"
            v-model="registerData.email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="registerData.password"
            placeholder="Mot de passe"
            required
          />
          <input 
            type="password" 
            v-model="registerData.password_confirmation" 
            placeholder="Confirmez le mot de passe" 
            required
          />
          <input
            type="tel"
            v-model="registerData.phone"
            placeholder="Téléphone"
            required
          />
          <input
            type="text"
            v-model="registerData.secret_code"
            placeholder="Code administrateur (facultatif)"
          />
          <button type="submit">S'inscrire</button>
          <p>
            Déjà un compte ?
            <a href="#" @click="authmode('connexion')">Se connecter</a>
          </p>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Login",
  setup() {
    const router = useRouter();

    const auth = ref("connexion");
    const loginData = ref({ email: "", password: "" });
    const registerData = ref({
    
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      secret_code: ""
  
    });
    const errorMessage = ref("");

    const authmode = (mode) => {
      auth.value = mode;
      errorMessage.value = ""; // Réinitialiser les erreurs lors du changement de mode
      };

      const handleLogin = async () => {
          try {
            const response = await axios.post("http://localhost:8000/api/login", {
              email: loginData.value.email,
              password: loginData.value.password,
            });

            // console.log("Réponse API :", response.data);

            const { message, token, role } = response.data;

            const user = response.data.user;
            // console.log('Rôle de l\'utilisateur :', user.role);

            // Stocker le token
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Redirection en fonction du rôle
            if (user.role === "admin") {
              router.push({ name: "Acceuil" }); // Rediriger vers le tableau de bord admin
            } else if (user.role === "user") {
              router.push({ name: "Acceuil" }); // Rediriger vers le tableau de bord utilisateur
            } else {
              throw new Error("Rôle inconnu !");
            }
          } catch (error) {
            console.error("Erreur API :", error);

            if (error.response) {
              errorMessage.value =
                error.response.data.message || "Détails de connexion invalides.";
            } else if (error.request) {
              errorMessage.value = "Aucune réponse du serveur.";
            } else {
              errorMessage.value = "Une erreur inconnue s'est produite.";
            }
          }
      };



      const handleRegister = async () => {
        try {
          const payload = { ...registerData.value };

          // Vérification pour le rôle admin
          if (payload.secret_code === "ADMIN_SECRET_CODE") {
            payload.role = "admin";
          } else {
            payload.role = "user";
          }
          // delete payload.secretCode; // Ne pas envoyer le code au backend

          await axios.post("http://127.0.0.1:8000/api/register", payload);

          auth.value = "connexion";
        } catch (error) {
          errorMessage.value = "Erreur lors de l'inscription.";
        }
      };

    return {
      auth,
      loginData,
      registerData,
      errorMessage,
      authmode,
      handleLogin,
      handleRegister,
    };
  },
};
</script>



<style scoped>
    .error {
        color: red;
      }

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