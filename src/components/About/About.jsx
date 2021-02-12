import "./About.css";
import photo from "../../images/photo.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about__overlay">
        <img src={photo} alt="Фото автора" className="about__photo"></img>
      </div>
      <div className="about__info">
          <h3 className="about__title">Об авторе</h3>
          <p className="about__text">
          Это блок с&nbsp;описанием автора проекта. Здесь следует указать, 
          как вас зовут, чем вы&nbsp;занимаетесь, какими технологиями 
          разработки владеете.<br></br>
          Также можно рассказать о&nbsp;процессе обучения в&nbsp;Практикуме, 
          чему вы&nbsp;тут научились, и&nbsp;чем можете помочь потенциальным 
          заказчикам.
          </p>
      </div>
    </div>
  );
}

export default About;
