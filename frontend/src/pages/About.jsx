import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about_img"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <p>
  Veloura Store is a modern online fashion platform dedicated to providing
  stylish, affordable, and high-quality clothing for Men, Women, and Kids.
  Our goal is to create a seamless shopping experience where customers can
  explore the latest trends and purchase their favorite products from the
  comfort of their homes.
            </p>
          </p>
          <p>
            <p>
  We carefully curate our collection to ensure a wide variety of fashion
  choices for every occasion. From casual wear and winter essentials to
  everyday basics, Veloura Store combines quality craftsmanship, comfort,
  and contemporary design to meet the needs of modern shoppers.
            </p>
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
             Our mission is to make fashion accessible, affordable, and enjoyable for
  everyone. We strive to provide a secure, user-friendly, and reliable
  shopping platform while maintaining excellent customer service and product
  quality.
          </p>
        </div>
      </div>
      <div className=" text-xl py-4">
        <Title text1={"WHY"} text2={"SHOP WITH US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
            Every product is carefully selected and reviewed to ensure high quality,
  durability, and customer satisfaction.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
            Enjoy a smooth online shopping experience with easy navigation, secure
  payments, and quick order management.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
            Our dedicated support team is always ready to assist customers with
  product inquiries, orders, and post-purchase support.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
