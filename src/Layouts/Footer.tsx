import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <footer className="flex relative py-4 my-5 border-top bottom-0">
        <p className="text-muted text-center">
          © 2023 가톨릭대학교 멋쟁이 사자처럼 Under The C
        </p>
      </footer>
    </Container>
  );
};

export default Footer;
