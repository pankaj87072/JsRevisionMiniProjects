// function selectSuggestion(){
//     const suggestELement = document.querySelector('.suggestionContainer')
//     console.log('suggestELement',suggestELement)
//     suggestELement.addEventListener('keydown',(e)=>{
//         console.log('keydown',e)
//     })
// }

function filterSuggestion(arrList,searchKeyword){
    return arrList.filter((d)=>d.title.toLowerCase().includes(searchKeyword)).map((d)=>d.title)
}


function fetchingSuggestion(searchKeyboard,inputBox){
    let loading = true
    try{
        appendChildInList([],loading)
    fetch(`https://dummyjson.com/products/search?q=${searchKeyboard}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const filteredRes = data.products.map((d)=>d.title)
            // if(filteredRes){
                loading=false
                appendChildInList(filteredRes,loading,inputBox)
            // }
        })
    }catch(e){
        console.log('error',e)
        loading=false
    }
}

function debouncing (){
    let timeInterval;
    return function innerFun(cb){
    clearTimeout(timeInterval)
    timeInterval = setTimeout(cb
    ,3000)
    }
}
function appendChildInList (suggestedArray,loading,inputBoxValue){
    const mainSearchListContainer = document.querySelector('.suggestionContainer')
    const fragment = document.createDocumentFragment()
    if(!loading){
        mainSearchListContainer.textContent = ''
        let createdList;
        if(suggestedArray.length > 0){
        suggestedArray.forEach((d,index)=>{
        createdList = document.createElement('li')
        createdList.textContent = d
        createdList.setAttribute('class',`li`)
        fragment.appendChild(createdList)
        // mainSearchListContainer[0].childNodes.forEach((d)=>{
        //     console.log(d)
        // }
    })
    console.log(fragment)
    mainSearchListContainer.appendChild(fragment)
}
    else{
        mainSearchListContainer.textContent = 'No Data Found'
    }
    }
    else{
    mainSearchListContainer.textContent = 'Loading...'
    }
}

const inputBox = document.querySelector('input')
const de = debouncing()
const mainSearchListContainer = document.querySelector('.suggestionContainer')
inputBox.addEventListener('input',(e)=>{
        if(!e.target.value){
            return
        }
        de(()=>fetchingSuggestion(e.target.value , inputBox))
})
let i = -1
inputBox.addEventListener('keydown',(e)=>{
        const suggestELement = mainSearchListContainer.children
        let suggestedListValues;
        if(e.key === 'ArrowDown'){
            console.log('keydown',i)
            // i = i < 0 ? 1 : i
            if(i > suggestELement.length-2){
                return
            }
            i++;
            if(i > 0){
                const prev = suggestELement[i-1]
                prev.removeAttribute('class','li-select')
            }
            suggestedListValues = suggestELement[i]
            suggestedListValues.setAttribute('class','li-select')
        }
            if(e.key === 'ArrowUp'){
                console.log('keyup',i)
                // i = i > suggestELement.length-1 ? i = suggestELement.length-2 : i
            if(i < 1){
                return
            }
            i--;
            if(i < suggestELement.length-1){
                const prev = suggestELement[i+1]
                prev.removeAttribute('class','li-select')
            }
            suggestedListValues = suggestELement[i]
            suggestedListValues.setAttribute('class','li-select')
        }
        if(e.key === 'Enter'){
            if(suggestELement.length <= 0){
                return
            }
            // i = i < 0 ? 0 : i > suggestELement.length-1 ? suggestELement.length-1 : i
            console.log(i,suggestELement,suggestedListValues)
        inputBox.value = suggestELement[i].textContent
    }

})
const mainContainer = document.querySelector('body')
mainContainer.addEventListener('click',(e)=>{
    console.log('mainContainer',e.target.tagName,e.target.className)
    if(e.target.className != 'suggestionContainer' && e.target.tagName != 'INPUT' && e.target.tagName != 'LI'){
        mainSearchListContainer.style.display = 'none' 
    }else{
        mainSearchListContainer.style.display = 'block'
    }
})
mainSearchListContainer.addEventListener('click',(e)=>{
    console.log('e',e.target.tagName)
    if(e.target.tagName == 'LI'){
            inputBox.value = e.target.textContent
    }
})


