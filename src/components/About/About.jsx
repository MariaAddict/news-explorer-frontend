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
          Добро пожаловать! Меня зовут Каныгина Мария, я&nbsp;начинающий
          frontend-разработчик. Продпочитаемый стек: React.js. Основные навыки:
          HYML5, CSS3, JS, React.js, Node.js, Git, Express.js. Планирую изучать
          TypeScript, Redux. <br></br> 
          Я&nbsp;проходила обучение в&nbsp;Яндекс.Практикум,
          получила основные знания по&nbsp;frontend-разработчике
          и&nbsp;начальные знания по&nbsp;backend-разработке. Мне нравится
          продумывать интерфейсы для пользователей.
        </p>
      </div>
    </div>
  );
};

export default About;
