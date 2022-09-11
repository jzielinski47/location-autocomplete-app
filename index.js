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
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                console.log(result)
                output += result.childNodes[0].nodeValue + '<br />'
                result = nodes.iterateNext()
            }
        }

        if (city.value.length > 0) {
            document.querySelector('#test').innerHTML = output;
            console.log(output)
        } else {
            document.querySelector('#test').innerHTML = ''
        }

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

        execute("//row[starts-with(NAZWA,'" + content.toString() + "') and ((starts-with(NAZWA_DOD,'miasto') or NAZWA_DOD='miasto') or NAZWA_DOD='gmina miejska')]/NAZWA ")
    }

}

establishConnection()















































































// ...