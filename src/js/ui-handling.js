export class UI {
    constructor(app) {
        this.app = app; 
        this.init(); 
    }

    init() {
        this.searchButtonHandle();
    }

    render() {
        let city = document.getElementById("city-name"); 
        let temp = document.getElementById("temp"); 
        let condition = document.getElementById("condition"); 
        city.textContent = this.app.getCity(); 
        temp.textContent = this.app.getTemp(); 
        condition.textContent = this.app.getCondition(); 

        //
        let UV = document.getElementById("UV");
        let humidity = document.getElementById("humidity");
        let sunrise = document.getElementById("sunrise");
        let sunset = document.getElementById("sunset");
        let pressure = document.getElementById("pressure");
        let feelslike = document.getElementById("feelslike");
        let precipprob = document.getElementById("precipprob");
        UV.textContent = this.app.getUV();
        humidity.textContent = this.app.getHumidity();
        sunrise.textContent = this.app.getSunrise();
        sunset.textContent = this.app.getSunset();
        pressure.textContent = this.app.getPressure(); 
        feelslike.textContent = this.app.getFeelslike(); 
        precipprob.textContent = this.app.getRainchance();

        let icon = document.getElementById("current-icon");
        import(`../icons/${this.app.getCurrentIcon()}.svg`).then(
            data => icon.src = data.default
        )

        //
        let forecast = this.app.getForecast(); 
        let forecastContent = document.getElementById("5day-forecast"); 
        forecastContent.innerHTML = ""; 
        for(let i = 1; i <= 5; ++i) {
            let div = document.createElement("div"); 
            div.append(forecast[i].datetime); 
            div.append(forecast[i].icon); 
            div.append(forecast[i].tempmin);
            div.append(forecast[i].tempmax); 

            forecastContent.append(div);
        }

        //
        let todayForecast = document.getElementById("1day-forecast");
        let hour = 24;
        let currentTime = this.app.getCurrentTime(); 
        todayForecast.innerHTML = ""; 
        for(let i = 0; i < 24; ++i) {
            if (forecast[0].hours[i].datetimeEpoch >= currentTime) {
                --hour;
                let div = document.createElement("div"); 
                div.append(forecast[0].hours[i].datetime); 
                div.append(forecast[0].hours[i].icon); 
                div.append(forecast[0].hours[i].temp); 

                todayForecast.append(div);
            }
        }
        for(let i = 0; i < hour; ++i) {
            let div = document.createElement("div"); 
            div.append(forecast[1].hours[i].datetime); 
            div.append(forecast[1].hours[i].icon); 
            div.append(forecast[1].hours[i].temp);
            todayForecast.append(div);
        }
    }

    searchButtonHandle() {
        let button = document.querySelector("button");
        let input = document.querySelector("input"); 
        button.addEventListener("click", async (e)=>{
            e.preventDefault();

            await this.app.fetchData(input.value); 
            this.app.printData(input.value);
            input.value = "";
            this.render(); 
        })
    }
}