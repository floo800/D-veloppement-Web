const episodes = [
  {"titre": "Naruto Episode 2 saison 1 ",
   "date": new Date(2017, 4, 3, 1, 0, 0, 0),
   "commentaire" : "On retrouve Naruto chez le photographe, pour une photo pas des moins originales.Mais tout de suite nous le suivons à l'académie où il présente sa fiche ninja au Hokage qui lui demande de refaire la photographie, comme seul argument Naruto utilise son Sexy No Jutsu ce qui, provoquera des saignements de nez chez l'Hokage. Arrive un jeune garçon qui trébuche et tombe à terre puis, qui accuse Naruto de lui avoir tendu un piège.Après révélation de son identitée(petit fils du Hokage), il se fera frapper par Naruto pour l'avoir accusé à tort. Une leçon de morale par son tuteur d'élite, Ebisu, ne le résonnera en rien.",
   "image" : "assets/img/naruto.png",
   "dl" : "assets/img/naruto.png",
 }
,
 {"titre": "Naruto Episode 3 saison 1 ",
  "date": new Date(2017, 4, 3, 1, 0, 0, 0),
  "commentaire" : "Naruto se prépare pour la Réunion des nouveaux Genin, sur le chemin il croise Konohamaru à qui il explique être enfin un vrai Ninja.A la réunion, Naruto voit arriver Sakura, celle dont il est amoureux, mais elle n'a d'yeux que pour Sasuke ; Naruto de rage, va se poster en face de Sasuke et là, accident, un élève qui discutait pousse Naruto aux lèvres de Sasuke sans le vouloir.",
  "image" : "assets/img/naruto.png",
  "dl" : "assets/img/naruto.png",
}
,
{"titre": "Naruto Episode 5 saison 1 ",
 "date": new Date(),
 "commentaire" : "Naruto se prépare pour la Réunion des nouveaux Genin, sur le chemin il croise Konohamaru à qui il explique être enfin un vrai Ninja.A la réunion, Naruto voit arriver Sakura, celle dont il est amoureux, mais elle n'a d'yeux que pour Sasuke ; Naruto de rage, va se poster en face de Sasuke et là, accident, un élève qui discutait pousse Naruto aux lèvres de Sasuke sans le vouloir.",
 "image" : "assets/img/naruto.png",
 "dl" : "assets/img/naruto.png",
}

]

class Episode {
  constructor(id,episodes) {
    this.id=document.getElementById(id)
    this.episodes=episodes
    this.isAdmin=undefined
    this.isCheck=false
    this.isShow=true
  }

  switchAdmin(isChecked){
    this.isAdmin= isChecked
    this.render()
  }



  deleteEpisode(episode){
    this.episodes.splice(this.episodes.indexOf(episode),1)
    this.render()
  }

  setEdited(episode){

    if(this.isCheck)
      this.isCheck=false
    else {
        this.isCheck=true
    }
    for (let epi of this.episodes) {
      epi.Modif = false
    }

    episode.Modif = this.isCheck
    this.render()
  }

  changementCommentaire(episode,value){
    episode.commentaire=value
    this.render()
  }

  changementTitre(episode,value){
    episode.titre=value
    this.render()
  }

  changementDate(episode,value){
    episode.date=value
    this.render()
  }

  changementImage(episode,value){
    episode.image=value
    this.render()
  }

  changementLien(episode,value){
    episode.dl=value
    this.render()
  }

  TrieSerie(event, el){
    event.preventDefault()
    let date= new Date()
    let temp
    if(el.ordre.value=="chronologique"){
      for( let i=0 ; i<episodes.length-1 ; i++){
        for(let j=i+1; j<episodes.length ; j++){
            if(episodes[i].date.getFullYear() > episodes[j].date.getFullYear()){
              temp=episodes[i]
              episodes[i]=episodes[j]
              episodes[j]=temp
            }
            else {
              if(episodes[i].date.getFullYear()==episodes[j].date.getFullYear() && episodes[i].date.getMonth()> episodes[j].date.getMonth() ){
                temp=episodes[i]
                episodes[i]=episodes[j]
                episodes[j]=temp
              }
              else{
                if(episodes[i].date.getFullYear()==episodes[j].date.getFullYear() && episodes[i].date.getMonth()== episodes[j].date.getMonth()&& episodes[i].date.getDate()> episodes[j].date.getDate()){
                  temp=episodes[i]
                  episodes[i]=episodes[j]
                  episodes[j]=temp
                }
              }
            }
        }
      }
    }//IF CHRONOLOGIQUE
    if(el.ordre.value=="antiChronologique"){
      for( let i=0 ; i<episodes.length-1 ; i++){
        for(let j=i+1; j<episodes.length ; j++){
            if(episodes[i].date.getFullYear() < episodes[j].date.getFullYear()){
              temp=episodes[i]
              episodes[i]=episodes[j]
              episodes[j]=temp
            }
            else {
              if(episodes[i].date.getFullYear()==episodes[j].date.getFullYear() && episodes[i].date.getMonth()< episodes[j].date.getMonth() ){
                temp=episodes[i]
                episodes[i]=episodes[j]
                episodes[j]=temp
              }
              else{
                if(episodes[i].date.getFullYear()==episodes[j].date.getFullYear() && episodes[i].date.getMonth()== episodes[j].date.getMonth()&& episodes[i].date.getDate()< episodes[j].date.getDate()){
                  temp=episodes[i]
                  episodes[i]=episodes[j]
                  episodes[j]=temp
                }
              }
            }
        }
      }
    }
    for (let epi of this.episodes) {

      //RECHERCHE PAR DATE
      if(el.date.value=="semaine" ){
        if( date.getFullYear()==epi.date.getFullYear() && date.getMonth()==epi.date.getMonth() && date.getDate()%7==epi.date.getDate()%7)
          epi.show=true
        else
        epi.show=false
      }

      if(el.date.value=="mois" ){
        if(date.getFullYear()==epi.date.getFullYear() && date.getMonth()==epi.date.getMonth())
        epi.show=true
        else
          epi.show=false
      }

      if(el.date.value=="annee"){
        if( date.getFullYear()==epi.date.getFullYear())
          epi.show=true
      else
        epi.show=false
      }

      if(el.date.value=="tous")
        epi.show=true
      //FIN RECHERCHE PAR DATE
      console.log(epi.titre.indexOf(el.texte.value))
      if(epi.titre.indexOf(el.texte.value)!=-1 && epi.show!=false)
          epi.show=true
      else
          epi.show=false

    }//FIN FOR
    this.render()
  }


  render() {
    this.id.innerHTML = ""
    for(let episode of this.episodes) {
      if(episode.show!=false){
        let episodeCtn= this.createEpisode(episode)
        this.id.appendChild(episodeCtn)
      }


      if(this.isAdmin){
        episodeCtn
            .querySelector("button.delete")
            .addEventListener("click", ()=> this.deleteEpisode(episode))
        episodeCtn
            .querySelector("input.modif")
            .addEventListener("click", () =>  this.setEdited(episode)  )
        episodeCtn
            .querySelector("input.commentaireInput")
            .addEventListener("keypress",(event) => {
              if(event.key=="Enter") this.changementCommentaire(episode,event.target.value)
            })
        episodeCtn
            .querySelector("input.titreInput")
            .addEventListener("keypress",(event) => {
              if(event.key=="Enter") this.changementTitre(episode,event.target.value)
            })
        episodeCtn
            .querySelector("input.dateInput")
            .addEventListener("keypress",(event) => {
              if(event.key=="Enter") this.changementDate(episode,event.target.value)
            })
        episodeCtn
            .querySelector("input.imageInput")
            .addEventListener("keypress",(event) => {
              if(event.key=="Enter") this.changementImage(episode,event.target.value)
            })
        episodeCtn
            .querySelector("input.lienInput")
            .addEventListener("keypress",(event) => {
              if(event.key=="Enter") this.changementLien(episode,event.target.value)
            })


      } //FIN if
    } // FIN for
  } // FIN render




  createEpisode(episode){

    //<div class="episode-ctn">
    //    <div class="episode">
    //        <h4>ep 1 </h4>
    //        <div class="date">Contenu</div>
    //        <div class="commentaire">blabal</div>
    //        <input class="commentaire" type="text">
    //        <img src="url" alt="naruto">
    //        <a href="lien" > lien de téléchargement<\a>
    //        <button class="delete">Supprimer</button>
    //        <check box class= "modif"></checkbox>
    //    </div>
    //</div>

    let episodeCtn = document.createElement("div")
    episodeCtn.className= "episode-ctn"

    let episodeDiv = document.createElement("div")
    episodeDiv.className = "episode"
    episodeCtn.appendChild(episodeDiv)

    // TITRE ET SA MODIF
    let h4 = document.createElement("h4")
    h4.innerText = episode.titre

    let titreInput = document.createElement("input")
    titreInput.className="titreInput"
    titreInput.classList.add("hidden")
    titreInput.type="text"
    titreInput.placeholder = "Nouveau titre"

    //FIN TITRE ET SA MODIF

    //DATE et SON input
    let dateDiv = document.createElement("div")
    dateDiv.innerText = episode.date.toLocaleDateString()
    dateDiv.className = "date"

    let dateInput =document.createElement("input")
    dateInput.className="dateInput"
    dateInput.classList.add("hidden")
    dateInput.type="text"
    dateInput.placeholder ="Nouvelle date"
    //FIN DATE ET SON INPUT


    //COMMENTAIRE ET SA MODIF
    let commentaireDiv = document.createElement("div")
    commentaireDiv.innerText = episode.commentaire
    commentaireDiv.className = "commentaire"

    let commentaireInput = document.createElement("input")
    commentaireInput.className="commentaireInput"
    commentaireInput.classList.add("hidden")
    commentaireInput.type="text"
    commentaireInput.placeholder = "Nouveau commentaire"

    //FIN COMMENTAIRE ET SA MODIF

    //IMAGE  ET SON INPUT
    let image = document.createElement("img")
    image.src= episode.image
    image.alt = episode.image

    let imageInput = document.createElement("input")
    imageInput.className="imageInput"
    imageInput.classList.add("hidden")
    imageInput.type="text"
    imageInput.placeholder = "Lien de la nouvelle image"
    //FIN IMAGE ET SON INPUT

    //LIEN ET SON INPUT
    let lien= document.createElement("a")
    lien.href=episode.dl
    lien.innerText ="lien de téléchargement"

    let lienInput=document.createElement("input")
    lienInput.className="lienInput"
    lienInput.classList.add("hidden")
    lienInput.type="text"
    lienInput.placeholder = "Lien de téléchargement"
    //FIN LIEN ET SON INPUT



    let buttonDelete = document.createElement("button")
    buttonDelete.className = "delete"
    buttonDelete.innerText = "Supprimer"

    let buttonModif = document.createElement("input")
    buttonModif.type= "checkbox"
    if(episode.Modif)
      buttonModif.checked="checked"
    buttonModif.className= "modif"
    buttonModif.innerText = "modifier"





      episodeDiv.appendChild(h4)
      episodeDiv.appendChild(dateDiv)
      episodeDiv.appendChild(commentaireDiv)
      episodeDiv.appendChild(image)
      episodeDiv.appendChild(lien)

      episodeDiv.appendChild(titreInput)
      episodeDiv.appendChild(dateInput)
      episodeDiv.appendChild(commentaireInput)
      episodeDiv.appendChild(imageInput)
      episodeDiv.appendChild(lienInput)

      if (this.isAdmin) {
        episodeDiv.appendChild(buttonDelete)
        episodeDiv.appendChild(buttonModif)
        if(episode.Modif) {
          titreInput.classList.remove("hidden")
          titreInput.classList.add("show")

          dateInput.classList.remove("hidden")
          dateInput.classList.add("show")

          commentaireInput.classList.remove("hidden")
          commentaireInput.classList.add("show")

          imageInput.classList.remove("hidden")
          imageInput.classList.add("show")

          lienInput.classList.remove("hidden")
          lienInput.classList.remove("show")

        }
      }

    return episodeCtn


  }//FIN createEpisode

}// FIN episode

const a = new Episode("episodes",episodes)
a.render()


function TrieSerie(event,el, episodes){
  event.preventDefault()
  let date= new Date()
  console.log(date.getDate())
  console.log(date.getFullYear())
  console.log(date.getMonth())
  console.log(el.date.value)

  for(let ser of this.avancementSerie){
    ser.Modif = false
  }

}
