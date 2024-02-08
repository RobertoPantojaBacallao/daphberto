import PictureComponent from './Components/PictureComponent';
import {
    motion,
    useScroll,
    useSpring,
} from "framer-motion";
import { useState, useEffect } from 'react';
import { ChevronDownOutline, ChevronUpOutline } from '@carbon/icons-react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import './css/global.css';

const json = require('./data.json')['items'];

const images = require.context('./img', true);

console.log(images);

const imageDict = json.map(image => {
    if ('img_name2' in image) {
        return ({
            'title': image.title,
            'date': image.date,
            'img': images(image.img_name),
            'img2': images(image.img_name2),
            "paragraph": image.paragraph,
            "style": image.style
        })
    } else {
        return ({
            'title': image.title,
            'date': image.date,
            'img': images(image.img_name),
            "paragraph": image.paragraph,
            "style": image.style
        })
    }
});

function App() {

    let page = [];

    const [width, setWidth] = useState(window.innerWidth);

    const isMobile = width <= 1170;

    if (isMobile) {
        import('./css/mobile.css');
        for (let i = 0; i < imageDict.length; i++) {
            page.push(<PictureComponent isMobile={isMobile} style={imageDict[i].style} image={imageDict[i].img} date={imageDict[i].date} title={imageDict[i].title} paragraph={imageDict[i].paragraph} />);
        }
    } else {
        import('./css/global.css');
        for (let i = 0; i < imageDict.length; i++) {
            page.push(<PictureComponent isMobile={isMobile} style={imageDict[i].style} image={imageDict[i].img} date={imageDict[i].date} image2={imageDict[i].img2} title={imageDict[i].title} paragraph={imageDict[i].paragraph} />);
        }
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function downOne() {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'auto',
        });
    }

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 45,
        restDelta: 0.001
    });

    return (
        <div id='wrapper' className='App'>
            <section>
                <Container>
                    <h1 style={{'top':'10%'}}>Hi Daphne!</h1>
                    <h2>test</h2>
                    { !isMobile && <ChevronDownOutline className="scrollDown" size={128} onClick={downOne} /> }
                </Container>
            </section>
            {page}
            <section>
                {!isMobile && <ChevronUpOutline className="scrollDown" size={128} onClick={topFunction} />}
            </section>
            <motion.div className="progress" style={{ scaleX }} />
        </div>
  );
};

export default App;
