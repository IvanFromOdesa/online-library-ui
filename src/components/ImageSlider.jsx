import React, { useState } from "react";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useTheme } from "@mui/material";

const ImageSlider = ({ slides }) => {
    const theme = useTheme();
    const [isShown, setIsShown] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "100%",
        position: "relative",
    };

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url( data:image/jpeg;base64,${slides[currentIndex]} )`,
    };

    const leftArrow = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "0px",
        fontSize: "45px",
        zIndex: 1,
        cursor: "pointer"
    };

    const rightArrow = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "0px",
        fontSize: "45px",
        zIndex: 1,
        cursor: "pointer"
    };

    const dotsContainerStyles = {
        display: "flex",
        justifyContent: "center",

    };

    const dotStyles = {
        fontSize: "1.5rem",
        margin: "0 3px",
        cursor: "pointer",
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    return (
        <div
            style={sliderStyles}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            {
                isShown && (
                    <div>
                        <ArrowCircleLeftOutlinedIcon style={leftArrow} onClick={goToPrevious} />
                        <ArrowCircleRightOutlinedIcon style={rightArrow} onClick={goToNext} />
                    </div>
                )
            }
            <div style={slideStyles}></div>
            <div style={dotsContainerStyles}>
                {
                    slides.map((slide, index) => (
                        <div key={index} style={dotStyles} onClick={() => goToSlide(index)}>
                            {
                                theme.palette.mode === "dark" ? "○" : "●"
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ImageSlider;