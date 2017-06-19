const avancementSerie = [
  {
    "serie" : "Avatar",
    "episode" : "episode 10",
    "avancement" : 0
  }
]

class Avancement {
  constructor(id,avancementSerie) {
    this.id=document.getElementById(id)
    this.avancementSerie=avancementSerie
    this.isAdmin=undefined
    this.isCheck=false
  }

  switchAdmin(isChecked){
    this.isAdmin = isChecked
    this.render()
  }

  deleteAvancementSerie(serie){
    this.avancementSerie.splice(this.avancementSerie.indexOf(serie),1)
    this.render()
  }

  setEdited(serie){
    if(this.isCheck)
      this.isCheck=false
    else{
      this.isCheck=true
    }

    for(let ser of this.avancementSerie){
      ser.Modif = false
    }
    serie.Modif=this.isCheck
    this.render()
  } //FIN EDITED

  changementTitre(serie,value){
    serie.serie= value
    this.render()
  }

  changementNumeroEpisode(serie,value){
    serie.episode=value
    this.render()
  }

  add(serie){
    if(serie.avancement<100)
      serie.avancement+=5
    this.render()
  }
  remove(serie){
    if(serie.avancement>0)
      serie.avancement-=5
    this.render()
  }

  deleteSerie(serie){
    this.avancementSerie.splice(this.avancementSerie.indexOf(serie),1)
    this.render()
  }

  addSerie(serie){
    this.avancementSerie.push(serie)
    this.render()
  }


  render() {
    this.id.innerHTML=""
    for(let serie of this.avancementSerie){
      let serieCtn=this.createSerie(serie)
      this.id.appendChild(serieCtn)

      if(this.isAdmin){
        serieCtn
          .querySelector("input.modifSerie")
          .addEventListener("click", () => this.setEdited(serie) )
        serieCtn
          .querySelector("input.titreInput")
          .addEventListener("keypress",(event) => {
            if(event.key=="Enter") this.changementTitre(serie,event.target.value)
          })
        serieCtn
          .querySelector("input.numeroEpisodeInput")
          .addEventListener("keypress", (event) => {
            if(event.key=="Enter") this.changementNumeroEpisode(serie,event.target.value)
          })
       serieCtn
          .querySelector("button.add")
          .addEventListener("click", () => this.add(serie) )

        serieCtn
          .querySelector("button.remove")
          .addEventListener("click", () => this.remove(serie) )

        serieCtn
          .querySelector("button.deleteSerie")
          .addEventListener("click", ()=> this.deleteSerie(serie))

      }//FIN IF isAdmin

    } //FIN for
    if(this.isAdmin){
    let form=this.createForm()
    this.id.appendChild(form)
    }
  } // FIN render

  //<form id="newserie" onSubmit="addSerie(event, this)">
  //  <input type="text" placeholder="titre série" name="titre">
  //  <input type ="text" placeholder="numéro épisode" name="numeroepisode">
  //  <input type="submit" value="Ajouter">
//  </form>

  createForm(){
    let formCtn= document.createElement("div")
    formCtn.innerHTML="<form id=\"newserie\" onSubmit=\"addSerie(event,this)\" > <input type=\"text\" placeholder=\"titre série\" name=\"titre\"> <input type =\"text\" placeholder=\"numéro épisode\" name=\"numeroepisode\">  <input type=\"submit\" value=\"Ajouter\"> </form>"
    return formCtn
  } //FIN createFORM

  createSerie(serie){

    //<div class="serie-ctn">
    //    <div class="serie">
    //      <h6> serie1 </h6>
    //      <div class="numero-episode" >numero episode </div>
    //      <div class="avancement"> % avancement </div>
    //      <button class="add">+</button>
    //      <button class="remove">-</button>
    //      <button class="delete"> Supprimer </button>
    //      <input type="checkbox"> modifier </input>
    //    </div>
    //</div>

    let serieCtn = document.createElement("div")
    serieCtn.className="serie-ctn"

    let serieDiv= document.createElement("div")
    serieDiv.className="serie"
    serieCtn.appendChild(serieDiv)

    //titre et sa Modif
    let h4= document.createElement("h4")
    h4.innerText = serie.serie

    let titreInput = document.createElement("input")
    titreInput.className="titreInput"
    titreInput.classList.add("hidden")
    titreInput.type="text"
    titreInput.placeholder="Titre de l'épisode"
    //FIN TITRE ET SA Modif

    //numero-episode et sa modif
    let numeroEpisode = document.createElement("div")
    numeroEpisode.className="numero-episode"
    numeroEpisode.innerText=serie.episode

    let numeroEpisodeInput = document.createElement("input")
    numeroEpisodeInput.className = "numeroEpisodeInput"
    numeroEpisodeInput.classList.add("hidden")
    numeroEpisodeInput.type = "text"
    numeroEpisodeInput.placeholder="Numéro épisode"
    //FIN numero-episode et sa modif

    //avancemet et ses boutons
    let avancement = document.createElement("div")
    avancement.className="avancement"
    avancement.innerText=serie.avancement + " % "

    let add = document.createElement("button")
    add.className="add"
    add.innerText="+"

    let remove = document.createElement("button")
    remove.className="remove"
    remove.innerText="-"
    //FIN avancement et ses boutons

    let buttonDeleteSerie = document.createElement("button")
    buttonDeleteSerie.className = "deleteSerie"
    buttonDeleteSerie.innerText = "Supprimer"

    let buttonModifSerie = document.createElement("input")
    buttonModifSerie.type= "checkbox"
    if(serie.Modif)
      buttonModifSerie.checked="checked"
    buttonModifSerie.className= "modifSerie"
    buttonModifSerie.innerText = "modifier"

    serieDiv.appendChild(h4)
    serieDiv.appendChild(titreInput)

    serieDiv.appendChild(numeroEpisode)
    serieDiv.appendChild(numeroEpisodeInput)

    serieDiv.appendChild(avancement)



    if (this.isAdmin) {
      serieDiv.appendChild(buttonDeleteSerie)
      serieDiv.appendChild(buttonModifSerie)
      serieDiv.appendChild(add)
      serieDiv.appendChild(remove)
      if(serie.Modif) {
        titreInput.classList.remove("hidden")
        numeroEpisodeInput.classList.remove("hidden")
      }//FIN if serie.Modif
    }//FIN if isadmin

    return serieCtn
  }//FIN createSerie

}//FIN CLASS serie


const avancement = new Avancement ("avancement",avancementSerie)
avancement.render()


function addSerie(event,el){
  event.preventDefault()
  let serie={  "serie" : el.titre.value,
    "episode" : el.numeroepisode.value,
    "avancement" : 0}
    avancement.addSerie(serie)
    el.titre.value = ""
    el.numeroepisode.value= ""
}
