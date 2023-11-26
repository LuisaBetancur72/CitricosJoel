import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./Politica.scss"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export const Politica =()=>
{  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="Box1" >
      <Box className="Box2">
        <Tabs value={value} onChange={handleChange}className='Tabs'>
          <Tab label="FINALIDAD Y TRATAMIENTO" />
          <Tab label="RESPONSABLE Y ENCARGADO DEL TRATAMIENTO DE DATOS" />
          <Tab label="COOKIES" />
          <Tab label="AUTORIZACIÓN PARA RECOLECCIÓN" />
          <Tab label="ALMACENAMIENTO DE DATOS PERSONALES"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          <p>3.1. FINALIDADES</p>
          <p>Las finalidades para las cuales MAZDA tratará los Datos Personales de los Titulares son:</p>
          <p>3.1.1. En relación con la base de datos de clientes:</p>
          <ul>
            <li>Cumplir los contratos de servicios celebrados con clientes.</li>
            <li>Utilizar los Datos Personales para mercadeo y/o comercialización de nuevos servicios o productos de MAZDA.</li>
            <li>Medir niveles de satisfacción.</li>
            <li>Realizar encuestas.</li>
            <li>Contactar a los titulares para realizar recordatorios sobre mantenimientos y de vencimientos de garantías, así como para informarles sobre los causales que podrían llevar a la pérdida de cobertura.</li>
            <li>Ejecutar campañas de fidelización.</li>
            <li>Enviar invitaciones a eventos.</li>
            <li>Ofrecer productos y servicios de MAZDA.</li>
            <li>Comunicar información relacionada con productos para la financiación en la adquisición de bienes y servicios de MAZDA.</li>
          </ul>
          <p>3.2. EN RELACCIÓN CON LA BASE DE DATOS DE CLIENTES:</p>
          <ul>
            <li>Contactar a los Titulares para ofrecerles bienes y servicios de su interés, recibir ofertas de MAZDA, invitar a la participación en programas, proyectos eventos, socializar políticas, proyectos, programas, resultados y cambios organizacionales.</li>
            <li>Suministrar la información y datos personales de los Titulares a las sociedades subsidiarias, filiales o afiliadas a MAZDA, aliados comerciales o a otras sociedades o personas que MAZDA encargue para realizar el procesamiento de la información y cumplir con las finalidades descritas en la presente Política.</li>
            <li>Suministrar la información y datos personales de los Titulares a aliados comerciales para que estos contacten a los Titulares para ofrecerles bienes y servicios de su interés, recibir ofertas de los titulares, invitar a la participación en programas, proyectos eventos, socializar políticas, proyectos, programas, resultados y cambios organizacionales.</li>
          </ul>
          <p>3.3. Finalidades comunes a todas las bases de datos:</p>
          <ul>
            <li>Gestionar toda la información necesaria para el cumplimiento de las obligaciones tributarias y de registros comerciales, corporativos y contables de MAZDA.</li>
            <li>La socialización de políticas, proyectos, programas y cambios organizacionales.</li>
            <li>El control y la preservación de la seguridad de las personas, bienes e información de MAZDA.</li>
            <li>Contactarlo como potencial cliente para mantenerlo informado y ofrecerle nuestros servicios o mejorar los existentes.</li>
            <li>Dar respuesta a preguntas, quejas, reclamos, comentarios o sugerencias respecto de los productos y/o servicios ofrecidos por MAZDA.</li>
          </ul>

            
          
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <p><br/>El Responsable del Tratamiento de Datos Personales y otra información de los Titulares es MAZDA DE COLOMBIA S.A.S., NIT 900.703.240-3, domicilio y dirección en la Carrera 7° N° 75-66 oficinas 601 y 602, Bogotá, Colombia; teléfono: (031) 3073700 ; correo electrónico:servicioalcliente@mazda.co.</p>          
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div>
          <p><br/>MAZDA utiliza cookies y otras herramientas que automáticamente recolectan información de las personas cuando usan la Pagina Web, entendiendo que el ingreso a la Pagina Web es una conducta inequívoca de autorización. El tipo de información que puede ser recolectada de esta manera incluye:</p>
          <p>Información sobre el Localizador de recursos uniforme (URL)</p> 
          <p>Información acerca del explorador que utiliza el Titular</p>
          <p>Detalles de las páginas visitadas por el Titular</p>
          <p>Dirección IP</p>
          <p>Clicks</p>
          <p>Hipervínculos</p>
          <p>Consultas</p>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div>
          <p><br/>
          Mediante el suministro voluntario de alguno de los Datos Personales en la forma señalada en la presente Política y/o la autorización expresa verbal o por escrito, el Titular autoriza expresa o inequívocamente a MAZDA para recolectar sus Datos Personales y cualquier otra información que llegare a suministrar, así como para realizar el Tratamiento sobre sus Datos Personales, de conformidad con esta Política de Privacidad y las normas legales aplicables.
          </p>
        </div>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <div>
          <p><br/>
          El Titular autoriza de manera expresa a MAZDA para que almacene los Datos Personales de la forma que considere más segura y oportuna para la debida protección de los datos de los Titulares.
          </p>
        </div>

      </CustomTabPanel>
    </Box>
  );
}
