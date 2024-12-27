<template>
    <header class="header">
        <h1>Transférez de l'argent partout dans le monde</h1>
        <p>Simple, rapide et sécurisé</p>
        <p><RouterLink to="/"><a href="index.html">page d'accueil</a></RouterLink></p>
        
    </header>

    <main class="main">
        <section class="transfer-form">
            <h2>Effectuez un transfert</h2>
            <form action="AUTH.html" method="POST">
                <div class="form-group">
                    <label for="amount">Montant à envoyer</label>
                    <input type="number" id="amount" name="amount" placeholder="Entrez le montant" required>
                </div>
                <div class="form-group">
                    <label for="from-country">Pays de transfert</label>
                    <select id="from-country" name="from-country" required>
                        <option value="France">Togo</option>
                        <option value="France">France</option>
                        <option value="USA">États-Unis</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">Royaume-Uni</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="to-country">Destination</label>
                    <select id="to-country" name="to-country" required>
                        <option value="Morocco">Maroc</option>
                        <option value="Morocco">Togo</option>
                        <option value="Tunisia">Tunisie</option>
                        <option value="Senegal">Sénégal</option>
                        <option value="Philippines">Philippines</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="to-country">Numero recepteur</label>
                    <input type="text" placeholder="suivi du code pays (0022890909090)">
                </div>
                <button type="submit">Envoyer maintenant</button>
            </form>
        </section>

        <section class="popular-destinations">
            <h2>Destinations populaires</h2>
            <div class="destination-cards">
                <div class="card">
                    <img src="/flag_chine.png" alt="Maroc">
                    <p>Chine</p>
                </div>
                <div class="card">
                    <img src="/Flag-USA.jpg" alt="Tunisie">
                    <p>USA</p>
                </div>
                <div class="card">
                    <img src="" alt="Sénégal">
                    <p>Sénégal</p>
                </div>
                <div class="card">
                    <img src="/flag-guinee.png" alt="Philippines">
                    <p>Guinee</p>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Transfert Express. Tous droits réservés.</p>
    </footer>

</template>


<style scoped>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        background: linear-gradient(135deg, #4CAF50, #81C784);
        color: #333;
    }

    /* Header */
    .header {
        text-align: center;
        color: #fff;
        padding: 20px 0;
        background: linear-gradient(135deg, #4CAF50, #2E7D32);
    }

    .header h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
    }

    .header p {
        font-size: 1.2rem;
    }

    /* Main Section */
    .main {
        padding: 30px;
    }

    /* Formulaire de transfert */
    .transfer-form {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin-bottom: 30px;
    }

    .transfer-form h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #4CAF50;
    }

    .transfer-form .form-group {
        margin-bottom: 15px;
    }

    .transfer-form label {
        display: block;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .transfer-form input,
    .transfer-form select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
    }

    .transfer-form button {
        width: 100%;
        padding: 10px;
        background: #4CAF50;
        border: none;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .transfer-form button:hover {
        background: #388E3C;
    }

    /* Destinations populaires */
    .popular-destinations h2 {
        text-align: center;
        color: #fff;
        margin-bottom: 20px;
    }

    .destination-cards {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
    }

    .card {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        padding: 10px;
        width: 150px;
    }

    .card img {
        width: 80px;
        margin-bottom: 10px;
    }

    .card p {
        font-size: 1rem;
        font-weight: 600;
        color: #4CAF50;
    }

    /* Footer */
    .footer {
        text-align: center;
        padding: 10px;
        background: #2E7D32;
        color: #fff;
        font-size: 0.9rem;
    }

    a{
        
        color: white;
    }

    .accueil{
        background-color: #4472466f;
    }

</style>