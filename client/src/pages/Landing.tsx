// src/LandingPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Paper from "@mui/material/Paper";

import Carousel from "../components/Carousel/Carousel";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import "../assets/css/landing.css";
import AnimLogo from "../components/AnimLogo/AnimLogo";
import PayLogo from "../components/PayLogo/PayLogo";

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: "gaming",
    title: "Gaming",
    content:
      "We’ve created a selection of engaging games designed to help students grasp challenging concepts and reinforce their understanding of the material..",
  },
  {
    id: "payment",
    title: "Payment",
    content:
      "We accept payments via Zelle, CashApp, and Venmo. Payment is required after each session. Connect your Stripe account to facilitate payments.",
  },
  {
    id: "canada",
    title: "Canada",
    content:
      "Our tutor service proudly accepts PayPal, making it easy and convenient for Canadian students to access quality tutoring without any hassle. For those interested, the cost of our services is set at $35 USD, which rounds down to approximately $46 CAD, depending on the current exchange rate.",
  },
];

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LandingPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    sectionRefs.current.forEach((section) => {
      if (section) {
        const { offsetTop, clientHeight } = section;

        if (
          scrollPosition >= offsetTop - clientHeight / 2 &&
          scrollPosition < offsetTop + clientHeight / 2
        ) {
          setActiveId(section.id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='landing-page'>
      <Grid className='logo-cont' container spacing={3}>
        <Grid size={4}>
          <Item>
            {" "}
            <AnimLogo />
          </Item>
        </Grid>
        <Grid size={8}>
          <Item>
            Enjoy flexible scheduling with two experienced tutors who have over
            10 years of combined expertise. Sessions are available in one-hour
            increments, with no limit on the number or duration of sessions—all
            for just $35 per hour. Plus, you can use private ticketing on our
            Discord server, ensuring your scheduling and conversations remain
            confidential.
          </Item>
        </Grid>
      </Grid>

      <List style={{ position: "fixed", top: "20%", left: "10%" }}>
        {sections.map((section) => (
          <ListItem
            key={section.id}
            component={"button"}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{
              backgroundColor:
                activeId === section.id ? "lightblue" : "transparent",
            }}
          >
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>

      {sections.map((section, index) => (
        <AnimatedSection
          key={section.id}
          title={section.title}
          content={section.content}
          index={index}
          ref={(el) => el && sectionRefs.current.push(el)}
        />
      ))}
    </div>
  );
};

interface AnimatedSectionProps {
  title: string;
  content: string;
  index: number;
}

const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  (props, ref) => {
    const { title, content, index } = props;
    const isEven = index % 2 === 0;

    return (
      <>
        <div
          ref={ref}
          id={title.toLowerCase()}
          className={`section ${isEven ? "slide-in-left" : "slide-in-right"}`}
        >
          <h2>{title}</h2>
          <p>{content}</p>

          {title === "Gaming" && (
            <div className='carousel-placeholder'>
              <Carousel />
            </div>
          )}

          {title === "Payment" && (
            <div className='payment-section'>
              <div className='payment-icons'>
                <PayLogo />
              </div>
              <button className='connect-stripe-button'>Connect Stripe</button>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default LandingPage;
