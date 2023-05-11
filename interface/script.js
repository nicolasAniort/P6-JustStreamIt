// constante globales
const id_mov = document.getElementById('id');
const title_mov = document.getElementById('bestFilmName');
const img_mov = document.getElementById('bestFilm_img');
const resume_movie = document.getElementById('bestFilmDescription'); 
//URL de base de l'API
const url_base = 'http://localhost:8000/api/v1/titles/';
const url_bestfilm = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1';// requete donnant les films classés par score 
const url_suffixe_bestsfilms = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=';
const url_prefixe_genre = 'http://localhost:8000/api/v1/titles/?genre=';
const url_suffixe_genre = '&sort_by=-imdb_score&page_size=7';
//Variables globales
let new_url;


//definition d'un objet moviedetails
class moviedetails {
    constructor(url){
    this.image_url = "image_url" ,
    this.title = "title" ,
    this.genres = "genres" ,
    this.date_published = "date-published",
    this.votes = "votes", 
    this.imbd_score = "imbd_score" , 
    this.directors = "directors" ,
    this.actors = "actors",
    this.duration = "duration",
    this.countries = "countries" ,
    this.avg_vote = "avg_vote",
    this.description = "description"
    }
}
//liste des categories 
let categories =[
    "Comedy",
    "Crime", 
    "Mystery"
] 
//fonction de verification de fonctionnement du serveur/de l'url
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
//fonction de recuperation des meilleurs films
async function fetchMovies() {
    for (let film_count = 1; film_count < 8; film_count++) {
      const url_temp = url_suffixe_bestsfilms + (film_count + 1);
      const cpt = film_count;
      const res = await fetch(url_temp);
      const data = await res.json();
      const detailmovie = document.createElement('a');
      const title = data.results[cpt].title;
      const url_resume = data.results[cpt].url;
      const imag = data.results[cpt].image_url;
      const movie = document.createElement('img');

      slider.appendChild(detailmovie);
      detailmovie.appendChild(movie);
      movie.classList.add('movie');
      detailmovie.setAttribute('href', url_resume);
      movie.alt = 'affiche du film:' + title;
      movie.src = imag;
    }
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
  
     //const bckg_best_film = document.querySelector('.imgBestFilm');
     //bckg_best_film.style.backgroundImage = `url(${imag})`;
     //bckg_best_film.style.backgroundSize = 'cover';
  }
// Generation de l'interface du Meilleur Film toutes catégories  
  fetchBestFilm(url_bestfilm);
  
//Generation de l'interface des meilleurs films toutes categories
//const moviescontain = document.getElementById('moviescontain');
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
for(i=0; i<3; i++){
    //creation des variable de boucle
    let url_temps = url_prefixe_genre + categories[i]+ url_suffixe_genre
    let boxslide = document.getElementById('slidebox'+(i+1));
    let title_bestfilms = document.createElement('h1');
    let moviescontain = document.createElement('div');
    let slider = document.createElement('div');
    let slidercontainer = document.createElement('div');   
    //ajouter un titre au bloc
    title_bestfilms.classList.add('bestFilms');
    title_bestfilms.textContent = 'Les 7 meilleurs films de la catégorie:'+categories[i];
    boxslide.appendChild(title_bestfilms);
    boxslide.classList.add('slider-1');
    boxslide.style.border = 'none';
    slidercontainer.classList.add('slider-container');
    boxslide.appendChild(slidercontainer);
    //let slider = document.createElement('div');
    slider.classList.add('slider');
    slidercontainer.appendChild(slider);
    //Boucle de recuperation des affiches pouyr chaque film
        let url_temp = url_temps;
        fetch(url_temp)
            .then(res =>res.json())
            .then(data => {
                for(j=0;j<7;j++){
                    let movie = document.createElement('div');
                    let movie_pic = document.createElement('img');        
                    let cpt = j
                    let detailmovie = document.createElement('a');
                    //Ajouter l'élément <div> au div.slider
                    slider.appendChild(detailmovie);
                    movie_pic.classList.add('movie', j+'movie_pic');
                    detailmovie.appendChild(movie_pic);
                    const title = data.results[cpt].title;
                    const imag = data.results[cpt].image_url;
                    const url_resume = data.results[cpt].url;
                    detailmovie.setAttribute('href', url_resume)
                    movie_pic.alt = 'affiche du film:' + title;
                    movie_pic.src = imag;
                    
            }})

    }



