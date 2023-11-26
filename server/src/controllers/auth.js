const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");
const nodemailer = require('nodemailer');
const twilio= require('twilio');

const sendActivationNotification = async (phone) => {
  if (!phone) {
    console.error('Número de teléfono no válido');
    return;
  }

  const accountSid = 'AC228d7f014c53780fc849c0e4be0e5985';
  const authToken = 'd6bc26cc5054067c56e119d85723623b';
  const client = require('twilio')(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: '¡Bienvenido! Te has registrado exitosamente.',
      from: '+12512659034',
      to: '+573167933773',
    });

    console.log('Mensaje de activación enviado:', message.sid);
  } catch (error) {
    console.error('Error al enviar el mensaje de activación:', error);
  }
};


const sendActivationEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'luisita.311@hotmail.com',
      pass: 'Colombia22*',
    },
    tls:{
      ciphers: 'SSLv3',
    },
  });

  let activationLink = 'http://localhost:3000/admin/login';

  const mailOptions = {
    from: 'luisita.311@hotmail.com',
    to: email,
    subject: 'Activa tu cuenta',
    text: `Haz clic en el siguiente enlace para activar tu cuenta: ${activationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};



const register = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, new_password, documentType, document, role, phone } = req.body;
  
  try {
    // Validar campos requeridos
    if (!email) {
      return res.status(400).send({ msg: "El email es requerido" });
    }
    if (!new_password) {
      return res.status(400).send({ msg: "La contraseña es requerida" });
    }

    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(new_password, salt);
    
    const newUser = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      documentType,
      role,
      active: false,
      document,
      new_password: hash_password,
      phone,
    });
    const userStorage = await newUser.save();
    await sendActivationEmail(userStorage.email);
    await sendActivationNotification(userStorage.phone);
    
    if(!userStorage.active){
      userStorage.active=true,
      userStorage.save();
    }   
    console.log(userStorage);
    res.status(201).send(userStorage);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};
/* Función que permite iniciar sesión */

const login = async (req, res) => {
  console.log('acáaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  const { email, new_password } = req.body;
  console.log(req.body);
  try {
    if (!email || !new_password) {
      throw new Error("El email y la contraseña son obligatorios");
      console.log('no recibe datos');
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(new_password, userStore.new_password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    if (!userStore.active) {
      throw new Error("Usuario no autorizado o no activo");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore),
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
    console.log();
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ msg: "Token requerido" });
    }
    const { user_id } = jwt.decoded(token);
    // Buscar el usuario utilizando una promesa
    const userStorage = await User.findOne({ _id: user_id });
    // Generar un nuevo token de acceso
    const accessToken = jwt.createAccessToken(userStorage);
    // Enviar la respuesta
    return res.status(200).send({ accessToken });
  } catch (error) {
    console.error("Error del servidor:", error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};
