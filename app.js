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

    for (const phone of data) {
        console.log(phone)
    }

}
