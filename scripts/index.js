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
    const dist = document.querySelector('#dist')

    const search = path => {
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            let i = 1;
            while (result) {
                console.log(i, result.childNodes[0].nodeValue)
                result = nodes.iterateNext(); i++;
            }
        }
    }

    const searchCityName = path => {
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                console.log(result.childNodes[0].nodeValue)
                let city = new City(result.childNodes[0].nodeValue, xml)
                city.display()
                result = nodes.iterateNext();
            }
        }
    }

    city.addEventListener('input', event => {
        let content = event.target.value;
        content.toLowerCase();
        content = content.toString().charAt(0).toUpperCase() + content.toString().slice(1);
        console.log('on-input:', content)

        if (content.length > 0) {
            dist.innerHTML = ''
            searchCityName(`//row[(RODZ='1' or RODZ='3') and starts-with(NAZWA,'${content}')]/NAZWA`)
        } else {
            dist.innerHTML = ''
        }

    });


    // małopolskie 
    // search(`//row[(RODZ='1' or RODZ='3') and WOJ='12']/NAZWA`)

    // cała polska
    // search(`//row[(RODZ='1' or RODZ='3') and WOJ='12']/NAZWA`)


    search(`//row[POW='65']/NAZWA`)

}




window.onload = () => establishConnection()


