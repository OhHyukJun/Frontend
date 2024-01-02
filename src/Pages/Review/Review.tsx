// 리뷰 페이지 작성
import { useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import peach from '../../img/peach.jpg'
import Star from '../../public/images/Star.png'

const Review = () => {

  const [review, setReview] = useState({
    star: '',
    content: ''
  });

  const inputChangeHandler = (e: any) => {
    const {name, value} =e.target;
    switch (name) {
      case "starNum":
        setReview({ ...review, star: value})
        break;
      case "reviewDoc":
        setReview({...review, content: value})
        break;
      default:
        break;
    }
  }
  const reviewSubmit = (e:any) => {
    console.log(review);
  }

  return (
    <Container>
      <form>
      <Row>
        <div style={{marginTop:'50px', marginBottom:'90px'}}>
          <span className="font-black text-3xl">리뷰남기기</span>
        </div>
      </Row>

      <Row className="justify-content-md-left">
        <Col xs lg="2" style={{width:'35%'}}>
          <img src={peach} alt='peach' height='400px' width='400px'/>
        </Col>
        <Col xs lg="2">
          <span className="font-black text-xl">유기농 백도 1.8kg</span>
          <br/>
          <span className="text-xl">45,000원</span>
        </Col>
      </Row>

      <div style={{marginTop:'50px', marginBottom:'50px'}}/>

      <Row className="justify-content-md-left">
        <Col xs lg="2" style={{width:'9%'}}>
          <span className="font-black text-xl">별점</span>
        </Col>
        <Col xs lg="2" style={{width:'4%'}}>
          <img src={Star} alt='star' height="25" width="25"/>
        </Col>
        <Col xs lg="2">
          <input 
            name="starNum"
            type="number" 
            style={{width:'70px'}}
            placeholder="0"
            onChange={inputChangeHandler}
          />
        </Col>
      </Row>

      <div style={{marginTop:'50px', marginBottom:'50px'}}/>

      <Row className="justify-content-md-left">
        <span className="font-black text-xl">내용</span>
        <div style={{marginTop:'10px', marginBottom:'10px'}}/>
        <textarea
          name="reviewDoc"
          style={{backgroundColor:'#D9D9D9',width:'1000px', height:'200px'}}
          placeholder="사용하신 내용을 입력해주세요"
          onChange={inputChangeHandler}
        />
      </Row>

      <div style={{marginTop:'50px', marginBottom:'50px'}}/>

      <Row className="justify-content-md-left">
        <span className="font-black text-xl">사진 등록</span> 
      </Row>

      <Row className="justify-content-md-left">
      
      </Row>
      
      <div style={{marginTop:'50px', marginBottom:'50px'}}/>

      <Row className="justify-content-md-end">
        <Button 
          type="button"
          style={{backgroundColor:'#5EB241',width:'200px'}}
          onClick={reviewSubmit}
          >
        <span className="font-white text-xl">리뷰 등록하기</span>
      </Button>
      </Row>

      </form>
    </Container>
  )
}

export default Review