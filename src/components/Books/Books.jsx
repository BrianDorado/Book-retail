import React from "react";

export default props => {
  return (
    <div className="books-component">
      <BookDisplay
        title="Marital Therapy"
        text={
          <div>
            <p>
              Marriage between a man and a woman has been the divine pattern originating in the Garden of Eden with our
              First Parents (Genesis 1:26-27), and this union has been the traditional form of marriage for millennia.
              The First Couple were married by God before death entered the world. Therefore marriage was intended to be
              an eternal relationship. It is made possible through the resurrection brought about by Jesus Christ. A
              priesthood key restored by Elijah seals a couple together for ‘time and for eternity.’
            </p>
            <p>
              Of course all marriages have interesting challenges that surface over the life cycle. There are basically
              two approaches to assist Latter-day Saint couples in their quest for marital happiness: (1) a gospel, or
              doctrinal-based perspective, and (2) a secular or non-religious approach, the foundation of professional
              counseling protocols.
            </p>
            <p>
              The point of this volume: Why not try a gospel-based approach to resolve marital issues? The principles of
              the gospel, when understood and practiced by both spouses, have the greatest chance of helping Latter-day
              Saint couples build strong, stable marriages, the kind of marriages that inspire both partners to value
              their relationship and to develop a companionship that creates in both a desire to be ‘together forever.’
            </p>
            <p>
              During his ministry, President Boyd K. Packer of the Quorum of the Twelve Apostles was fond of stating
              that doctrine was a powerful tool in changing and improving behavior. “True doctrine, understood,” he
              said, “will change behavior quicker than will the study of behavior change behavior’ (“Do Not Fear,”
              Ensign, May 2004, 73.) This book attests to that principle.
            </p>
          </div>
        }
      />
      <BookDisplay
        title="What We Wish We'd Known Before Our Honeymoon"
        text={
          <div>
              
            <p>
              Marriage is the great adventure of mortality. We rejoice as parents, siblings, and friends when we receive
              an invitation to a reception of someone we know and love. Having been worthy to marry in a Church temple,
              surely they anticipate with some enthusiasm, at the end of their courtship and now sealing, to begin a
              life of sexual intimacy that binds their hearts and souls together.
            </p>
            <p>
              However, heading off on a honeymoon to a private location, a common tradition for LDS couples, requires a
              little planning to find a place to spend a few days of private time. Some opt for an ocean cruise to
              Mexican resorts or to Alaska, some opt for California and the theme parks there. Others head for the
              beauty of Yellowstone, Glacier National Park, or even Banff, Canada, and the stunning sites in the land to
              the north. The idea is to get away from family and friends in a secluded place where they can make plans
              for their immediate future. An important part of the honeymoon period will be learning from each other the
              intricacies of physical intimacy.
            </p>
            <p>
              Though highly anticipated by these couples, sexual relations are often more difficult for them than
              portrayed by actors in films. In fact, as you will see, many couples and the first few nights of their
              time together rather frustrating as they learn that what they thought would be simple and pleasurable, may
              be difficult. However, the joy of being together, of exploring male/female attributes now as legal
              companions, they now must learn from each other about such things as arousal, passion, and intercourse as
              important elements of their new companionship. This book is designed to help newlyweds achieve success in
              the intimate exchanges they share ‘between husband and wife.’
            </p>
          </div>
        }
      />
    </div>
  );
};

function BookDisplay(props) {
  return (
    <section>
        <div className="bg-image"></div>
        <div className="text-container">
            <h1>{props.title}</h1>
            {props.text}
        </div>
    </section>
  );
}
