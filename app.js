// key api 563492ad6f91700001000001095dc4a79c8b481cb9faaf8b9bcf7f79
const Axios = axios.create({
    baseURL: 'https://api.pexels.com/v1/',
    headers: {'Authorization': '563492ad6f91700001000001095dc4a79c8b481cb9faaf8b9bcf7f79'},
    ['Content-Type']: `application/json`
})

let page_actual = 1
let listPhotos = []
let cardsContainer = document.getElementById('cards')
let load_more = document.getElementById('loadmore-content')
let spinner = document.getElementById('spinner')
let footer = document.getElementById('footer')
let link_more = document.getElementById('link-more')

async function getImages(page){
    let response
    await Axios.get(`search?page=${page}&per_page=6&query=nature`)
    .then(res=>{
        response = res.data
    })
    .catch(e=>{
        response = e
    })
    return response
}
async function getAvatar(){
    let response
    await Axios.get('https://randomuser.me/api/')
    .then(res => {
        response = res.data.results[0].picture.large
    })
    .catch(e=>{
        console.log(e);
        response = e
    }) 
    return response
}
function gethashtag(url){
    let tags = url.slice(29)
    let hashtag = '#'
    tags = tags.split('-')
    tags = tags.slice(0,-1)
    for(let tag of tags){
        hashtag +=  tag[0].toUpperCase() + tag.slice(1)
    }
    return hashtag
}
function newCard(item,avatar){
    let hashtag = gethashtag(item.url)
    const card = `
        <div class="col-lg-4 col-md-6 p-0 px-2 item-cards">
            <div class="d-flex flex-row">
                <img class="img-fluid pic" src="${item.src.landscape}" alt="${item.src.landscape}">
            </div>
            <div class="d-flex flex-row photographer-data">
                <div class="d-flex px-2 align-items-center">
                    <img class="avatar rounded-circle" src="${avatar}" alt="${avatar}">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <p class="p-0 m-0 photographer-name">
                        ${item.photographer}
                    </p>
                    <p class="p-0 m-0 photographer-tag">
                        ${hashtag}
                    </p>
                </div>
            </div>    
        </div>
    `
    return card
}

window.onload = async ()=>{
    let images = await getImages(1)
    listPhotos = images.photos
    let pack_pictures = ''
    for (let pic of listPhotos) {
        let avatar = await getAvatar()
        const card = newCard(pic,avatar)
        pack_pictures += card
    }
    cardsContainer.innerHTML += pack_pictures
    cardsContainer.classList.remove('hidden')
    load_more.classList.remove('hidden')
    spinner.classList.add('hidden')
    footer.classList.remove('fixed-bottom')
    
    console.log(images)
}

link_more.addEventListener('click', async () => {
    load_more.classList.add('hidden')
    spinner.classList.remove('hidden')
    page_actual += 1
    console.log(page_actual);
    let images = await getImages(page_actual)
    console.log(images);
    listPhotos = images.photos
    console.log(listPhotos);
    let pack_pictures = ''
    for (let pic of listPhotos) {
        console.log(pic);
        let avatar = await getAvatar()
        const card = newCard(pic,avatar)
        pack_pictures += card
    }
    console.log(pack_pictures);
    cardsContainer.innerHTML += pack_pictures
    spinner.classList.add('hidden')
    load_more.classList.remove('hidden')
})