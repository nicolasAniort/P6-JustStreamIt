// constante globales
const title_mov = document.querySelector('#bestFilmName');
const img_mov = document.querySelector('#bestFilm_img');
const resume_movie = document.querySelector('#bestFilmDescription'); 
//URL de base de l'API
const url_base = 'http://localhost:8000/api/v1/titles/';
const url_bestfilm = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1';// requete donnant les films classés par score 
const url_suffixe_bestsfilms = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=';
const url_prefixe_genre = 'http://localhost:8000/api/v1/titles/?genre=';
const url_suffixe_genre = '&sort_by=-imdb_score&page_size=7';
//Variables globales
let new_url;

//liste des categories 
let categories =[
    "Comedy",
    "Crime", 
    "Mystery"
] 
//fonction de verification de fonctionnement du serveur de l'url
fetch(url_base)
    .then(res => res.json())
    .catch(error => console.error('il y a eu une erreur...'));

//Fonction de recuperation de la description d'un film donnée
function resumeBestFilm(url){
    let urlBM = url;
    console.log(urlBM);
    return fetch(urlBM)
        .then(res=>res.json())
        .then(data =>{
            const resumedb = data.description;
            return resumedb;
        })     
}
//Fonction de recupération du meilleur Film
async function fetchBestFilm(url) {
  const res = await fetch(url);
  const data = await res.json();

  const title = data.results[0].title;
  const imag = data.results[0].image_url;
  const url_resume = data.results[0].url;

  title_mov.textContent = title;
  img_mov.src = imag;

  try {
    const resume = await resumeBestFilm(url_resume);
    resume_movie.textContent = resume;
  } catch (error) {
    console.error(error);
  }
}
// Generation de l'interface du Meilleur Film toutes catégories  
fetchBestFilm(url_bestfilm);
//fonction de recuperation des meilleurs films
function fetchMovies() {
    for (let film_count = 1; film_count < 8; film_count++) {
      const url_temp = url_suffixe_bestsfilms + (film_count + 1);
      const cpt = film_count;
      fetch(url_temp)
            .then(res =>res.json())
            .then(data => {
                const detailmovie = document.createElement('a');
                const title = data.results[cpt].title;
                const url_resume = data.results[cpt].url;
                const imag = data.results[cpt].image_url;
                const movie = document.createElement('img');
                let boutons = document.createElement('button');
                 // Ajout des classes "slide" et "movie" à chaque élément
                detailmovie.classList.add('slide');
                movie.classList.add('movie');
                slider.appendChild(detailmovie);
                var ident = data.results[film_count].id;
                detailmovie.appendChild(movie);
                boutons.id = ident;
                boutons.classList.add("modal-trigger");
                boutons.type ="button";
                boutons.textContent = '+';
                boutons.addEventListener("click", function(id) {
                  // Déclarez et initialisez la variable modal
                  var modal = document.querySelector(".modal-close"); 
                  modal.className ="modal";
                  ModalWindows(id);
                  modalContainer.classList.add('active'); // ligne pour afficher la modale
                });
                detailmovie.appendChild(boutons);
                movie.alt = 'affiche du film:' + data.results[film_count].title;
                movie.src = data.results[film_count].image_url;
                movie.classList.add('movie');
            })
    }
  } 
//Generation de l'interface des meilleurs films toutes categories
const moviescontain = document.querySelector('#moviescontain')
let slidercontainer = document.createElement('div');
let slider = document.createElement('div');
moviescontain.classList.add('slider-1');

//creation du bloc contenant le bloc listant les films
slidercontainer.classList.add('slider-container');
moviescontain.appendChild(slidercontainer);

//creation du bloc contenant les films
slider.classList.add('slider');
slidercontainer.appendChild(slider);  
fetchMovies();
 
//Creation des 3 blocs et leur contenus
function fetchCategories() {

  categories.forEach((categorie)=>{
    
    let i=1
    let url_temps = url_prefixe_genre + categorie+ url_suffixe_genre
    let boxslide = document.querySelector('#slidebox'+(i));
    let title_bestfilms = document.createElement('h1');
    let slider = document.createElement('div');
    let slidercontainer = document.createElement('div');   
    //ajouter un titre au bloc
    title_bestfilms.classList.add('bestFilms');
    title_bestfilms.textContent = 'Les 7 meilleurs films de la catégorie: '+categorie;
    boxslide.appendChild(title_bestfilms);
    boxslide.classList.add('slider-1');
    boxslide.style.border = 'none';
    slidercontainer.classList.add('slider-container');
    boxslide.appendChild(slidercontainer);
    slider.classList.add('slider');
    slidercontainer.appendChild(slider);
    //Boucle de recuperation des informations pour chaque film
        let url_temp = url_temps;
        fetch(url_temp)
        .then(res =>res.json())
        .then(data => {
          for(movies_cpt=0;movies_cpt<7;movies_cpt++){
                    let detailmovie = document.createElement('a');
                    let movie_pic = document.createElement('img');
                    movie_pic.classList.add("movie", movies_cpt+"movie_pic");
                    let bouton = document.createElement('button');
                    slider.appendChild(detailmovie);
                    var id = data.results[movies_cpt].id;
                    detailmovie.appendChild(movie_pic);
                    bouton.id = id
                    bouton.classList.add("modal-trigger");
                    bouton.type ="button";
                    bouton.textContent = '+';
                    bouton.addEventListener("click", function(id) {
                      // Déclarez et initialisez la variable modal
                      var modal = document.querySelector(".modal-close"); 
                      modal.className ="modal";
                      ModalWindows(id);
                      modalContainer.classList.add('active'); // ligne pour afficher la modale
                    });
                    detailmovie.appendChild(bouton);
                    movie_pic.alt = 'affiche du film:' + data.results[movies_cpt].title;
                    movie_pic.src = data.results[movies_cpt].image_url;
                  }
                })
                  i=i+1;
                })
                
}
fetchCategories()
// SLIDER:Fonction de défilement latéral
function scrollSlider(box, direction) {
  const slider = box.querySelector('.slider');
  const scrollAmount = direction === 'left' ? -slider.offsetWidth : slider.offsetWidth;
  slider.scrollBy({
    top: 0,
    left: scrollAmount,
    behavior: 'smooth'
  });
}
// SLIDER :Ajout des flèches de défilement aux slidebox
const slideBoxes = document.querySelectorAll('.slider-container');
slideBoxes.forEach(box => {
  const arrowLeft = document.createElement('div');
  arrowLeft.classList.add('slider-arrow', 'arrow-left');
  arrowLeft.style.backgroundImage = "url('./img/a-left.png')"; 
  arrowLeft.addEventListener('click', () => scrollSlider(box, 'left'));
  box.appendChild(arrowLeft);

  const arrowRight = document.createElement('div');
  arrowRight.classList.add('slider-arrow', 'arrow-right');
  arrowRight.style.backgroundImage = "url('./img/a-right.png')";
  arrowRight.addEventListener('click', () => scrollSlider(box, 'right'));
  box.appendChild(arrowRight);
});
// MODALE:Ajout de l'événement de clic au bouton "Plus"
const moreButtons = document.querySelectorAll('.modal-btn');
moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const movieURL = button.parentNode.getAttribute('href');
    ModalWindows(movieURL);
  });
});
//MODALE: fermeture de la fenetre modale par bouton X
// Cibler l'élément ou le bouton de fermeture de la fenêtre modale
const closeModalButton = document.getElementById('modal_close_button');
// Ajouter un gestionnaire d'événements pour l'événement de clic
closeModalButton.addEventListener('click', function() {
  var modal = document.querySelector(".modal");
  // Modifier la propriété display pour masquer la fenêtre modale
  modal.className ="modal-close";
});
//MODALE:Propriété fenetre modale
const modalContainer = document.querySelector('#modal_movie', '.modal-container');
const modalTriggers = document.querySelectorAll('.modal-trigger');

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));

function toggleModal (event) {
//MODALE: Pour afficher la modal
  modalContainer.classList.add('active');  
  modalContainer.classList.toggle('active');
}
//MODALE:creation de la fenetre modale d'un film 
function ModalWindows(id){
  if (typeof(id) === "object") {
    id = id.target.id;
  }
  let url_film = "http://localhost:8000/api/v1/titles/"+id
  fetch(url_film)
      .then(res =>res.json())
      .then(data => {
          //creation des variables de champs
          let modaltitle = document.querySelector('#headerModal_Title_originalTitle');
          let _title = document.querySelector('#headerModal__originalTitle');
          let _filmImage = document.querySelector('#headerModal__filmImage');
          let _genres = document.querySelector('#infoModalText__genres');
          let _publishdate = document.querySelector('#infoModalText__datePublished');
          let _rated = document.querySelector('#infoModalText__rated');
          let _imdbScore = document.querySelector('#infoModalText__imdbScore');
          let _directors = document.querySelector('#infoModalText__directors');
          let _actors = document.querySelector('#infoModalText__actors');
          let _duration = document.querySelector('#infoModalText__duration');
          let _countries = document.querySelector('#infoModalText__countries');
          let _resume = document.querySelector('#infoModalText__longDescription');
          //alimentation des variables de champs
          modaltitle.textContent = data.title;
          _title.textContent = data.title;
          _filmImage.src = data.image_url;
          _genres.textContent = data.genres;
          _publishdate.textContent = data.date_published;
          _rated.textContent = data.rated;
          _imdbScore.textContent = data.imdb_score;
          _directors.textContent = data.directors;
          _actors.textContent = data.actors;
          _duration.textContent = data.duration;
          _countries.textContent = data.countries;
          _resume.textContent = data.long_description;
        } )                   
}
