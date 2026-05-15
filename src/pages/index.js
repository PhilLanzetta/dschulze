import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Seo from "../components/seo"
import image1 from "../images/DS1.png"
import image2 from "../images/DS2.png"
import image3 from "../images/DS3.png"
import image4 from "../images/DS4.png"
import image5 from "../images/DS5.png"
import image6 from "../images/DS6.png"

const IndexPage = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const data = [
    { src: image1, fullBleed: false },
    { src: image2, fullBleed: false },
    { src: image3, fullBleed: true },
    { src: image4, fullBleed: false },
    { src: image5, fullBleed: true },
    { src: image6, fullBleed: false },
  ]

  const handleClick = () => {
    if (imageIndex < data.length - 1) {
      setImageIndex(prev => prev + 1)
    } else {
      setImageIndex(0)
    }
  }

  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(() => {
      // Use the functional update form of setCount to ensure you're using the latest state
      if (imageIndex < data.length - 1) {
        setImageIndex(prev => prev + 1)
      } else {
        setImageIndex(0)
      }
    }, 3000) // Update every 1000 milliseconds (1 second)

    // Clean up the interval when the component unmounts or the effect re-runs
    return () => clearInterval(intervalId)
  }, [imageIndex]) // Empty dependency array ensures the effect runs only once on mount and cleans up on unmount

  return (
    <>
      <Header></Header>
      <main onClick={handleClick} aria-label="go to next slide">
        {data.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt=""
            className={
              index !== imageIndex
                ? "hide"
                : item.fullBleed
                ? "full-bleed"
                : "bordered"
            }
          ></img>
        ))}
      </main>
    </>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
