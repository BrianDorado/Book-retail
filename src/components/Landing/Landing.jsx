import React from "react";
import family from "../../assets/img/family_medium1.jpg";

export default class Landing extends React.Component {
  componentDidMount() {
    var bgImage = new Image();
    bgImage.src = family
    document.querySelector(".background-image").style.backgroundImage = "url(" + family + ")";
    
    console.time('load_landing_bgImage')
    bgImage.onload = function() {
      console.timeEnd('load_landing_bgImage')
      if(document.body.classList.contains('is-mounted'))
        fadeInComponent()
      else setTimeout(fadeInComponent, 1200)
    };
    function fadeInComponent(){
      document.querySelector('.landing-component').classList.add('fadein')
    }
  }

  render() {
    return (
      <div className="landing-component">
        <div className="background-image" />
        <div className="text-container">
          <h1>A Secular or a Gospel Approach?</h1>
          <p>
            The principles of the gospel, when understood and practiced by both spouses, have the greatest chance of
            helping Latter-day Saint couples build strong, stable marriages, the kind of marriages that inspire both
            partners to value their relationship and to develop a companionship that creates in both a desire to be
            ‘together forever.’
          </p>
          <p style={{ textAlign: "right" }}>
            from the book, <em>Marital Therapy</em> by Doug Brinley
          </p>
        </div>
      </div>
    );
  }
}
