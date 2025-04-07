export class weather {
    #data; 
    constructor()  {
    }

    async fetchData(location, unit = "metric") {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=F9Q2TH846KU94TGCMV35UKLVJ&contentType=json`);
        this.data = await response.json();
    }

    async printData(location) {
        console.log(this.data);
    }

    getCity() {
        return this.data.resolvedAddress; 
    }

    getTemp() {
        return this.data.currentConditions.temp; 
    }

    getCondition() {
        return this.data.currentConditions.conditions; 
    }

    getUV() {
        return this.data.currentConditions.uvindex;
    }

    getHumidity() {
        return this.data.currentConditions.humidity; 
    }

    getSunrise() {
        return this.data.currentConditions.sunrise; 
    }

    getSunset() {
        return this.data.currentConditions.sunset; 
    }

    getPressure() {
        return this.data.currentConditions.pressure; 
    }

    getFeelslike() {
        return this.data.currentConditions.feelslike; 
    }

    getRainchance() {
        return this.data.currentConditions.precipprob; 
    }

    getForecast() {
        return this.data.days;
    }

    getCurrentIcon() {
        return this.data.currentConditions.icon;
    }

    getCurrentTime() {
        return this.data.currentConditions.datetimeEpoch; 
    }

    getTempMax() {
        return this.data.days[0].tempmax;
    }

    getTempMin() {
        return this.data.days[0].tempmin;
    }

    getRealFeel() {
        return this.data.currentConditions.feelslike;
    }

    getWindspeed() {
        return this.data.currentConditions.windspeed;
    }
}