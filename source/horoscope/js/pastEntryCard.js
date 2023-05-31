
/**
 * Card displaying a past horoscope entry
 * 
 */
class pastEntryCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const article = document.createElement('article');

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'css/pastEntryCard.css');


        shadow.appendChild(style);
        shadow.appendChild(article);
    }

    /**
     * Called when the .data property is set on this element
     * 
     * @param {Horoscope} data - The data to pass into <past-entry-card>, 
     *                          as a Horoscope object of following format:
     *                          {
     *                              "sign": "string",
     *                              "birthday": "string",
     *                              "date": "string",
     *                          }
     */
    set data(data) {
        //if nothing passed, return
        if (!data) return;

        const article = this.shadowRoot.querySelector('article');
        console.log(data);

        /**
         * Display the image and name of the user's horoscope, 
         * as well as the birthday and date created, and a delete button
         */
        article.innerHTML = `
        <img class="horo" src="./images/Horoscopes/${data.sign}.png"
            alt="${data.sign}">
        <span class="sign">${data.sign}</span>
        <span class="birthday">${data.birthday}</span>
        <span class="date">${data.date}</span>
        <button class="delete" aria-label="Close alert" type="button">
            <span class="delete" aria-hidden="true">&#x2715;</span>         <!--Could also use &#10006;-->
        </button>
        `;
    }

    /**
     * Called when the .data property is retrieved on this element
     */
    get data(){
        // Query the article so you can get the information from it
        const article = this.shadowRoot.querySelector('article');


        const sign = article.querySelector(".sign").textContent;
        const date = article.querySelector(".date").textContent;
        // NOTE: because the dates are in M/D/YYYY format,
        // this code turns it into YYYY-MM-DD
        // This is because you need it in this format to update the birthday form
        let birthdayRaw = article.querySelector(".birthday").textContent.split("/").reverse();
        for (let i=1;i<birthdayRaw.length;i++){
            if (birthdayRaw[i].length==1){
                birthdayRaw[i] = "0" + birthdayRaw[i];
            }
        };
        const birthday = birthdayRaw.join("-");
        
        let horoscope = Horoscope(sign, birthday, date);
        return horoscope;
    }

    


}

customElements.define('past-entry-card', pastEntryCard);