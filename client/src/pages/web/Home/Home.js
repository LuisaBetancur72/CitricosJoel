import React, { useState, useRef, useEffect } from "react";
import Menu from "../../web/Menu/Menu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.scss";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Sliders } from "../../../api";
import Logo from '../../../assets/png/logo.png';
import Detal from '../../../assets/png/Detal.png';
import Mayor from '../../../assets/png/Mayor.png';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';


const settingsRTL = {
  dots: true,
  infinite: true,
  speed: 590,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5290,
  autoplay: true,
  rtl: true,
  centerMode: true,
  centerPadding: "0",
};

export const Home =()=>{
  const authController = new Sliders();
  const [post ,setSliders] = useState([]);

  useEffect(() => {
    // Lógica para obtener los sliders desde la base de datos
    const fetchSliders = async () => {
      try {
        const sliders  = await authController.getSliders(); // Llama a tu función para obtener los sliders
        setSliders(sliders || []);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders(); // Llama a la función al montar el componente
  }, []);


  const Puntos = [
    {Id: "1", title: "Punto Detal",description:"En Nuestro Punto al Detal podras encontrar toda clase de citricos en cualquier calidad adicional otras frutas como lulo, tomate de arbol, maracuya a los mejores precios",Create_at: "11/10/23", avatar: Detal,},
    {Id: "2",title: "Punto Al Por Mayor",description:"En nuestro punto al por mayor podras encontrar todas la calidades de citricos para surtit tu negocio",Create_at: "11/10/23",avatar: Mayor,},
  ];
  const Centro = [
    {Id: "2",title: "Clisificacion",description:"Proceso de clasificacion",Create_at: "11/10/23", url: 'https://youtube.com/shorts/YDSfGn1IJeo?feature=share',},
    {Id: "3",title: "Lavado",description:"Proceso de labado y encerado",Create_at: "11/10/23", url: 'https://youtube.com/shorts/Ss37gT68DZs?feature=share',},
  ];

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedposts, setSelectedposts] = useState(null);

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
  };
  const contactSectionRef = useRef(null);

  const [expandedVideo, setExpandedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setExpandedVideo(videoUrl);
  };
  
  return (
    <div className="home">
      <Menu onSectionClick={handleSectionClick} />
      <div className="content">
        <section
          id="/"
          className={`section-padding1 ${
            selectedSection === "Flexbox" ? "active" : ""
          }`}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="slideContainer" id="slideContainer">
                  <Slider {...settingsRTL} className="slider">
                    {Array.isArray(post) &&
                    post.filter((slider) => slider.active === true)
                    .map((slider) => (
                    console.log('slider:', slider),
                      <Card key={slider._id}>
                        <CardMedia
                          className="cardMedia-post"
                          component="img"
                          src={slider.images}
                        />
                      </Card>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="puntosdeventa"
          ref={contactSectionRef}
          className={`section-padding2 ${
            selectedSection === "puntosdeventa" ? "active" : ""
          }`}
        >
          <div className="container1">
            <div className="row">
              <div className="col-md-3 wow fadeInLeft delay-05s">
                <div className="section-title">
                  <p className="sec-para"> Puntos De Venta</p>
                </div>
              </div>
              <div className="card-punto-container">
              {Puntos.map((punto) => (
              <Card
                key={punto.Id}
                className={
                selectedposts && selectedposts.Id === punto.Id
                  ? "active card"
                  : "card"
                  }
              >
              <CardMedia
                className="cardMediaPunto"
                component="img"
                src={punto.avatar}
                alt="green iguana"
                />
              <CardContent className="CardPunto">
              <Typography gutterBottom component="div" className="title">
                {punto.title}
                </Typography>
                <Typography gutterBottom component="div" className="description">
                {punto.description}
              </Typography>    
              </CardContent>
              </Card>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="centrodeclasificacion"
          className={`section-padding3 ${
            selectedSection === "centrodeclasificacion" ? "active" : ""
          }`}
        >
        <div className="container2">
            <div className="row">
              <div className="col-md-3 wow fadeInLeft delay-05s">
                <div className="section-title">
                  <p className="sec-para">Centro De Clasificacion</p>
                </div>
              </div>
              <div className="video-section">
            {Centro.map((video) => (
            <div
              key={video.url}
              className={`video ${expandedVideo === video.url ? 'expanded' : ''}`}
              onClick={() => handleVideoClick(video.url)}
              >
            <ReactPlayer className='Player'
              url={video.url}
              controls
              />
              <div className="video-info">
              <h2>{video.title}</h2>
              <p>{video.description}</p>
      </div>  
        </div>
        
      ))}
            </div>
          </div>
      </div>
      </section>
  <div className="footer3">
    <div className="Ubicacion">
      <div class="ubicacion-icon-container">
        <svg className="ubicacion-icon" xmlns="http://www.w3.org/2000/svg" >
            <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"></path><path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"></path><path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"></path><path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"></path><path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"></path>
        </svg>
        <a href="https://maps.app.goo.gl/g1E9Fgt27G1swA6w6">Plaza Minorista</a>
      </div>
    <div className="Telefono">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEs0lEQVR4nNVVTWxbRRA2vcABKAcEJ+R4d9a765/4PdvPVuw0btwAaSqVlKqNSYt6aBKnATWhVAqtIMkFCFFRlVBFqrggAocKqlL1htTAARqK4MCFCKkHLiAkKohrv6T5qRbNi/9jJw6xkFhp5PXuzHzfzt+z2f5PCwAeZsylESISlIpXCBHDKNl9oqGB+VCnrqBOp/NJANdrzBP+noJ3mevxBfe+ZMrXObKkJybWUHCPZ1yLp1DH6Q7fBhBDaLsTYAdzBa8A9y01dpxdbDozq1ovmip+SW0qqNN05qbydry+iLbow27nDTUD2+32R5jULgLXFvXuyZW9F1JbglYTtPV3T64C10yQ2vtbpodS6WZCv+NpS2ZiE3f/NXC5oC9PW9JkMniHMSYrgjsc4lngesZIfv6gkpPmsV+U0TOjvO2DaWF0LDCXYVJwr6LgXoQOLHj3D6WNnk8s3Uo+jORnD4DraULkvhJwzl1HmDTM6PkfNxj5u6eWmSeaoc7GFMjAVQB50uGQbfgSzvljKLjHM7wD6b+KuswbTaNtub/IuR8Uk8GMA9yHLXAA8RyIgNk8Ol+RNaVCORxOw2az7aq5kGy2XWiDtpV87hmdVyADJkbdRpnvbmjgWtX8oZP1FHmeplT0gQx+BK7QvMPBjxXSx4/hGd6hDiHkqfWaqkwABTEp9/1pw1AwT6Rq0eUIECJGROTIcih5RfkOnlOU8rFC8fIxPMM71EHdzQjsvfC3Yp7mDGHuxLoD7ntXRg5nWqdWSvP1xm1FmXcxBxI4/oF1jr/lBCrdoS36KJkTUysKsSjXxotz9hCTwRuNB84uFRcLCD1NKW8tBwmeuKwo9byXMwanZwLPygkQ4mzGqo8Mz+UJ+A6eX2Iy+OWGmnK5XI/iDAj2zKxZ4NyfyYFnU/B2jkDz6M8KHQN437GE6+lcEaMO6hbsCiSMnpk14P5fAeDx6uNXaCngugkgYkUh3ouEom/+VFLJgePTKvDytCruINTBrkKbfIRAxNAefSPGpv1DqQhk267wAuHPRIa/q3nyrafPnyHEGS90Cguhb9t2FqkA3jq5rIyTHyvZdBTTYAnucQIWF3ElEtsH56XgsfE/lAx3KhkdUP7uORU+dc8Sf/ctJSP9SoQ6LZ1SEgFz2yRIHnyu5OUI7u24rMKvrlriO3RNaS9+kf/f2DGtRPhQhUhsgwSl7mdAaPfK+9cKe3TAApJNfXnQnOTOXNGkMno/3TBP0Cf6ruH1fNDXOXK/vLAwz1bYs4D60ZsKZIsCGVN612z+3P/St0pGEhsKs/GFt+4Twk/XEAGeHzjFAtyvQqdS+ZAjsGj5WvGWWcVcMesM70L9CxjyDfbl03MHBK7nCSA431NM4LoK9f+lQATrT0BaKbhVSEHXrEUCwfXEV0Up+EbJpq76EzB6ZqxWq16EyfUijPRaM6HuBFonl60+x1ar1obe/ZcsnfKval0IxLODCAGw1bDasSaw6DDs+PLyQVR3AvHs9xxDjHnGwkTBtisfxTsgIPo87UNmrR+eWsXbPmhSKnq3JGC3+54Arv+OBoETH6p6iOf50yYI7TdCyG5bLYsQshvZUsrH6yOit2bw/3r9AzwljFjZ792iAAAAAElFTkSuQmCC"></img>
      <p>3146899447</p> 
    </div>
    </div>
      <div className="Redes">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
           <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
        </svg>
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
           <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        </svg>
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
        </svg>
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
        </svg>
      </div>
      <div className="Politica">  
        <Link to="/Politica">Politica y Privacidad</Link>
        <img src={Logo} alt="Logo UAM" className="logo" />
      </div>

  </div>
    </div> 
    </div>
  );

}
