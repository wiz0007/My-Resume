import { useEffect } from "react";
import { BASE_SITE_URL, DEFAULT_OG_IMAGE } from "../seo/seoConfig";

function setMetaTag(selector, attribute, value) {
  if (!value) return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const cleanSelector = selector.replace(/^meta\[/, "").replace(/\]$/, "");
    const [attrName, rawVal] = cleanSelector.split("=");
    if (attrName && rawVal) {
      element.setAttribute(attrName, rawVal.replace(/['"]/g, ""));
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

/**
 * Custom hook to dynamically manage document head metadata, canonical URLs,
 * OpenGraph, Twitter cards, and structured JSON-LD per route.
 */
export function useSEO({
  title,
  description,
  path = "",
  keywords,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
} = {}) {
  useEffect(() => {
    const fullUrl = `${BASE_SITE_URL}${path}`;

    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // 2. Standard Meta Tags
    if (description) {
      setMetaTag('meta[name="description"]', "content", description);
    }
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // 4. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', "content", ogTitle || title);
    setMetaTag('meta[property="og:description"]', "content", ogDescription || description);
    setMetaTag('meta[property="og:url"]', "content", fullUrl);
    setMetaTag('meta[property="og:type"]', "content", ogType);
    setMetaTag('meta[property="og:image"]', "content", ogImage);
    setMetaTag('meta[property="og:image:secure_url"]', "content", ogImage);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', "content", ogTitle || title);
    setMetaTag('meta[name="twitter:description"]', "content", ogDescription || description);
    setMetaTag('meta[name="twitter:image"]', "content", ogImage);

    // 6. Dynamic BreadcrumbList & WebPage Schema
    let scriptTag = document.getElementById("route-structured-data");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "route-structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_SITE_URL,
      },
    ];

    if (path && path !== "/") {
      const pageName = title ? title.split("|")[0].trim() : path.replace("/", "");
      breadcrumbs.push({
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: fullUrl,
      });
    }

    const routeSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${fullUrl}#webpage`,
      url: fullUrl,
      name: title,
      description,
      isPartOf: {
        "@id": `${BASE_SITE_URL}/#website`,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
    };

    scriptTag.textContent = JSON.stringify(routeSchema);
  }, [title, description, path, keywords, ogTitle, ogDescription, ogImage, ogType]);
}

export default useSEO;
