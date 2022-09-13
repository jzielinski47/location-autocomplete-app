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

    const execute = (path) => {
        let output = "";
        let index = 0;

        if (path.endsWith(')]/NAZWA')) { cities = [] }
        if (path.endsWith('/POW')) { county = [] }
        if (path.endsWith('/WOJ')) { voivodeship = [] }


        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                // console.log(result)
                if (path.endsWith('/NAZWA')) { cities.push(result.childNodes[0].nodeValue) }
                else if (path.endsWith('/WOJ')) { voivodeship.push(result.childNodes[0].nodeValue) }
                else if (path.endsWith('/POW')) { county.push(result.childNodes[0].nodeValue) }


                result = nodes.iterateNext()
                index++;
            }
        }

        document.querySelector('#test').innerHTML = ''
        let w = "";
        if (city.value.length > 0) {
            for (let i = 0; i < index; i++) {
                console.log("l:",cities[i], countyNamesList[countyIndexList.indexOf(county[i])], voivodeshipNamesList[voivodeshipIndexList.indexOf(voivodeship[i])])
                w += cities[i] + ', ' + search("row[NAZWA_DOD='powiat' and POW='" + county[i] + "' and WOJ='"+ voivodeship[i]+"']/NAZWA") + ', ' + voivodeshipNamesList[voivodeshipIndexList.indexOf(voivodeship[i])] + '<br />'
            }
            console.log(w);
            document.querySelector('#test').innerHTML = w;
        }
        // console.log(cities, county, voivodeship)

        // if (city.value.length > 0) {
        //     document.querySelector('#test').innerHTML = output;
        //     console.log(output)
        // } else {
        //     document.querySelector('#test').innerHTML = ''
        // }
        //...

    }

    function search(path) {

        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            result = nodes.iterateNext()
            while (result) {
                console.log(result.childNodes[0].nodeValue)
                result = nodes.iterateNext()
            }
        }
    }

    function modifiedSearch(path, dist) {

        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            result = nodes.iterateNext()
            while (result) {
                dist.push(result.childNodes[0].nodeValue)
                result = nodes.iterateNext()
            }
        }
    }

    function search(path) {
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            result = nodes.iterateNext()
            while (result) {
                return result.childNodes[0].nodeValue;
                result = nodes.iterateNext()
            }
        }
    }

    const initAdministration = () => {
        modifiedSearch("//row[NAZWA_DOD='województwo']/WOJ", voivodeshipIndexList)
        modifiedSearch("//row[NAZWA_DOD='województwo']/NAZWA", voivodeshipNamesList)

        // powiaty potrzebuja naprawy

        modifiedSearch("//row[NAZWA_DOD='powiat' and WOJ='12']/POW", countyIndexList)
        modifiedSearch("//row[NAZWA_DOD='powiat' and WOJ='12']/NAZWA", countyNamesList)
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

        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/NAZWA")
        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/POW")
        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((sNAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska' or RODZ='1' or RODZ='3')]/WOJ")


    }

    initAdministration()

}

window.onload = () => {
    establishConnection()
}

