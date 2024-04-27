function element(tag, className, id, text) {
  const tags = document.createElement(tag);
  tags.classList = className;
  tags.id = id; // Make sure id is set correctly
  tags.innerHTML = text;
  return tags;
}

const container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries and its weather");
const row = element("div", "row", "", "");

//Rest Countries API =>
const country = fetch("https://restcountries.com/v3.1/all");
country
  .then((data) => data.json())
  .then((ele) => {
    ele.sort((a, b) => a.name.common.localeCompare(b.name.common));
    for (let i = 0; i < ele.length; i++) {
      const box = document.createElement("div");
      box.classList = "col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3 mb-2";
      box.innerHTML = `
        <div class="card h-100">
            <div class="card-header bg-primary">
                <h5 class="card-title text-center">${ele[i].name.common}</h5> 
            </div>
            <div class="img-box">
                <img src="${ele[i].flags.png}" class="card-img-top" alt="${ele[i].flags.alt}">
            </div>
            <div class="card-body">
                <div class="card-text text-center">Region: ${ele[i].region}</div>
                <div class="card-text text-center">Capital: ${ele[i].capital}</div>
                <div class="card-text text-center">Country Code: ${ele[i].cca3}</div>
                <button class="btn btn-primary mt-4 mb-4">Click for Weather</button>
            </div>
        </div>
        `;
      row.appendChild(box);
    }
    
    //Open Weather API =>
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          let latlng = ele[index].latlng;
          let lat = latlng[0];
          let lon = latlng[1];
          let weatherApi = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd6191ca9f5775b0bf6430aad0289f60`
          );
          weatherApi
            .then((data1) => data1.json())
            .then((result) => {
              btn.id = 'btn';
              btn.textContent = `${ele[index].name.common} is ${Math.floor(result.main.temp)}🌡️C`;
              // alert(`Weather of ${ele[index].name.common} is ${Math.floor(result.main.temp)}🌡️C`)
            });
        });
    });
      
  });
container.appendChild(h1);
container.appendChild(row);
document.body.appendChild(container);
