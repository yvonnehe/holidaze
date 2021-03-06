import { Row, Col } from "antd";

const Item = (props) => {
  const { name, shortdescription, img, price, distance, extras } = props;
  return (
    <>
      <div className="hoteldiv hotelinfo">
        <Row gutter={[16, 16]}>
          <Col sm={24} lg={9}>
            <div>
              <img
                src={img}
                alt={name}
                style={{ width: "100%" }}
                className="hotelimg"
              />
            </div>
          </Col>
          <Col sm={24} lg={11}>
            <p className="text">{shortdescription}</p>
            <h3 className="hotelname">{name}</h3>
            <hr className="line"></hr>
            <br></br>
            <p className="hotelextras text">{extras}</p>
            <p className="text">{distance}km from Bergen city centre</p>
          </Col>
          <Col sm={24} lg={4}>
            <p className="hotelprice">{price} NOK</p>
            <p className="hoteltaxes text">Per night including taxes</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Item;
