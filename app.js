const searchPhones = () => {

    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = "";

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

searchPhones()

const displayPhones = data => {
    const searchResult = document.getElementById('search-result');
    for (const phone of data) {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
       
        <div class="card h-100"> 
 
        <img width="50px" height="350px" src="${phone.image}"  class="card-img-top">
    
            <div class="card-body">
            <h2 class="card-title">Phone Name: ${phone.phone_name} </h2>
            <h4 class="card-title"> Brand: ${phone.brand} </h4>
            <button onclick="showDetails('${phone.slug}')" > Details</button>
            </div>
        </div>

       
        `;
        searchResult.appendChild(div);
    }

}

const showDetails = slug => {
    console.log(slug);
    const url = (`https://openapi.programming-hero.com/api/phone/${slug}`);
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsOnWeb(data.data))

}

const showDetailsOnWeb = phone => {
    console.log(phone)
    const displayDetails = document.getElementById('display-details');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card " style="width: 18rem;">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">"${phone.name} "</h5>
        <p id="release-date">Release Date: ${phone.releaseDate}</p>
        
    </div>
    <ul class="list-group slist-group-flush">
        <li class="list-group-item">Chipset: ${phone.mainFeatures.chipSet}</li>
        <li class="list-group-item">Display: ${phone.mainFeatures.displaySize}</li>
        <li class="list-group-item">Memory: ${phone.mainFeatures.memory}</li>

    </ul>
        </div>
    `
    displayDetails.appendChild(div);
    if (phone.releaseDate = ' ') {
        const p = document.getElementById('release-date');
        p.innerText = "Release date is not available";
    }

}