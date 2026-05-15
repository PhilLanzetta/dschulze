import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Seo from "../components/seo"
import { slides } from "../data/slides"

const IndexPage = () => {
  const [imageIndex, setImageIndex] = useState(0)

  const handleClick = () => {
    setImageIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))
    }, 3000)

    return () => clearInterval(intervalId)
  }, [imageIndex])

  return (
    <>
      <Header />
      <main onClick={handleClick} aria-label="go to next slide">
        {slides.map((item, index) => (
          <img
            key={item.src}
            src={`/images/${item.src}`}
            alt=""
            className={
              index !== imageIndex
                ? "hide"
                : item.fullBleed
                ? "full-bleed"
                : "bordered"
            }
          />
        ))}
      </main>
    </>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
