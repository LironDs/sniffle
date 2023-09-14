import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer className="border-top w-100 px-2 position-fixed bottom-0 bg-dark text-light text-center">
        <img src="/logo_transparent.png" alt="logo Sniffle" width="60" height="50" />
        Created by Liron David-Shiloah &copy;
        <i
          className="fa-brands fa-instagram fa-lg ps-4"
          style={{ color: " #4ba7b9", marginBottom: "20px", display: "inline - block" }}
        ></i>
        <i className="fa-brands fa-facebook fa-lg px-2"></i>
      </footer>
    </>
  );
};

export default Footer;
