const searchPhones = () => {

    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = "";
    // console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

searchPhones()

const displayPhones = data => {
    const searchResult = document.getElementById('search-result');
    for (const phone of data) {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}"  class="card-img-top" alt="...">
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name} </h2>
            <h5 class="card-title">${phone.brand} </h5>
            <button> Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    }

}
