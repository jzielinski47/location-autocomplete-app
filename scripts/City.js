class City {
    constructor(name, xml) {
        this.xml = xml;

        this.name = name.toString();
        this.voivodeship = this.search(`//row[(RODZ='1' or RODZ='3' or RODZ='9') and NAZWA='${this.name}']/WOJ`);
        this.county = this.search(`//row[(RODZ='1' or RODZ='3' or RODZ='9') and NAZWA='${this.name}' and WOJ='${this.voivodeship}']/POW`);

        this.vname = this.search(`//row[NAZWA_DOD='województwo' and WOJ='${this.voivodeship}']/NAZWA`);
        this.cname = this.search(`//row[(NAZWA_DOD='powiat' or contains(NAZWA_DOD,'na prawach powiatu'))and WOJ='${this.voivodeship}' and POW=${this.county}]/NAZWA`);

        // or contains(NAZWA_DOD,'na prawach powiatu') 

        console.log(this.vname, this.cname)
    }

    search = (path) => {
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

    display = () => {
        document.querySelector('#dist').innerHTML += `${this.name}, ${this.cname}, ${this.vname} <br>`
    }
}