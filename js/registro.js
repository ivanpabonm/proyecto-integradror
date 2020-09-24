const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{6,40}$/,
    usuario:  /(?=^.{8,16}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/,
    contraseña: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
}

const campos = {
    correo:false,
    nombre:false,
    usuario:false,
    contraseña:false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;    
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
        case "contraseña":
            validarCampo(expresiones.contraseña, e.target, 'contraseña');
        break;
    }
    
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    
    if(campos.correo && campos.nombre && campos.usuario && campos.contraseña && terminos.checked){
        formulario.reset();
        
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() =>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        },5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
        });
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById('formulario__mensaje-terminos').classList.remove('formulario__mensaje-terminos-activo');
    }
    else {
        if(campos.correo && campos.nombre && campos.usuario && campos.contraseña)
        {
            document.getElementById('formulario__mensaje-terminos').classList.add('formulario__mensaje-terminos-activo');
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }
        else
        {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }
	}
});
