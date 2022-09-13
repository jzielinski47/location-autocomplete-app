// copyright Jakub Zieliński (github.com/jzielinski47)

let tempMemory = []

const establishConnection = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlActionGroup(xhttp.responseXML);
        }
    };
    xhttp.open("GET", "terc.xml", true);
    xhttp.send();

}

const xmlActionGroup = (xml) => {

    const city = document.querySelector('#city')
    const dist = document.querySelector('#dist')

    // an idea to use an object oriented search
    let object = { city: null, county: null, voivodeship: null }

    function execute(path) {

        let output = ''

        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {

                const value = result.childNodes[0].nodeValue

                if (path.endsWith('/NAZWA')) {
                    object.city = value;
                    output += `${object.city}`;
                }

                if (path.endsWith('/WOJ')) {
                    object.voivodeship = search(`//row[NAZWA_DOD="województwo" and WOJ='${value}']/NAZWA`);
                    output += `${object.voivodeship}`;
                }

                if (path.endsWith('/POW')) {
                    object.county = search(`//row[NAZWA_DOD="powiat" and WOJ='${object.voivodeship}' and POW='${value}']/NAZWA`);;
                    output += `${object.county}`;
                }

                result = nodes.iterateNext()

            }
        }

        console.log(output)

    }

    function search(path) {
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                return result.childNodes[0].nodeValue
                result = nodes.iterateNext()
            }
        }
    }

    // małopolskie 
    // test (62 rekordy)
    // execute("//row[(NAZWA_DOD='miasto' or NAZWA_DOD='gmina miejska') and WOJ='12']/NAZWA")
    // execute(`//row[(RODZ='1' or RODZ='3') and WOJ='12']/NAZWA`)

    // cała Polska
    // execute("//row[(NAZWA_DOD='miasto' or NAZWA_DOD='gmina miejska')]/NAZWA")



    city.addEventListener('input', updateResults);

    function updateResults(e) {
        let content = e.target.value;
        content.toLowerCase()
        content = content.toString().charAt(0).toUpperCase() + content.toString().slice(1);
        console.log('on-input:', content)

        // execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/NAZWA")
        // execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/POW")
        // execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((sNAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/WOJ")

        execute(`//row[starts-with(NAZWA,'${content.toString()}') and (RODZ='1' or RODZ='3')]/NAZWA`)
        execute(`//row[starts-with(NAZWA,'${content.toString()}') and (RODZ='1' or RODZ='3')]/WOJ`)
        execute(`//row[starts-with(NAZWA,'${content.toString()}') and (RODZ='1' or RODZ='3')]/POW`)


    }



}


window.onload = () => establishConnection()


