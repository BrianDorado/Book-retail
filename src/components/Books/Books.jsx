import React from "react";
import axios from "axios";
import Button from "../Button/Button";
import marriageBand from "../../assets/img/marriage-band-1920-1080.jpg";
import brideGroom from "../../assets/img/bride-groom1620-1080.jpg";
import { SomeContext } from "../../context/testContext";

export default class Books extends React.Component {
  state = { books: [] }
  componentDidMount() {
    // get book data from server
    axios.get  ('/api/products/books')
         .then ( ({ data: books }) => this.setState({ books }))
         .catch( console.error )
    // hide scrollbars
    const textContainers = document.querySelectorAll(".text-container");
    // offsetWidth - clientWidth to determine size of scrollbar
    const scrollbarOffset = textContainers[0].offsetWidth - textContainers[0].clientWidth;
    textContainers[0].style.right = "-" + scrollbarOffset + "px";
    textContainers[1].style.right = "-" + scrollbarOffset + "px";
    textContainers[0].style.position = "relative";
    textContainers[1].style.position = "relative";
    const textContainerWrappers = document.querySelectorAll(".text-container-wrapper");
    textContainerWrappers[0].style.marginLeft = "auto";
    textContainerWrappers[1].style.marginLeft = "-" + scrollbarOffset + "px";

    const bgImg1 = new Image();
    const bgImg2 = new Image();
    bgImg1.src = marriageBand;
    bgImg2.src = brideGroom;

    let bg1Loaded = false;
    let bg2Loaded = false;
    console.time("book-imgs-load");
    bgImg1.onload = function() {
      bg1Loaded = true;
      if (bg2Loaded) {
        console.timeEnd("book-imgs-load");
        firstLoadDelay(1200)
      }
    };
    bgImg2.onload = function() {
      bg2Loaded = true;
      if (bg1Loaded) {
        console.timeEnd("book-imgs-load");
        firstLoadDelay(1200)
      }
    };
    const bgImageElements = document.querySelectorAll(".bg-image");
    bgImageElements[0].style.backgroundImage = "url(" + bgImg1 + ")";
    console.log(' bg 2 ', bgImg2)
    bgImageElements[1].style.backgroundImage = "url(" + bgImg2 + ")";

    function firstLoadDelay(delay) {
      if(document.body.classList.contains('is-mounted')){
        fadeInComponent()
      } else setTimeout(fadeInComponent,delay)
    }
    function fadeInComponent() {
      document.querySelector('.books-component').classList.add('fadein');
    }
  }
  addItemToCart = (bookId) => {

    axios.put('/api/addtocart/' + bookId)
         .then ( console.log   )
         .catch( console.error )
  }
  render() {
    !(console.log)(this.state)
    return (
      <div className="books-component">
        <BookDisplay
          checkoutFn={_=>this.addItemToCart(1)}
          title="Marital Therapy"
          text={
            <div>
              <p>
                Marriage between a man and a woman has been the divine pattern originating in the Garden of Eden with
                our First Parents{" "}
                <a href="https://www.lds.org/scriptures/ot/gen/1.26-27" target="blank">
                  (Genesis 1:26-27)
                </a>, and this union has been the traditional form of marriage for millennia. The First Couple were
                married by God before death entered the world. Therefore, marriage was intended to be an eternal
                relationship. It is made possible through the resurrection brought about by Jesus Christ. A priesthood
                key restored by Elijah seals a couple together for ‘time and for eternity.’
              </p>
              <p>
                Of course all marriages have interesting challenges that surface over the life cycle. There are
                basically two approaches to assist Latter-day Saint couples in their quest for marital happiness: (1) a
                gospel, or doctrinal-based perspective, and (2) a secular or non-religious approach, the foundation of
                professional counseling protocols.
              </p>
              <p>
                The point of this volume: Why not try a gospel-based approach to resolve marital issues? The principles
                of the gospel, when understood and practiced by both spouses, have the greatest chance of helping
                Latter-day Saint couples build strong, stable marriages, the kind of marriages that inspire both
                partners to value their relationship and to develop a companionship that creates in both a desire to be
                ‘together forever.’
              </p>
              <p>
                During his ministry, President Boyd K. Packer of the Quorum of the Twelve Apostles was fond of stating
                that doctrine was a powerful tool in changing and improving behavior. “True doctrine, understood,” he
                said, “will change behavior quicker than will the study of behavior change behavior’{" "}
                <a href="https://www.lds.org/general-conference/2004/04/do-not-fear?lang=eng" target="blank">
                  (“Do Not Fear,” Ensign, May 2004, 73.)
                </a>{" "}
                This book attests to that principle.
              </p>
            </div>
          }
        />
        <div className="mediary-div"></div>
        <BookDisplay
          checkoutFn={_=>this.addItemToCart(2)}
          title="What We Wish We'd Known Before Our Honeymoon"
          text={
            <div>
              <p>
                Marriage is the great adventure of mortality. We rejoice as parents, siblings, and friends when we
                receive an invitation to a reception of someone we know and love. Having been worthy to marry in a
                Church temple, surely they anticipate with some enthusiasm, at the end of their courtship and now
                sealing, to begin a life of sexual intimacy that binds their hearts and souls together.
              </p>
              <p>
                However, heading off on a honeymoon to a private location, a common tradition for LDS couples, requires
                a little planning to find a place to spend a few days of private time. Some opt for an ocean cruise to
                Mexican resorts or to Alaska, some opt for California and the theme parks there. Others head for the
                beauty of Yellowstone, Glacier National Park, or even Banff, Canada, and the stunning sites in the land
                to the north. The idea is to get away from family and friends in a secluded place where they can make
                plans for their immediate future. An important part of the honeymoon period will be learning from each
                other the intricacies of physical intimacy.
              </p>
              <p>
                Though highly anticipated by these couples, sexual relations were often more difficult for them than
                portrayed by actors in films. In fact, as you will see, many couples found the first few nights of their
                time together rather challenging and often disappointing. However, the joy of being together, of
                exploring male/female attributes now as legal companions, they had to learn from each other facets of
                intimacy such as arousal, passion, and intercourse--important elements of their new companionship. This
                book is designed to help newlyweds achieve success in the intimate exchange of being husband and wife.
              </p>
            </div>
          }
        />
      </div>
    );
  }
}

function BookDisplay(props) {
  return (
    <section>
      <div className="bg-image" />
      <div className="book-section-container">
        <div
          className="text-container-wrapper"
          style={{
            width: "550px",
            overflow: "hidden",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div className="text-container">
            <h1>{props.title}</h1>
            <SomeContext.Consumer>
              {fn => <Button fn={_ => fn("Really Purchase?", "You will add this book to your cart", "CONFIRM", props.checkoutFn, "CANCEL", _=>document.body.classList.toggle('show-modal')) } text="add to cart" />}
            </SomeContext.Consumer>
            {props.text}
          </div>
        </div>
      </div>
    </section>
  );
}
