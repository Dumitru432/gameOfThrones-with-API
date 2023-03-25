 // https://anapioficeandfire.com/api/characters/583

const randomCharacter = async () => { // functia asta ne va returna un obiect cu informatia despre un personaj
    try {
        let randomNumber = Math.floor(Math.random() * 600) + 1; //10
        let result = await fetch(`https://anapioficeandfire.com/api/characters/${randomNumber}`) // acest fetch ne returneaza info despre un caracter in format XML
        let convertToJson = await result.json() // Convertim XML in format JSON
        console.log(convertToJson)
        
        //! convertToJson ne ofera un obiect cu informatie despre personaj  de genul:
        // {
        //     "url": "https://anapioficeandfire.com/api/characters/450",
        //     "name": "Gwin Goodbrother",
        //     "gender": "Female",
        //     "culture": "Ironborn",
        //     "born": "",
        //     "died": "",
        //     "titles": [
        //       ""
        //     ],
        //     "aliases": [
        //       ""
        //     ],
        //     "father": "",
        //     "mother": "",
        //     "spouse": "",
        //     "allegiances": [
        //       "https://anapioficeandfire.com/api/houses/155" //! obiectul despre personaj ne ofera un link catre casa lui
        //     ],
        //       ...........
        
        //? daca avem linkul la casa primim, convertToJson.allegiances = ['linkul']
        //? daca nu avem linkul la casa primim, convertToJson.allegiances = []

        let convertHouse; // {name:'Nu e casa'}
        let houseLink = convertToJson.allegiances[0] // extragem link-ul cu referire la casa personajului
        if (convertToJson.allegiances.length <= 0){ //{name:'Nu e casa'}
            convertHouse = {
                name: 'Nu are casa'
            }
        } else {
            let resultHouse = await fetch(houseLink) // facem un fetch call a vedem informatia despre casa, primim un obiect tip HXML
            convertHouse = await resultHouse.json() // convertim in format json
            console.log(convertHouse)
        }
       
        // obtinem un obiect de genul:
        // {
        //     "url": "https://anapioficeandfire.com/api/houses/155",
        //     "name": "House Goodbrother of Hammerhorn",
        //     "region": "Iron Islands",
        //     "coatOfArms": "Gules, a warhorn sable banded or.",
        //     "words": "",
        //     "titles": [
        //       ""
        //     ],
        //     "seats": [
        //       "Hammerhorn"
        //     ],
        //     ..........
        
        //! in punctul asta avem deja informatia despre personaj intr-un obiect (convertToJson), si informatia despre casa lui in alt obiect (convertHouse)
        
        showCharacter(convertToJson, convertHouse) //chemama functia showCharacter si ii dam obiectul cu info despre caracter si info despre casa caracterului

    } catch (err) {
        console.log(err)
    }
    
}



// eu iti dau un obiect - characterObject- care o sa contina info despre caracter, vei putea extrage de acolo informatia cum ar fi: numele, genul
// eu iti dau alt obiect - house- care o sa contina info despre casa acestui caracter, vei putea extrage de acolo informatia despre casa lui

const showCharacter = (characterObject, house) => { //cream functia showCharacter, functia asteapta un obiect despre un personaj
    let conclusion; //o sa fie ori genul personajului ori actorul
    if(characterObject.playedBy[0] !== ''){ //daca obiectul despre personal are info despre actor
        conclusion = characterObject.playedBy // conclusion va fi numele actorului: characterObject.playedBy 
    } else {  //daca obiectul despre personal nu are info despre actor
        conclusion = characterObject.gender //conclusion va fi inlocuit cu genul 
    }
    
    
    let cardCharacter = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Name: ${characterObject.name} </h5>
      <h6 class="card-subtitle mb-2 text-body-secondary"> ${conclusion} </h6>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      casa personajului
    </button>
    
    <!-- Modal -->
    <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
           ${house.name}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
    `
    const body = document.querySelector('body')
    body.innerHTML += cardCharacter //atasam cardul la html


}

//! Flow
// - functia randomCharacter{
        //fetch convertToJson
        //fetch convertHous
        // showCharacter
//}


randomCharacter();
randomCharacter();
randomCharacter();
