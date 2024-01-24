"use client";

import React, { useEffect, useState } from "react";

const PAINTING_PAGE = () => {
  const colorPalette = [
    { brushColor: "#910A67" },
    { brushColor: "#FF9800" },
    { brushColor: "#6DA4AA" },
    { brushColor: "#B19470" },
    { brushColor: "#7360DF" },
    { brushColor: "#B80000" },
    { brushColor: "#6B240C" },
  ];

  const [currentColorPalette, setCurrentColorPalette] = useState(0);

  const [brushPosition, setBruchPosition] = useState({ x: 0, y: 0 });
  const [showBrush, setShowBrush] = useState(false);

  const [changeColor, setChangeColor] = useState(0);

  useEffect(() => {
    const updateColorPalette = () => {
      if (currentColorPalette === 6) {
        setCurrentColorPalette(0);
        return;
      }
      setCurrentColorPalette(currentColorPalette + 1);
    };

    const paintTheCanvas = () => {
      setChangeColor(changeColor + 1);
      const canvas = document.getElementById("canvas");

      const paintSpots = canvas?.childElementCount;
      if (paintSpots && changeColor > 150) {
        setChangeColor(0);
        updateColorPalette();
      }
      if (paintSpots && paintSpots > 1000) {
        setChangeColor(0);
        updateColorPalette();
        while (canvas.firstChild) {
          canvas.lastChild && canvas.removeChild(canvas.lastChild);
        }
      }

      const paintSpotOne = document.createElement("span");

      paintSpotOne.style.width = "300px";
      paintSpotOne.style.height = "300px";
      paintSpotOne.style.borderRadius = "50%";
      paintSpotOne.style.backgroundColor = `${colorPalette[currentColorPalette].brushColor}`;
      paintSpotOne.style.position = "absolute";
      paintSpotOne.style.left = `${brushPosition.x - 150}px`;
      paintSpotOne.style.top = `${brushPosition.y - 150}px`;
      paintSpotOne.style.transitionDuration = "400ms";
      paintSpotOne.id = "paintSpot";

      canvas?.appendChild(paintSpotOne);

      setTimeout(() => {
        paintSpotOne.style.scale = "0";
        setTimeout(() => {
          canvas?.removeChild(paintSpotOne);
        }, 2000);
      }, 1500);
    };

    const updateBrushPosition = (e: any) => {
      setBruchPosition({ x: e.clientX, y: e.clientY });
      showBrush && paintTheCanvas();
    };
    const canvas = document.getElementById("canvas");

    document.addEventListener("mousemove", updateBrushPosition);
    canvas?.addEventListener("mouseenter", function () {
      setShowBrush(true);
    });

    return () => {
      document.removeEventListener("mousemove", updateBrushPosition);
      canvas?.removeEventListener("mouseleave", function () {
        setShowBrush(false);
      });
    };
  });

  return (
    <>
      <div
        id="canvas"
        className={`bg-gray-200 w-full h-screen  relative overflow-hidden `}
      ></div>
    </>
  );
};

export default PAINTING_PAGE;
