//  for(count=1;count=3;count++){
categories.forEach(category){

    fetch(url_temp)
    .then(res =>res.json())
    .then(data => {
        let slider = document.getElementById("slider"+count);
        data.forEach(element => {
            let movie = document.createElement('img');
            movie.src = element.image_url;
            slider.appendChild(movie);           
        }
    });
}
}
    for(film_count=1;film_count<8;film_count++){
        
        slider.appendChild(movie);
        // let movie = document.createElement('div');
        // let url_temp = url_suffixe_bestsfilms+(film_count+1);        
        // //Ajouter l'élément <div> au div.slider
        // movie.classList.add('movie');
        // slider.appendChild(movie);
        // //Ajouter l'élément <div> au div.slider
        // let movie_pic = document.createElement('img');
        // movie_pic.classList.add('movie_pic');
        // movie.appendChild(movie_pic);
        let cpt = film_count
            const title = data.results[cpt].title;
            console.log(data.results[cpt].title);
            const imag = data.results[cpt].image_url;
            const url_resume = data.results[cpt].url;
            console.log(url_temp);
            title_mov.textContent = title;
            console.log(title_mov.textContent);
            movie_pic.alt = 'affiche du film:' + title;
            console.log(img_mov.alt);
            movie_pic.src = imag;
            console.log(img_mov.src);
            
        }}

    )