"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/slideScroll.module.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let foundSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          foundSection = section.id;
        }
      });

      if (foundSection) {
        setActiveLink(foundSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id as any);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
      sectionsRef.current[section.id] = section;
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleClick = (id: any) => {
    setActiveLink(id);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen flex justify-center items-center bg-[#31244F] text-white">
      <nav className="w-full p-4">
        <ul className={styles["ul_style"]}>
          <li className="mb-8 text-right uppercase">
            <Link
              href="#section1"
              className={`block py-2 ${styles["border-animate"]} ${
                activeLink === "section1" ? styles["animate-border"] : ""
              }`}
              onClick={() => handleClick("section1")}
            >
              Amazon
            </Link>
          </li>
          <li className="mb-8 text-right uppercase">
            <Link
              href="#section2"
              className={`block py-2 ${styles["border-animate"]} ${
                activeLink === "section2" ? styles["animate-border"] : ""
              }`}
              onClick={() => handleClick("section2")}
            >
              Section 2
            </Link>
          </li>
          <li className="mb-8 text-right uppercase">
            <Link
              href="#section3"
              className={`block py-2 ${styles["border-animate"]} ${
                activeLink === "section3" ? styles["animate-border"] : ""
              }`}
              onClick={() => handleClick("section3")}
            >
              Section 3
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
