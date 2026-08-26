import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import styles from "./SiteFooter.module.scss";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "Skills", to: "/skills" },
  { label: "Profile", to: "/profile" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/wiz0007", icon: Github },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/ayushmaan-mishra-254020257", icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/marshallcode007/", icon: Code2 },
  { label: "Email", href: "mailto:ayush8171wiz@gmail.com", icon: Mail },
];

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="site-footer-title">
      <div className={styles.inner}>
        <section className={styles.brand} aria-labelledby="site-footer-title">
          <span className={styles.mark}>AM</span>
          <div>
            <h2 id="site-footer-title">Ayushmaan Mishra</h2>
            <p>
              Full-stack developer building practical interfaces, APIs, data flows,
              and portfolio-grade software experiences.
            </p>
          </div>
        </section>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <span>Open to fresher full-stack and software engineering roles.</span>
          <a href="/Ayushmaan_Mishra-Resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>Copyright {year} Ayushmaan Mishra</span>
        <div className={styles.socials}>
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}>
              {React.createElement(Icon, { size: 18 })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
