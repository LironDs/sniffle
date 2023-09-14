import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="container pb-5">
        <h1 id="font">Welcome to Sniffle!</h1>
        <p>
          At Sniffle, we are passionate animal lovers and dedicated entrepreneurs on a mission to
          create a thriving online platform for businesses related to animals. Whether you are a pet
          store owner, veterinary clinic, pet grooming service, or any other animal-centric
          enterprise, we've got you covered!
        </p>
        <p>
          Our vision for Sniffle is simple: to be the go-to destination for animal businesses to
          connect with their target audience and grow their ventures, all at reasonable prices. We
          understand the unique challenges faced by businesses in the animal industry, and that's
          why we've designed our platform to be a supportive and dynamic space for you to showcase
          your offerings.
        </p>
        <p>
          What sets Sniffle apart is our commitment to creating a community of animal enthusiasts.
          Our platform not only connects businesses with potential customers but also fosters a
          sense of belonging and shared passion for all things furry, feathery, and scaly!
        </p>
        <p>Why choose Sniffle for your advertising needs? Here's what makes us stand out:</p>
        <p>
          1. Affordable Advertising: We believe in empowering businesses of all sizes to succeed.
          That's why we offer advertising options at reasonable prices, ensuring you get the
          exposure you deserve without breaking the bank.
        </p>
        <p>
          2. Targeted Reach: Sniffle is tailored specifically for businesses related to animals.
          Your ads will reach a highly targeted audience of animal lovers who are actively seeking
          the services and products you offer.
        </p>
        <p>
          3.Engaging Experience: We strive to create an engaging and user-friendly environment for
          both businesses and visitors. Your ads will be presented in a visually appealing manner,
          captivating potential customers from the moment they land on our site.
        </p>
        <p>
          4. Supportive Community: Sniffle is more than just a business directory; it's a community
          of animal enthusiasts, both businesses and customers alike. We encourage interactions,
          knowledge-sharing, and networking to further enhance your growth prospects.
        </p>
        <p>
          Whether you're just starting or have been in the animal business for years, Sniffle is
          here to be your partner in success. Join us today and let your business flourish in the
          warm embrace of the animal-loving community! Sniffle - Where Animal Businesses Thrive!
        </p>
      </div>
    </>
  );
};

export default About;
