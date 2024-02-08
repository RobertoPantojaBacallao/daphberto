import React, { useRef } from 'react';
import { Row, Col, Container } from 'reactstrap';
import {
    motion,
    Variants,
    useScroll,
    useSpring,
    useTransform,
    MotionValue
} from "framer-motion";
import { useImageSize } from 'react-image-size';

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image(props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    let height;

    //if (!props.isMobile) {
       height = 300;
    //} else {
    //   height = 600;
    //}

    const y = useParallax(scrollYProgress, height);

    let img_text;

    if (!props.isMobile) {
        img_text = (
            <span style={{ "textAlign": "left" }} >
                <motion.h1 style={{ y }}>{props.title}</motion.h1>
                <motion.h2 style={{ y }}>{props.date}</motion.h2>
                <motion.h3 style={{ y }}>{props.paragraph}</motion.h3>
            </span>)
    } else {
        img_text = (
            <span>
                <h1>{props.title}</h1>
                <h2>{props.date}</h2>
                <h3>{props.paragraph}</h3>
            </span>)
    }
    

    return (
        <section>
            <div ref={ref}>
                <img style={props.style}  src={props.image} alt="Daph" />
                { props.image2 != null && <img src={props.image2} alt="Daph" /> }
            </div>
            {img_text}
        </section>
    );
};

//let picture;

//const variant = {
//    visible: { scale: 1 },
//    hidden: { scale: 0 },
//};

//let cardVariants: Variants;

//function ReactComponent(props) {
//    return (
//        <Image image={props.image} title={props.title} paragraph={props.paragraph} />)
//};

//function ReactComponent(props) {

//    if (props.direction === 'left') {
//        cardVariants = {
//            offscreen: {
//                x: -500,
//            },
//            onscreen: {
//                x: 0,
//                transition: {
//                    type: "spring",
//                    bounce: 0.3,
//                    duration: 1
//                }
//            }
//        };
//    } else {
//        cardVariants = {
//            offscreen: {
//                x: 500
//            },
//            onscreen: {
//                x: 0,
//                transition: {
//                    type: "spring",
//                    bounce: 0.3,
//                    duration: 1
//                }
//            }
//        };

//    }

//    const { scrollYProgress } = useScroll();
//    const scaleX = useSpring(scrollYProgress, {
//        stiffness: 100,
//        damping: 30,
//        restDelta: 0.001
//    });

//    if (props.image2 != null) {
//        console.log('here');
//        picture =
//            <Row style={{ 'height': '100%' }}>
//                <Col>
//                    <img src={props.image} alt='daph' />
//                </Col>
//                <Col>
//                    <img src={props.image2} alt='daph' />
//                </Col>
//            </Row>
//    } else {
//        console.log('here');
//        picture = <img src={props.image} alt='daph' />
//    }

//    return (
//        <motion.div
//            className="mt-5 mb-5 row"
//            initial="offscreen"
//            whileInView="onscreen"
//            viewport={{ once: false, amount: 0.8 }}
//        >
//            <motion.div className="picture-under" variants={cardVariants}>
//            <Row style={{'height':'100%'}}>
//                    <Col>
//                        <Row>
//                            <Col>
//                                <h2>{props.title}</h2>
//                            </Col>
//                            <Col>
//                                <h3>August 2022</h3>
//                            </Col>
//                        </Row>
//                        <Row>
//                            <p>{props.paragraph}</p>
//                        </Row>
//                    </Col>
//                    <Col>
//                        {picture}
//                    </Col>
//                </Row>
//            </motion.div>
//        </motion.div>
//  );
//}

export default Image;