class City {
    constructor(name, xml) {
        this.xml = xml;

        this.name = name.toString();
        this.voivodeship = this.searchVoivodeshipName(`//row[(RODZ='1' or RODZ='3') and NAZWA='${this.name}']/WOJ`);
        this.county = this.searchVoivodeshipName(`//row[(RODZ='1' or RODZ='3') and NAZWA='${this.name}' and WOJ='${this.voivodeship}']/POW`);

        this.vname;
    }

    searchVoivodeshipName = (path) => {
        if (this.xml.evaluate) {
            const nodes = this.xml.evaluate(path, this.xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                // console.log(result)
                return result.childNodes[0].nodeValue
                result = nodes.iterateNext()
            }
        }
    }

    searchCountyName = (path) => {
        if (this.xml.evaluate) {
            const nodes = this.xml.evaluate(path, this.xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                // console.log(result)
                return result.childNodes[0].nodeValue
                result = nodes.iterateNext()
            }
        }
    }

    rereadNames = () => {

    }

    display = () => {
        document.querySelector('#dist').innerHTML += `${this.name}, ${this.voivodeship}, ${this.county} <br>`
    }
}