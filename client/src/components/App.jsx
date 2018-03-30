import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.businessId;
    this.initialState = props.initialState;
    if (props.initialState && props.initialState.loaded) {
      this.state = {
        business: props.initialState.business,
        postalCode: props.initialState.postal_code,
        matchBiz1: props.initialState.business1,
        matchBiz2: props.initialState.business2,
        matchBiz3: props.initialState.business3,
        tip1: props.initialState.business1 && props.initialState.business1.tip_text,
        tip2: props.initialState.business2 && props.initialState.business2.tip_text,
        tip3: props.initialState.business3 && props.initialState.business3.tip_text,
        photo1: props.initialState.business1 && props.initialState.business1.encoded_photo,
        photo2: props.initialState.business2 && props.initialState.business2.encoded_photo,
        photo3: props.initialState.business3 && props.initialState.business3.encoded_photo,
        starRating1: props.initialState.business1 && this.getStars(props.initialState.business1.stars),
        starRating2: props.initialState.business2 && this.getStars(props.initialState.business2.stars),
        starRating3: props.initialState.business3 && this.getStars(props.initialState.business3.stars)
      };
    } else {
      this.state = {
        business: [{}],
        postalCode: Number,
        matchBiz1: [{}],
        matchBiz2: [{}],
        matchBiz3: [{}],
        tip1: null,
        tip2: null,
        tip3: null,
        photo1: null,
        photo2: null,
        photo3: null,
        starRating1: null,
        starRating2: null,
        starRating3: null
      };
    }
  }

  componentDidMount() {
    if (!this.props.initialState || !this.props.initialState.loaded) {
      axios
        .get(`/api/sidebar/business/${this.id}`)
        .then(response => {
          this.setState({ business: response.data });
        })
        .then(() => {
          var postalCode = this.state.business[0].postal_code;
          var bizId = this.state.business[0].id;
          this.setState({ postalCode: postalCode });
          this.fetchSuggestedBusiness(postalCode);
        })
        .catch(err => {
          console.log(err, "this is the error in the componentDidMount");
        });
    }
  }

  fetchSuggestedBusiness(postalCode) {
    axios
      .get("/api/sidebar/postalCode/" + postalCode)
      .then(response => {
        var biz1 = response.data[1];
        var biz2 = response.data[2];
        var biz3 = response.data[3];
        this.setState({ 
          matchBiz1: biz1, 
          matchBiz2: biz2, 
          matchBiz3: biz3,
          tip1: biz1 && biz1.tip_text,
          tip2: biz2 && biz2.tip_text,
          tip3: biz3 && biz3.tip_text,
          photo1: biz1 && biz1.encoded_photo,
          photo2: biz2 && biz2.encoded_photo,
          photo3: biz3 && biz3.encoded_photo,
          starRating1: biz1 && this.getStars(biz1.stars),
          starRating2: biz2 && this.getStars(biz2.stars),
          starRating3: biz3 && this.getStars(biz3.stars)
         });
      })
      .catch(err => {
        console.log(err, "error fetch postalCode axios");
      });
  }

  getStars(stars) {
    if (stars === 1) {
      return 'https://i.imgur.com/joRV605.png';
    } else if (stars === 1.5) {
      return 'https://i.imgur.com/fqHSmyz.png';
    } else if (stars === 2) {
      return 'https://i.imgur.com/GsBh9O5.png';
    } else if (stars === 2.5) {
      return 'https://i.imgur.com/HHk4ca7.png';
    } else if (stars === 3) {
      return 'https://i.imgur.com/eXa2t1X.png';
    } else if (stars === 3.5) {
      return 'https://i.imgur.com/nDcH9au.png';
    } else if (stars === 4) {
      return 'https://i.imgur.com/v2Ep8kQ.png';
    } else if (stars === 4.5) {
      return 'https://i.imgur.com/e2b0NN4.png';
    } else if (stars === 5) {
      return 'https://i.imgur.com/327Fh6y.png';
    }
  }

  render() {
    return (
      <div className="rightsb_page">
        <div className="rightsb_relatedBusinesses">
          <h2 className="rightsb_subheader">People Also Viewed</h2>
          <ul className="rightsb_list">
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`data:image/jpeg;base64, ${
                        this.state.photo1
                      }`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz1 && this.state.matchBiz1.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      <img
                        className="rightsb_stars"
                        src={this.state.starRating1}
                      />
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz1 ? this.state.matchBiz1.review_count : 0} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip1}</q>
                </div>
              </div>
            </li>
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`data:image/jpeg;base64, ${
                        this.state.photo2
                      }`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz2 && this.state.matchBiz2.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      <img
                        className="rightsb_stars"
                        src={this.state.starRating2}
                      />
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz2 ? this.state.matchBiz2.review_count : 0} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip2}</q>
                </div>
              </div>
            </li>
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`data:image/jpeg;base64, ${
                        this.state.photo3
                      }`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz3 && this.state.matchBiz3.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      <img
                        className="rightsb_stars"
                        src={this.state.starRating3}
                      />
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz3 ? this.state.matchBiz3.review_count : 0} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip3}</q>
                </div>
              </div>
            </li>
          </ul>
          <div className="rightsb_other-places-nearby">
            <h3 className="rightsb_subheader">Other Places Nearby</h3>
            <ul className="rightsb_list">
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Places Near {this.state.business[0].name}
                </a>
              </li>
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Lunch Near {this.state.business[0].name}
                </a>
              </li>
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Dinner Near {this.state.business[0].name}
                </a>
              </li>
            </ul>
          </div>
          <div className="rightsb_browse-nearby">
            <h3 className="rightsb_subheader">Browse Nearby</h3>
            <ul className="rightsb_list">
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/YVTtcKY.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span className="rightsb_browse-list">Restaurants</span>
                </a>
              </li>
              <li>
                {" "}
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/f3RdwOP.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span className="rightsb_browse-list">Nightlife</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/2sYyjqj.jpg/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span className="rightsb_browse-list">Shopping</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/aAnrFk2.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span className="rightsb_browse-list">Show All</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="rightsb_subheader">
              Dining in {this.state.business[0].city}
            </h3>
            <ul className="rightsb_list">
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/rAokCAc.jpg/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span className="rightsb_dining-list">
                    Search for Reservations
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/gc2EsDX.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                </a>
                <span className="rightsb_dining-list">
                  Book a table in {this.state.business[0].city}
                </span>
              </li>
            </ul>
          </div>
          <h2 className="rightsb_subheader">
            Best of {this.state.business[0].city}
          </h2>
          <p className="rightsb_bestof-list">
            Things to do in {this.state.business[0].city}
          </p>
          <h2 className="rightsb_subheader">
            People found {this.state.business[0].name} by searching for...
          </h2>
          <p className="rightsb_peoplefound-list">
            Food {this.state.business[0].city}
          </p>
          <h2 className="rightsb_subheader">Near Me</h2>
          <p className="rightsb_nearme-list">Dinner</p>
          <p className="rightsb_nearme-list">Lunch</p>
          <p className="rightsb_nearme-list">Breakfast</p>
        </div>
      </div>
    );
  }
}

export default App;
