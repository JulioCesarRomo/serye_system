export const ExpresionesRegulares = [
    {
        //correo electronico
        id: 0,
        expresion: '^(([^<>()\\[\\]\\\\.,;:\\s@”]+(\\.[^<>()\\[\\]\\\\.,;:\\s@”]+)*)|(“.+”))@((\\[[0–9]{1,3}\\.[0–9]{1,3}\\.[0–9]{1,3}\\.[0–9]{1,3}])|(([a-zA-Z\\-0–9]+\\.)+[a-zA-Z]{2,}))$',
        mensaje: 'Este campo solo admite formatos de correo validos'
    },
    {
        //nombre de usuario
        id: 1,
        expresion: '^([A-Za-z0-9_-]|[.]){3,24}$',
        mensaje: 'Este campo admite letras, digitos, guion bajo, guion alto y punto. La longitud mínima es de 3 y la máxima es de 16'
    },
    {
        //codigo de recuperacion
        id: 2,
        expresion: new RegExp('^([A-Za-z0-9]){10}$'),
        mensaje: 'Este campo solo admite 10 letras y/o digitos'
    },
    {
        //nombre
        id: 3,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú]*[.]?)([ ](([d][e])|([A-ZÑÁÉÍÓÚa-zñáéíóú]*[.]?)))*$',
        mensaje: 'Este campo admite letras y puntos. Cada palabra debe de empezar con mayúscula'
    },
    {
        //apellido
        id: 4,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú]*[.]?)([ ](([l][a])|([d][e])|([A-ZÑÁÉÍÓÚa-zñáéíóú]*[.]?)))*$',
        mensaje: 'Este campo admite letras y puntos. Cada palabra debe de empezar con mayúscula'
    },
    {
        //empresa
        id: 5,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú0-9_-]|[.]|[ ])*$',
        mensaje: 'Este campo admite letras, digitos, guion bajo, guion alto, punto y espacio'
    },
    {
        //rfc persona moral
        id: 6,
        expresion: '^([A-Za-z]){3}([0-9]){6}([A-Za-z0-9]){3}$',
        mensaje: 'Este campo admite 3 letras, seguido de 6 digitos seguido de 3 letras o digitos'
    },
    {
        //rfc persona física
        id: 7,
        expresion: '^([A-Za-z]){4}([0-9]){6}([A-Za-z0-9]){3}$',
        mensaje: 'Este campo admite 4 letras, seguido de 6 digitos seguido de 3 letras o digitos'
    },
    {
        //Código postal
        id: 8,
        expresion: '^([0-9]){5}$',
        mensaje: 'Este campo admite 5 digitos'
    },
    {
        //Lada
        id: 9,
        expresion: '^([+]([0-9])+){1,2}$',
        mensaje: 'Este campo solamente adminte digitos y el caracter de adicion (+), es necesario que la lada inicie con este ultimo caracter.'
    },
    {
        //Telefono
        id: 10,
        expresion: '^[(]([0-9]){3}[)]\\s{1}([0-9]){3}[-]([0-9]){4}$',
        mensaje: 'Este campo admite 10 digitos'
    },
    {
        //Colonia y calle
        id: 11,
        expresion: '^([A-ZÑÁÉÍÓÚ0-9]{1}[a-zñáéíóú0-9]*[.]?)([ ]([A-ZÑÁÉÍÓÚ0-9]{1}[a-zñáéíóú0-9]*[.]?))*$',
        mensaje: 'Este campo admite letras, digitos y puntos. Cada palabra debe de empezar con mayúscula'
    },
    {
        //Numero exterior y numero interior
        id: 12,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú0-9_-]|[#]|[.]|[ ])*$',
        mensaje: 'Este campo admite letras, digitos, guion bajo, guion alto, simbolo de #, punto y espacio'
    },
    {
        //Cantidades enteras
        id: 13,
        expresion: '^[1-9]+[0-9]*$',
        mensaje: 'Este campo admite dígitos y no debe iniciar con 0'
    },
    {
        //Cantidades monetarias
        id: 14,
        expresion: '^((([1-9])+([0-9])*)|[0])[.]([0-9]){2}$',
        mensaje: 'Este debe empezar mínimo con un dígito, seguir de un punto decimal y finalizar con dos dígitos. Por ejemplo: 0.50, 230.00'
    },
    {
        //Observaciones
        id: 15,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú0-9]|[.]|[ ])*$',
        mensaje: 'Este campo admite letras, digitos, punto y espacio'
    },
    {
        //RFC
        id: 16,
        expresion: '^([A-Za-z]){3,4}([0-9]){6}([A-Za-z0-9]){3}$',
        mensaje: 'Este campo admite 3 o 4 letras, seguido de 6 digitos seguido de 3 letras o digitos'
    },
    {
        //UPC
        id: 17,
        expresion: '^([0-9]{12})$',
        mensaje: 'Este campo admite 12 digitos.'
    },
    {
        //Cantidades numéricas
        id: 18,
        expresion: '^((([1-9])+([0-9])*)|[0])([.]([0-9]){1,6})?$',
        mensaje: 'Este debe empezar mínimo con un dígito, puede contener un punto decimal y continuar 1 o 6 con dígitos. Por ejemplo: 20, 0.5, 230.500005'
    },
    {
        //"Ticket" de Kiosko (ObjectID)
        id: 19,
        expresion: '^[a-zA-Z0-9_]{24}$',
        mensaje: 'Este debe de contener solo caracteres alfanuméricos y debe tener una longitud de 24 caracteres. Por ejemplo: 5e8e613d858c1f8026a8ee9c'
    },
    {
        //Contraseñas
        id: 20,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú0-9_-]|[$]|[%]|[&]|[#]|[.]){8,24}$',
        mensaje: 'De 8 - 24 caractéres, admite letras, digitos, guion bajo/alto, punto y algunos caracteres especiales ($, %, & o #)'
    },
    {
        //Cantidades enteras
        id: 21,
        expresion: '^[0-9]+$',
        mensaje: 'Este campo admite dígitos'
    },
]
