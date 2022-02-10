let input = document.querySelector("input");
let nameOfHouses = document.querySelector(".hero");
let root = document.querySelector('.people_container');

let activeHouse = "";

function handleSearch(event){
    root.innerHTML="" 
    let filteredBySearchArray = got.houses.reduce((acc, house)=>{
        let filteredArray = house.people.filter(person=>{
            return person.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        return acc.concat(filteredArray)
    },[])
    createEachHouseUI(filteredBySearchArray,root)
}


function handleFilter(event){
    console.log(event.target)
    root.innerHTML="" 
    let allActiveButtons = document.querySelectorAll(".active");
    allActiveButtons.forEach(ele=>{
        ele.classList.remove("active")
    })
    event.target.classList.add('active')
    
    let tempArray = got.houses.filter(house=>{
        return house.name === event.target.innerText
    })
    createEachHouseUI(tempArray[0].people, root)
}



function createEachHouseUI(people, rootElement){
        people.forEach(person =>{
        let article = document.createElement('article');
        article.classList.add("article" ,"flex-30");

        let divOuter = document.createElement('div');
        divOuter.classList.add('flex', 'flex-start');

        let divInner = document.createElement('div');
        divInner.classList.add('image-container');
        let img = document.createElement('img');
        img.src = person.image;
        divInner.append(img); 

        let h2 = document.createElement('h2');
        h2.innerText = person.name ;

        divOuter.append(divInner, h2);
        
        let p = document.createElement('p');
        p.innerText = person.description;

        let a = document.createElement('a');
        a.classList.add('btn');
        a.innerText = "Learn More!"
        a.href = person.wikiLink
        a.target = "_blank"

        article.append(divOuter, p, a)
        
        rootElement.append(article)
    })
    
}

function createUI(gotArray, rootElement){
    gotArray.houses.forEach(house=>{
        let button = document.createElement('button');
        button.innerText = house.name;
        nameOfHouses.append(button);
        button.addEventListener('click',handleFilter);
        createEachHouseUI(house.people, rootElement)
    })
}

input.addEventListener('keyup',handleSearch)
createUI(got, root);