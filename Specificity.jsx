import React from "react";
import "./specificity.css";

// By importing the Header.css file, it is added to the DOM whenever this component loads

// We can also style a component inside of its JavaScript file by adding style properties to its rendered elements
// Unlike regular HTML, a JSX style property must be an object instead of a string
// On a style object, we camelCase all property names, and put all of the values in quotes
// Non quoted values default to "pixels", e.g. height, margin, padding

// In-line styling has a specificity of 1, so it will override any styles in an external stylesheet
// Inline styles take precedence over type selectors because of CSS cascade order.
// Even though both have the same specificity score, inline styles are applied last
// and thus override previous rules defined in stylesheets.

const styles = {
  // Specificity score: 1
  oneThousand: {
    background: "red", // This inline style takes precedence over others
    height: "600px",
  },
  headingStyle: {
    fontSize: "100px",
    color: "white", // Inline style for the heading
  },
};

// We use JSX curly braces to evaluate the style object

function Header() {
  return (
    <header style={styles.oneThousand} className='ten' id='one-hundred'>
      <h1 style={styles.headingStyle}>Welcome</h1>
      <p>This is a demonstration of CSS specificity.</p>
      <button className='btn primary'>Click Me!</button>
      <p>This paragraph is styled by a descendant selector.</p>
      <button className='btn important'>Important Button</button>
    </header>
  );
}

export default Header;
