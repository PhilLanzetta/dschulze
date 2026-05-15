import * as React from "react"

const Header = () => (
  <header>
    <div className="header">
      <a href="mailto:info@davidschulze.com" className="header-link">
        Email
      </a>
      <h1 className="title" translate="no">
        David Schulze
      </h1>
      <a
        href="https://www.instagram.com/david_schulze_studio"
        target="_blank"
        rel="noreferrer"
        className="header-link instagram"
      >
        Instagram
      </a>
    </div>
    <div className="mobile-links-container">
      <a href="mailto:info@davidschulze.com" className="mobile-header-link">
        Email
      </a>
      <a
        href="https://www.instagram.com/david_schulze_studio"
        target="_blank"
        rel="noreferrer"
        className="mobile-header-link"
      >
        Instagram
      </a>
    </div>
  </header>
)

export default Header
