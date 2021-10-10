class Usuarios {
    constructor() {
        this.personas = [];
    };

    agregarPersona(idSocket, idDataBase, nombre, correo, img) {
        let persona = { idSocket, idDataBase, nombre, correo, img }
        this.personas.push(persona);
    };

    getPersonaByIdSocket(idSocket) {
        let persona = this.personas.filter(persona => { return persona.idSocket === idSocket })[0];
        return persona;
    };

    getPersonaByIdDataBase(idDataBase) {
        let persona = this.personas.filter(persona => { return persona.idDataBase === idDataBase });
        return persona;
    };

    getPersonas() {
        return this.personas;
    };

    borrarPersonasById(idSocket) {
        let personaBorrada = this.getPersonaByIdSocket(idSocket);
        this.personas = this.personas.filter(persona => { return persona.idSocket != idSocket });
        return personaBorrada;
    };


};

module.exports = {
    Usuarios
};