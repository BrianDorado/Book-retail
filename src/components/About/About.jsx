import React from "react";
import author from "./../../assets/img/author.jpg";

export default class About extends React.Component {
    componentDidMount() {
        let bgImage = new Image()
        bgImage.src = author
        console.time('load-author')
        bgImage.onload = e => {


            console.timeEnd('load-author')
            document.querySelector('.about-component').classList.add('fadein')
        }
        document.querySelector('#author-pic').style.backgroundImage = "url(" + author + ")"
    }
  
  
    render() {
    return (
      <div className="about-component">
        <img src={author} id="author-pic" alt="Doug Brinley" />
        <br />
        <div className="text-container">
          <h1>About the Author</h1>
          <p>
            Doug Brinley received a Ph.D from Brigham Young University in Family Studies. He taught in CES for 25 years
            as an Institute instructor and 18 years as a member of the BYU Religious Education faculty from 1990 to
            2008. He and his wife Geri currently teach an Institute Class on the BYU campus for the YSA2 stake. They
            have six children, twenty-five grandchildren, and six greats.
          </p>
          <p>
            He retired as a Professor of Church History and Doctrine at BYU in 2008. He has authored, co-authored, or
            edited 15 books, 14 of which are on marriage and family topics. A few include “Between Husband & Wife:
            Gospel Perspectives on Marital Intimacy,” “Single in a Married Church,” “First Comes Love” and its sequel
            “Then Comes Marriage,” and “Living a Covenant Marriage.” He spoke on the Know Your Religion circuit for many
            years and at BYU Education Week for three decades. He and Geri have served three missions since retirement,
            to BYU Hawaii, to California Fresno, and to Nauvoo where he served in the mission presidency.{" "}
          </p>
        </div>
      </div>
    );
  }
}
