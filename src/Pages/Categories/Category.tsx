import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap"; // Import Row and Col from react-bootstrap
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fruit from "../../img/peach.jpg";
import vegetable from "../../img/vagetable.jpg";
import cereal from "../../img/Cereal.jpg";

const SmallComponent = styled.img`
  width: 100%; 
  height: auto;
  max-height: calc(30vh);
  object-fit: contain;
  margin-bottom: 5vh;
`;

const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
    padding: 0.2vw 1vw;
`;

const TextWrapper = styled.div`
  
  margin-left: 10vh;
  margin-top: 10vh;
  justify-content: flex-start;
  display: flex;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  margin-bottom: 5vh;
  gap: 1vw;
  justify-content: flex-end;
  display: flex;
`;

const HorizontalRow = styled(Row)`
  display: flex;
  justify-content: space-around;
  gap: 10vw;
  margin-bottom: 2vh;
`;

interface Select {
  id: number;
  title: string;
  name: string;
  content: string;
}

export const Category = () => {
  const { itemName } = useParams();
  console.log(itemName);
  const Item: Select[] = [
    {
      id: 0,
      title: "Fruit",
      name: "과일",
      content: "",
    },
    {
      id: 1,
      title: "Vegetable",
      name: "채소",
      content: "",
    },
    {
      id: 2,
      title: "Cereal",
      name: "견과",
      content: "",
    },
  ];
  const selectItem = Item.find((element) => element.name === itemName);

  return (
    <>
      <TextWrapper>
        <h1>{selectItem?.name}</h1>
      </TextWrapper>
      
      <CenteredContainer>
        <div>
          <Container className="p-5">
            <ButtonsWrapper>
              <Button>
                <Link to="/search">최신순</Link>
              </Button>
              <Button>
                <Link to="/search">조회순</Link>
              </Button>
              <Button>
                <Link to="/search">리뷰순</Link>
              </Button>
            </ButtonsWrapper>
            <HorizontalRow className="p-5">
              <Col>
                <Link to="/buy">
                  <SmallComponent src={fruit} alt="react" />
                </Link>
              </Col>
              <Col>
                <Link to="/buy">
                  <SmallComponent src={vegetable} alt="react" />
                </Link>
              </Col>
              <Col>
                <Link to="/buy">
                  <SmallComponent src={cereal} alt="react" />
                </Link>
              </Col>
            </HorizontalRow>
            <HorizontalRow className="p-5">
              <Col>
                <Link to="/buy">
                  <SmallComponent src={fruit} alt="react" />
                </Link>
              </Col>
              <Col>
                <Link to="/buy">
                  <SmallComponent src={vegetable} alt="react" />
                </Link>
              </Col>
              <Col>
                <Link to="/buy">
                  <SmallComponent src={cereal} alt="react" />
                </Link>
              </Col>
            </HorizontalRow>
          </Container>
        </div>
      </CenteredContainer>
    </>
  );
};
