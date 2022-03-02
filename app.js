const searchPhones = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = "";

    // clear search value  
    document.getElementById("search-result").innerHTML = "";

    // clear displayDetails value
    const displayDetails = document.getElementById('display-details');
    displayDetails.innerHTML = "";

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));

}

// display search results 

const displayPhones = data => {
    const searchResult = document.getElementById('search-result');
    const limitedData = data.slice(0, 20);
    if (limitedData.length == 0) {
        document.getElementById("title-id").style.display = "block";
    }
    else {
        document.getElementById("title-id").style.display = "none";
    }
    for (const phone of limitedData) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `       
            <div id="card-img" class="card h-100">             
            <img  src="${phone.image}"  class="card-img-top">
                <div class="card-body">
                <h4 class="card-title">Phone Name: ${phone.phone_name} </h4>
                <h5 class="card-title"> Brand: ${phone.brand} </h5>      
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button id="button" onclick="showDetails('${phone.slug}')" class="btn btn-primary" type="button">Show More</button>
                </div>
                </div>
            </div>     
             `;
        searchResult.appendChild(div);
    }

}

const showDetails = id => {
    const url = (`https://openapi.programming-hero.com/api/phone/${id}`);
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsOnWeb(data.data))

}

// show details after clicking the buton 
const showDetailsOnWeb = phone => {
    const displayDetails = document.getElementById('display-details');
    displayDetails.innerHTML = "";
    const div = document.createElement('div');
    div.innerHTML = `
    <div id="details-card" class="card mb-3" style="max-width: 540px;">
    <div id="details-box" class="row g-0">
        <div id="details-img" class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">"${phone.name}"</h5>
                <p class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : 'not available'}</p>
            </div>
            <ul class="list-group slist-group-flush">
            <li class="list-group-item">Chipset: ${phone.mainFeatures.chipSet}</li>
            <li class="list-group-item">Display: ${phone.mainFeatures.displaySize}</li>
            <li class="list-group-item">Memory: ${phone.mainFeatures.memory}</li>
            <li class="list-group-item">Sensors: ${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}, ${phone.mainFeatures.sensors[5]} </li>
            <li class="list-group-item">Others: Bluetooth-  ${phone.others?.Bluetooth ?? "not found"}, GPS-${phone.others?.GPS ?? "not found"}, NFC- ${phone.others?.NFC ?? "not found"}, Radio- ${phone.others?.Radio ?? "not found"}, USB-${phone.others?.USB}, WLAN- ${phone.others?.WLAN ?? "not found"}</li>

             </ul>
        </div>
        </div>
        </div>
        `;
    displayDetails.appendChild(div);

};
