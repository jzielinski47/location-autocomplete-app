class City {
    constructor(name) {
        this.name = name;
        this.county = county;
        this.voivodeship = this.searchVoivodeshipName;
    }

    searchVoivodeshipName = (path) => {
        if (xml.evaluate) {
            const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                return result.childNodes[0].nodeValue
                result = nodes.iterateNext()
            }
        }
    }
}