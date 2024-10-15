// src/LandingPage.tsx
import React, { useEffect, useRef } from "react";
import Scrollspy from "react-scrollspy";
import "../assets/css/landing.css";

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: "schedule",
    title: "Schedule",
    content:
      "Flexible tutoring sessions every week! Schedule a time that works best for you.",
  },
  {
    id: "ticketing",
    title: "Ticketing",
    content:
      "Our ticketing system is completely private. Only the tutors will have access to your ticket information.",
  },
  {
    id: "payment",
    title: "Payment",
    content:
      "We accept payments via Zelle, CashApp, and Venmo. Payment is required after each session.",
  },
  {
    id: "contact",
    title: "Contact",
    content: "Contact Cody or Mary for more details!",
  },
  {
    id: "faq",
    title: "FAQ",
    content:
      "We offer tutoring in a variety of web development and programming topics.",
  },
  {
    id: "rules",
    title: "Rules",
    content:
      "Respect, no plagiarism, punctuality, privacy, and constructive feedback are essential.",
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className='landing-page'>
      <Scrollspy
        items={sections.map((section) => section.id)}
        currentClassName='active'
      >
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </Scrollspy>

      {sections.map((section, index) => (
        <AnimatedSection
          key={section.id}
          title={section.title}
          content={section.content}
          index={index}
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

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  title,
  content,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          sectionRef.current.classList.add("active");
        } else {
          sectionRef.current.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to handle initial visibility

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id={title.toLowerCase()}
      className={`section ${isEven ? "slide-in-left" : "slide-in-right"}`}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default LandingPage;
