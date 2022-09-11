// copyright Jakub Zieliński (github.com/jzielinski47)



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

    let cities = []
    let county = []
    let voivodeship = []

    const execute = (path) => {
        let output = "";
        let index = 0;

        if (path.endsWith('/NAZWA')) cities = []
        if (path.endsWith('/POW')) county = []
        if (path.endsWith('/WOJ')) voivodeship = []


        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                console.log(result)
                if (path.endsWith(')]/NAZWA')) cities.push(result.childNodes[0].nodeValue)
                if (path.endsWith('/POW')) execute("//row[NAZWA_DOD='powiat' and POW='" + result.childNodes[0].nodeValue + "']/NAZWA")
                if (path.endsWith('/WOJ')) execute("//row[NAZWA_DOD='województwo' and WOJ='" + result.childNodes[0].nodeValue + "']/NAZWA")

                if (path.endsWith(']/WOJ')) voivodeship.push(result.childNodes[0].nodeValue)
                if (path.endsWith("']/NAZWA")) county.push(result.childNodes[0].nodeValue)

                result = nodes.iterateNext()
                index++;
            }
        }

        document.querySelector('#test').innerHTML = ''
        if (city.value.length > 0) {
            for (let i = 0; i < index; i++) {
                document.querySelector('#test').innerHTML += cities[i] + ', ' + county[i] + ', ' + voivodeship[i] + '<br />'
            }
        }
        console.log(cities, county, voivodeship)

        // if (city.value.length > 0) {
        //     document.querySelector('#test').innerHTML = output;
        //     console.log(output)
        // } else {
        //     document.querySelector('#test').innerHTML = ''
        // }

    }

    // małopolskie 
    // test (62 rekordy)
    // execute("//row[(NAZWA_DOD='miasto' or NAZWA_DOD='gmina miejska') and WOJ='12']/NAZWA")

    // cała Polska
    // execute("//row[(NAZWA_DOD='miasto' or NAZWA_DOD='gmina miejska')]/NAZWA")

    city.addEventListener('input', updateResults);

    function updateResults(e) {
        let content = e.target.value;
        content.toLowerCase()
        content = content.toString().charAt(0).toUpperCase() + content.toString().slice(1);
        console.log(content)

        // document.querySelector('#test').style.width = document.querySelector('.panel').style.width;

        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((starts-with(NAZWA_DOD,'miasto') or NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska')]/NAZWA")
        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((starts-with(NAZWA_DOD,'miasto') or NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska')]/POW")
        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((starts-with(NAZWA_DOD,'miasto') or NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska')]/WOJ")

    }

}

window.onload = () => {
    establishConnection()
}