<template>
    <body class="index-page">

        <header id="header" class="header d-flex align-items-center fixed-top bg-succes" >
            <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

                <a href="index.html" class=" d-flex align-items-center">
                <!-- Uncomment the line below if you also wish to use an image logo -->
                <!-- <img src="assets/img/logo.png" alt=""> -->
                <img src="/lg.png" alt="logo" height="80">
                </a>

                <nav id="navmenu" class="navmenu">
                <ul>
                    <li><a href="#hero" class="active">Accueil</a></li>
                    <li><a href="#about">A propos</a></li>
                    <!-- <li><a href="#features">Features</a></li> -->
                    <li> <RouterLink  :to="{name:'Boutique'}"> <a >Boutique</a></RouterLink></li>
                    <li> <RouterLink  :to="{name:'Transfert'}"> <a>Transfert</a></RouterLink></li>
                    <li> <RouterLink  :to="{name:'Pannier'}"> <a>Panier</a></RouterLink></li>
                   
                    <li v-if="user && user.role === 'admin'">
                    <RouterLink :to="{ name: 'Dashboard' }"><a>Dashboard</a></RouterLink>
                    </li>
                    <!-- <li><a href="#team">Team</a></li> -->
                    <li><a href="#contact">Contact</a></li>
                    <!-- <li><a href="#pricing">Pricing</a></li> -->
                    <li class="dropdown"><a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                        <p class="NomUtilisateur">
                            Mr/Mrs ,<strong >{{ userName() }}</strong>
                        </p>
                        <li> <RouterLink  :to="{name:'Authentification'}"> <a >Inscription</a></RouterLink></li>
                        <li> <RouterLink  :to="{name:'Authentification'}"> <a >Connexion</a></RouterLink></li>
                        <li v-if="isAuthenticated">
                            <button @click="handleLogout">Déconnexion</button>
                        </li>
                
                    </ul>
                    </li>
                    <!-- Icône de panier -->
                    <!-- <li>
                        <RouterLink :to="{ name: 'Pannier' }">
                        <i class="fa fa-shopping-cart"></i>
                        <span class="badge">{{ cartItems.length }}</span>
                        </RouterLink>
                    </li> -->
                    
                </ul>
                <!--<i class="mobile-nav-toggle d-xl-none bi bi-list"></i>-->
                <div class="btn-group dropstart d-xl-none ">
                    <!--<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropstart
                    </button>-->
                    <i class="mobile-nav-toggle d-xl-none bi bi-list btn  " data-bs-toggle="dropdown" aria-expanded="false" type="button"></i>
                    <ul class="dropdown-menu">
                        <li class="ms-3"><a href="#hero" class="active">Accueil</a></li>
                        <li class="ms-3"><a href="#about">A propos</a></li>
                        <li> <RouterLink :to="{name:'Boutique'}"> <a>Boutique</a></RouterLink></li>
                        <li><RouterLink :to="{name:'Transfert'}"> <a>Transfert</a></RouterLink></li>
                        <li class="ms-3"><a href="#contact">Contact</a></li>
                        <li><RouterLink :to="{name:'Authentification'}"> <a>Authentification</a></RouterLink></li>
                    </ul>
                </div>
                </nav>

            </div>
        </header>

        <main class="main">

        <!-- Hero Section -->
            <section id="hero" class="hero section dark-background">
                <img src="./assets/img/hero-bg-2.jpg" alt="" class="hero-bg">

                <div class="container">
                <div class="row gy-4 justify-content-between">
                    <div class="col-lg-4 order-lg-last hero-img" data-aos="zoom-out" data-aos-delay="100">
                    <img src="/illustration.png" class="img-fluid animated" alt="">
                    </div>

                    <div class="col-lg-6  d-flex flex-column justify-content-center" data-aos="fade-in">
                    <h1>Transfert partout dans le monde <span>SYDMAF</span></h1>
                    <p>Un systeme simple et effcace</p>
                    <div class="d-flex">
                        <a href="#about" class="btn-get-started">Get Started</a>
                        <a href="Lien de la video" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
                    </div>
                    </div>

                </div>
                </div>

            

                

                <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                <defs>
                    <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                </defs>
                <g class="wave1">
                    <use xlink:href="#wave-path" x="50" y="3"></use>
                </g>
                <g class="wave2">
                    <use xlink:href="#wave-path" x="50" y="0"></use>
                </g>
                <g class="wave3">
                    <use xlink:href="#wave-path" x="50" y="9"></use>
                </g>
                </svg>

            </section><!-- /Hero Section -->

            <!-- About Section -->
            <section id="about" class="about section">

                <div class="container" data-aos="fade-up" data-aos-delay="100">
                <div class="row align-items-xl-center gy-5">

                    <div class="col-xl-5 content">
                    <h3>A propos</h3>
                    <h2>Sydmaf une plateforme d'echange</h2>
                    <p>Ipsa sint sit. Quis ducimus tempore dolores impedit et dolor cumque alias maxime. Enim reiciendis minus et rerum hic non. Dicta quas cum quia maiores iure. Quidem nulla qui assumenda incidunt voluptatem tempora deleniti soluta.</p>
                    <a href="#" class="read-more"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
                    </div>

                    <div class="col-xl-7">
                    <div class="row gy-4 icon-boxes">

                        <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="icon-box">
                            <i class="bi bi-buildings"></i>
                            <h3>Boutique en ligne</h3>
                            <p>Magni repellendus vel ullam hic officia accusantium ipsa dolor omnis dolor voluptatem</p>
                        </div>
                        </div> <!-- End Icon Box -->

                        <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div class="icon-box">
                            <i class="bi bi-clipboard-pulse"></i>
                            <h3>Vente et achat de Cryptomonnaie</h3>
                            <p>Autem saepe animi et aut aspernatur culpa facere. Rerum saepe rerum voluptates quia</p>
                        </div>
                        </div> <!-- End Icon Box -->

                        <div class="col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div class="icon-box">
                            <i class="bi bi-currency-exchange"></i>
                            <h3>Transfert d'argent</h3>
                            <p>Omnis perferendis molestias culpa sed. Recusandae quas possimus. Quod consequatur corrupti</p>
                        </div>
                        </div> <!-- End Icon Box -->

                        <div class="col-md-6" data-aos="fade-up" data-aos-delay="500">
                        <div class="icon-box">
                            <i class="bi bi-graph-up-arrow"></i>
                            <h3>Portefeuille interne</h3>
                            <p>Sint et dolor voluptas minus possimus nostrum. Reiciendis commodi eligendi omnis quideme lorenda</p>
                        </div>
                        </div> <!-- End Icon Box -->

                    </div>

                    </div>

                    <!-- detail de transfert --------------------->
                    <div class="container detail">
                        <div class="col col-16">
                            <p><h4 class="font-header-h4 font-weight-normal pad-xs-bm">Envoyer de l’argent à l’étranger depuis la France</h4></p>
                        </div>
                
                        <div class="row">
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                    <img src="/flag-guinee.png" alt="Maroc" class="flag-icon">
                                    </div>
                                    <span><strong>Guinee bissau</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                        <i class="wu-flag tn wu-flagSize--S"></i>
                                    </div>
                                    <span><strong>Tunisie</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                        <i class="wu-flag fr wu-flagSize--S"></i>
                                    </div>
                                    <span><strong>France</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                        <i class="wu-flag sn wu-flagSize--S"></i>
                                    </div>
                                    <span><strong>Sénégal</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                    <img src="/Flag-USA.jpg" alt="Maroc" class="flag-icon">
                                    </div>
                                    <span><strong>États-Unis</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                        <i class="wu-flag ph wu-flagSize--S"></i>
                                    </div>
                                    <span><strong>Philippines</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                    <img src="/flag_chine.png" alt="Maroc" class="flag-icon">
                                    </div>
                                    <span><strong>Chine</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                            <div class="col col-16 col-L-4 col-M-8">
                                <a href="#" class="country-button">
                                    <div class="flag-icon">
                                    <img src="/flag_Afrique.png" alt="Maroc" class="flag-icon">
                                    </div>
                                    <span><strong>Afrique</strong></span>
                                    <span class="icon-chevron"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            </section><!-- /About Section -->

            <!-- Features Section -->
            <!-- Portfolio Section -->
            <section id="portfolio" class="portfolio section">

                <!-- Section Title -->
                <div class="container section-title" data-aos="fade-up">
                <h2>Boutique</h2>
                <p>Extrait de nos produits</p>
                </div><!-- End Section Title -->

                <div class="container">

                <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                    <ul class="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                    <li data-filter="*" class="filter-active">TOUT</li>
                    <!-- <li data-filter=".filter-app">Tout</li> -->
                    <!-- <li data-filter=".filter-product">Electroniques</li> -->
                    <!-- <li data-filter=".filter-branding">Accessoires</li> -->
                    </ul><!-- End Portfolio Filters -->

                    <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <img src="./assets/img/Produit/controlleur.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>Controlleur</p>
                        <a href="./assets/img/Produit/controlleur.jpg" title="" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <!--<a href="Boutique.html" title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a>-->
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <img src="./assets/img/Produit/reglette.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>Reglette</p>
                        <a href="./assets/img/Produit/reglette.jpg" title="" data-gallery="portfolio-gallery-product" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                        <img src="/refrigirateur.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>Refrigirateur</p>
                        <a href="refrigirateur.jpg" title="" data-gallery="portfolio-gallery-branding" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <img src="/pompe_solaire.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>Pompe solaire</p>
                        <a href="/pompe_solaire.jpg" title="" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <img src="./assets/img/Produit/ampoule5W.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>ampoule 5W</p>
                        <a href="./assets/img/Produit/ampoule5W.jpg" title="" data-gallery="portfolio-gallery-product" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                        <img src="./assets/img/Produit/lampadaire_750.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>lampadaire 750</p>
                        <a href="./assets/img/Produit/lampadaire_750.jpg" title="" data-gallery="portfolio-gallery-branding" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                        <img src="./assets/img/Produit/ampouleTubeLed.jpg" class="img-fluid" alt="">
                        <div class="portfolio-info">
                        <h4>Disponible en gros et details</h4>
                        <p>ampouleTubeLed</p>
                        <a href="./assets/img/Produit/ampouleTubeLed.jpg" title="" data-gallery="portfolio-gallery-branding" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                        <RouterLink :to="{name: 'Boutique'}"><a  title="Commandez" class="details-link"><i class="bi bi-link-45deg"></i></a></RouterLink>
                        </div>
                    </div>

                    </div>

                </div>

                </div>

            </section><!-- /Portfolio Section -->
            

            <!-- Stats Section -->
            <section id="stats" class="stats section light-background">

                <div class="container" data-aos="fade-up" data-aos-delay="100">

                <div class="row gy-4">

                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center">
                    <i class="bi bi-emoji-smile"></i>
                    <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Client satisfait</p>
                    </div>
                    </div><!-- End Stats Item -->

                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center">
                    <i class="bi bi-journal-richtext"></i>
                    <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Projects</p>
                    </div>
                    </div><!-- End Stats Item -->

                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center">
                    <i class="bi bi-headset"></i>
                    <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Temps d accompagnement</p>
                    </div>
                    </div><!-- End Stats Item -->

                    

                </div>

                </div>

            </section><!-- /Stats Section -->

            <div class="container">
                <h1>Les raison pour lesquelles ils nous ont choisi</h1>

                <section class="feature">
                    <div class="icon">
                        <img src="https://img.icons8.com/ios-filled/50/000000/online-payment.png" alt="Simplicité">
                    </div>
                    <div class="text">
                        <h2>Simplicité et commodité</h2>
                        <p>Effectuez un transfert d’argent de la manière qui vous convient le mieux : en ligne, via notre application, ou encore en personne dans l’un de nos points de vente.</p>
                    </div>
                </section>

                <section class="feature">
                    <div class="icon">
                        <img src="https://img.icons8.com/ios-filled/50/000000/lock.png" alt="Sécurité">
                    </div>
                    <div class="text">
                        <h2>Engagement pour la sécurité</h2>
                        <p>Les mesures que nous prenons en matière de cryptage des données et de prévention des fraudes contribuent à protéger vos transferts d’argent internationaux effectués avec Western Union.</p>
                    </div>
                </section>

                <section class="feature">
                    <div class="icon">
                        <img src="https://img.icons8.com/ios-filled/50/000000/worldwide-location.png" alt="Présence mondiale">
                    </div>
                    <div class="text">
                        <h2>Présence mondiale</h2>
                        <p>Notre réseau nous permet d’opérer des transferts d’argent vers plus de 200 pays et territoires.</p>
                    </div>
                </section>

                <section class="feature">
                    <div class="icon">
                        <img src="https://img.icons8.com/ios-filled/50/000000/refresh.png" alt="Renvoi facile">
                    </div>
                    <div class="text">
                        <h2>Renvoi facile</h2>
                        <p>Notre fonction de renvoi en un seul clic vous permet de répéter rapidement et facilement un transfert d’argent à un proche.</p>
                    </div>
                </section>
            </div>

            


            <!-- Pricing Section -->
            <section id="pricing" class="pricing section">

                <!-- Section Title -->
                <div class="container section-title" data-aos="fade-up">
                <h2>Plan architecturaux</h2>
                <div><span>Nos</span> <span class="description-title">Plans</span></div>
                </div><!-- End Section Title -->

                <div class="container">

                <div class="row gy-4">

                    <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                    <div class="pricing-item">
                        <h3>Plan standard</h3>
                        <p class="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
                        <h4><sup>$</sup>0<span> / month</span></h4>
                        <a href="#" class="cta-btn">Start a free trial</a>
                        <p class="text-center small">No credit card required</p>
                        <ul>
                        <li><i class="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                        <li><i class="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                        <li><i class="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                        <li class="na"><i class="bi bi-x"></i> <span>Pharetra massa massa ultricies</span></li>
                        <li class="na"><i class="bi bi-x"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                        <li class="na"><i class="bi bi-x"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                        <li class="na"><i class="bi bi-x"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
                        </ul>
                    </div>
                    </div><!-- End Pricing Item -->

                    <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                    <div class="pricing-item featured">
                        <p class="popular">Plus solicité</p>
                        <h3>Plan intermediaire</h3>
                        <p class="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
                        <h4><sup>$</sup>29<span> / month</span></h4>
                        <a href="#" class="cta-btn">Start a free trial</a>
                        <p class="text-center small">No credit card required</p>
                        <ul>
                        <li><i class="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                        <li><i class="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                        <li><i class="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                        <li><i class="bi bi-check"></i> <span>Pharetra massa massa ultricies</span></li>
                        <li><i class="bi bi-check"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                        <li><i class="bi bi-check"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                        <li class="na"><i class="bi bi-x"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
                        </ul>
                    </div>
                    </div><!-- End Pricing Item -->

                    <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                    <div class="pricing-item">
                        <h3>Plan avancer</h3>
                        <p class="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
                        <h4><sup>$</sup>49<span> / month</span></h4>
                        <a href="#" class="cta-btn">Start a free trial</a>
                        <p class="text-center small">No credit card required</p>
                        <ul>
                        <li><i class="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                        <li><i class="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                        <li><i class="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                        <li><i class="bi bi-check"></i> <span>Pharetra massa massa ultricies</span></li>
                        <li><i class="bi bi-check"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                        <li><i class="bi bi-check"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                        <li><i class="bi bi-check"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
                        </ul>
                    </div>
                    </div><!-- End Pricing Item -->

                </div>

                </div>

            </section><!-- /Pricing Section -->



            <!-- Contact Section -->
            <section id="contact" class="contact section ">

                <!-- Section Title -->
                <div class="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <div><span>Check Our</span> <span class="description-title">Contact</span></div>
                </div><!-- End Section Title -->

                <div class="container" data-aos="fade" data-aos-delay="100">

                <div class="row gy-4">

                    

                    <div class="col-lg-8">
                    <form action="forms/contact.php" method="post" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
                        <div class="row gy-4">

                        <div class="col-md-6">
                            <input type="text" name="name" class="form-control" placeholder="Your Name" required>
                        </div>

                        <div class="col-md-6 ">
                            <input type="email" class="form-control" name="email" placeholder="Your Email" required>
                        </div>

                        <div class="col-md-12">
                            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>

                        <div class="col-md-12">
                            <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                        </div>

                        <div class="col-md-12 text-center">
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message">Your message has been sent. Thank you!</div>

                            <button type="submit">Send Message</button>
                        </div>

                        </div>
                    </form>
                    </div><!-- End Contact Form -->

                    <div class="col-lg-4">
                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                        <i class="bi bi-geo-alt flex-shrink-0"></i>
                        <div>
                        <h3>Address</h3>
                        <p>Lome-Togo</p>
                        </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                        <i class="bi bi-telephone flex-shrink-0"></i>
                        <div>
                        <h3>Call Us</h3>
                        <p>+228 91404949</p>
                        </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                        <i class="bi bi-envelope flex-shrink-0"></i>
                        <div>
                        <h3>Email Us</h3>
                        <p>info@sydmaf.com</p>
                        </div>
                    </div><!-- End Info Item -->

                    </div>

                </div>

                </div>

            </section><!-- /Contact Section -->

        </main>

        <footer id="footer" class="footer dark-background">

        <div class="container footer-top">
            <div class="row gy-12">
            <div class="footer-about">
                <a href="index.html" class="logo d-flex align-items-center text-center">
                <span class="sitename">SYDMAF</span>
                </a>
            
                <div class="social-links d-flex mt-4">
                <a href=""><i class="bi bi-twitter-x"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
            </div>

            </div>
        </div>

        <div class="container copyright text-center mt-4">
            <div class="#">
            Designed by <a href="#">Geni_codex</a> 
            </div>
        </div>

        </footer>

        <!-- Scroll Top -->
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

        <!-- Preloader 
        <div id="preloader"></div>-->
    
</body>


</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Index",
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false); // Statut d'authentification
    const errorMessage = ref(""); // Message d'erreur
    const user = ref(null); // Données utilisateur

    // Vérifie si un utilisateur est connecté
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      isAuthenticated.value = !!userData; // true si userData existe
    };

    // Récupère les données utilisateur depuis le localStorage
    const fetchUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        user.value = JSON.parse(userData);
      }
    };

    // Renvoie le nom de l'utilisateur ou "Invité" par défaut
    const userName = () => {
      return user.value ? user.value.name : "Invité";
    };

    // Déconnexion de l'utilisateur
    const handleLogout = async () => {
      try {
        // Appel à l'API pour déconnecter l'utilisateur
        await axios.post("http://127.0.0.1:8000/api/logout");

        // Suppression des données utilisateur
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Réinitialisation de l'authentification
        axios.defaults.headers.common["Authorization"] = "";
        isAuthenticated.value = false;
        user.value = null;

        // Redirection vers la page d'accueil
        router.push({ name: "Acceuil" });
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        errorMessage.value =
          error.response?.data?.message || "Une erreur s'est produite.";
      }
    };

    // Appeler fetchUser et checkAuth lors du montage
    onMounted(() => {
      fetchUser();
      checkAuth();
    });

    return {
      user,
      isAuthenticated,
      errorMessage,
      handleLogout,
      userName, // Expose userName pour affichage dans le template
    };
  },
};
</script>


<style scoped>

    /* .fa-shopping-cart {
    font-size: 1.5rem;
    color: #4caf50; 
    }
    .badge {
    background-color: red;
    color: white;
    font-size: 0.8rem;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    position: relative;
    top: -10px;
    left: -5px;
    } */

    .NomUtilisateur{
        color: #1a7c1e;
    }

    .detail{
        width: 100%;
        margin: 10px ;
        margin-top: 10%;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    }

    .feature {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 6px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .feature:last-child {
        margin-bottom: 0;
    }

    .feature .icon {
        flex: 0 0 60px;
        height: 60px;
        margin-right: 20px;
    }

    .feature .icon img {
        width: 100%;
        height: 100%;
    }

    .feature .text {
        flex: 1;
    }

    .feature h2 {
        font-size: 1.4rem;
        color: #003366;
        margin-bottom: 10px;
    }

    .feature p {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
    }

    @media (max-width: 768px) {
        .container {
            width: 90%;
        }

        .feature {
            flex-direction: column;
            align-items: flex-start;
        }

        .feature .icon {
            margin-bottom: 15px;
        }
    }

    /* Bouton de pays */
    .country-button {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 8px;
        text-decoration: none;
        color: #333;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .country-button:hover {
        background-color: #f0f0f0;
        transform: translateY(-5px);
    }

    .flag-icon {
        width: 30px;
        height: 30px;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }

    .country-button span {
        font-size: 1rem;
        font-weight: normal;
    }

    .icon-chevron {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
    }

    /* Responsivité */
    @media (max-width: 768px) {
        .col {
            flex: 1 1 100%;
        }
    }

</style>