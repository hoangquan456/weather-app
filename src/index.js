import "./styles.css";
// import "./icons/";
import { weather } from "./js/weather-handling";
import { UI } from "./js/ui-handling";


let app = new weather(); 
let ui = new UI(app); 