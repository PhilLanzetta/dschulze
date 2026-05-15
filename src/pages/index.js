import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Header from "../components/header"
import Seo from "../components/seo"

const IndexPage = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  const data = useStaticQuery(graphql`
    query {
      contentfulSplashPage {
        images {
          image {
            gatsbyImageData(layout: FIXED, placeholder: BLURRED)
            width
            height
          }
          fullBleed
        }
      }
    }
  `)

  const slides = data.contentfulSplashPage.images

  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))
    }, 3000)
    return () => clearInterval(intervalId)
  }, [imageIndex, slides.length])

  const handleClick = () => {
    setImageIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      <Header />
      <main
        onClick={handleClick}
        aria-label="go to next slide"
        style={{ position: "relative" }}
      >
        {slides.map((item, index) => {
          const displayHeight = item.fullBleed
            ? viewport.height
            : viewport.height - 150
          const displayWidth = item.fullBleed
            ? viewport.width
            : Math.round(displayHeight * (item.image.width / item.image.height))

          const imageData = getImage({
            ...item.image.gatsbyImageData,
            width: displayWidth,
            height: displayHeight,
          })

          return (
            <div
              key={index}
              style={{
                position: index === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: index === imageIndex ? 1 : 0,
                pointerEvents: index === imageIndex ? "auto" : "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GatsbyImage
                image={imageData}
                alt=""
                className={item.fullBleed ? "full-bleed" : "bordered"}
              />
            </div>
          )
        })}
      </main>
    </>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
