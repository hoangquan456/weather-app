export class UI {
    constructor(app) {
        this.app = app; 
        this.init(); 

        
    }

    async init() {
        this.searchButtonHandle();
        await this.app.fetchData("Ho Chi Minh");
        this.render();
    }

    // truncate(string, l, r) {
    //     return string.slice(l, l + r);
    // }

    render() {
        let city = document.getElementById("city-name"); 
        let temp = document.getElementById("temp"); 
        let condition = document.getElementById("condition"); 
        let tempMax = document.getElementById("temp-max");
        let tempMin = document.getElementById("temp-min");
        // let feelslike = document.getElementById("feelslike");
        city.textContent = this.app.getCity(); 
        temp.textContent = this.app.getTemp() + "\u00B0"; 
        condition.textContent = this.app.getCondition(); 
        tempMax.textContent = this.app.getTempMax();
        tempMin.textContent = this.app.getTempMin();
        // feelslike.textContent = `Feels like ${this.app.getRealFeel()}`;

        //
        let UV = document.getElementById("UV");
        let humidity = document.getElementById("humidity");
        let sunrise = document.getElementById("sunrise");
        let sunset = document.getElementById("sunset");
        let windspeed = document.getElementById("windspeed");
        let precipprob = document.getElementById("precipprob");
        UV.textContent = this.app.getUV();
        humidity.textContent = this.app.getHumidity() + "%";
        sunrise.textContent = this.app.getSunrise().slice(0, 5);
        sunset.textContent = this.app.getSunset().slice(0, 5);
        windspeed.textContent = this.app.getWindspeed(); 
        precipprob.textContent = this.app.getRainchance() + "%";

        let icon = document.getElementById("current-icon");
        import(`../icons/${this.app.getCurrentIcon()}.svg`).then(
            data => icon.src = data.default
        )

        //
        let forecast = this.app.getForecast(); 
        let forecastContent = document.getElementById("five-day-forecast"); 
        forecastContent.innerHTML = ""; 
        for (let i = 1; i <= 5; ++i) {
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            let div4 = document.createElement("div");
        
            div1.append(forecast[i].datetime.slice(-5)); 
        
            // Create the icon image for the weather
            let img = document.createElement("img"); 
            import(`../icons/${forecast[i].icon}.svg`).then(
                data => img.src = data.default
            );
            div2.append(img);
        
            // Create the min and max temperature divs with the arrow images
            let tempMinDiv = document.createElement("div");
            tempMinDiv.style.display = "flex";
            tempMinDiv.style.alignItems = "center";
            tempMinDiv.style.gap = "4px";
            
            let tempMinArrow = document.createElement("img");
            import(`../icons/arrow-down.svg`).then(
                data => tempMinArrow.src = data.default
            );
            // tempMinArrow.src = "./icons/arrow-down.svg";  // arrow down for min temp
            tempMinArrow.alt = "Arrow Down";
            tempMinArrow.style.height = "1rem";  // You can adjust this size
            
            let tempMin = document.createElement("div");
            tempMin.id = "temp-min";
            tempMin.textContent = forecast[i].tempmin + "\u00B0";
            
            tempMinDiv.append(tempMinArrow, tempMin);  // Append arrow and temp to tempMinDiv
        
            let tempMaxDiv = document.createElement("div");
            tempMaxDiv.style.display = "flex";
            tempMaxDiv.style.alignItems = "center";
            tempMaxDiv.style.gap = "4px";
        
            let tempMaxArrow = document.createElement("img");
            import(`../icons/arrow-up.svg`).then(
                data => tempMaxArrow.src = data.default
            );
            // tempMaxArrow.src = "./icons/arrow-up.svg";  // arrow up for max temp
            tempMaxArrow.alt = "Arrow Up";
            tempMaxArrow.style.height = "1rem";  // Adjust size here too
            
            let tempMax = document.createElement("div");
            tempMax.id = "temp-max";
            tempMax.textContent = forecast[i].tempmax + "\u00B0";
            
            tempMaxDiv.append(tempMaxArrow, tempMax);  // Append arrow and temp to tempMaxDiv
        
            // Now append the min/max temperature divs into div3 and div4
            div3.append(tempMinDiv, tempMaxDiv);
            div3.classList.add("test");
            // div4.append(tempMaxDiv);
        
            // Create the final div that will contain all the elements
            let div = document.createElement("div");
            div.append(div1, div2, div3);
        
            forecastContent.append(div);
        }

        //
        let todayForecast = document.getElementById("day-forecast");
        let hour = 24;
        let currentTime = this.app.getCurrentTime(); 
        todayForecast.innerHTML = ""; 
        for(let i = 0; i < 24; ++i) {
            if (forecast[0].hours[i].datetimeEpoch >= currentTime) {
                --hour;
                let div1 = document.createElement("div"); 
                let div2 = document.createElement("div"); 
                let div3 = document.createElement("div"); 
                div1.append(forecast[0].hours[i].datetime.slice(0, 5)); 

                let img = document.createElement("img"); 
                import(`../icons/${forecast[0].hours[i].icon}.svg`).then(
                    data => img.src = data.default
                )
                div2.append(img); 
                div3.append(forecast[0].hours[i].temp + "\u00B0"); 

                let div = document.createElement("div");
                div.append(div1, div2, div3);

                todayForecast.append(div);
            }
        }
        for(let i = 0; i < hour; ++i) {
            let div1 = document.createElement("div"); 
            let div2 = document.createElement("div"); 
            let div3 = document.createElement("div"); 
            div1.append(forecast[1].hours[i].datetime.slice(0, 5)); 
            let img = document.createElement("img"); 
            import(`../icons/${forecast[1].hours[i].icon}.svg`).then(
                data => img.src = data.default
            )
            div2.append(img); 
            div3.append(forecast[1].hours[i].temp + "\u00B0");

            let div = document.createElement("div"); 
            div.append(div1, div2, div3); 
            todayForecast.append(div);
        }
    }

    searchButtonHandle() {
        let button = document.querySelector("button");
        let input = document.querySelector("input"); 
        let select = document.querySelector("select"); 
        button.addEventListener("click", async (e)=>{
            e.preventDefault();

            await this.app.fetchData(input.value, select.value); 
            // this.app.printData(input.value);
            input.value = "";
            this.render(); 
        })
    }
}