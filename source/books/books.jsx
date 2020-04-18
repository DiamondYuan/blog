import React from "react";
import { renderToString } from "react-dom/server";

const imageStyle = "imageMogr2/auto-orient/thumbnail/500x/blur/1x0/quality/75"

// @ts-check

/** @type {import('../type').Figure[]} */
const books = [
  {
    cover: 'https://blog-staticfile.diamondyuan.com/2020-04-16-JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1.jpg',
    name: 'JavaScript高级程序设计（第3版）',
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2019-10-13-%E9%9C%8D%E4%B9%B1%E6%97%B6%E6%9C%9F%E7%9A%84%E7%88%B1%E6%83%85.jpg",
    name: "霍乱时期的爱情",
    link: "/books/El_Amor_En_Los_Tiempos_Del_Colera.html",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2019-09-11-%E9%87%91%E8%89%B2%E6%A2%A6%E4%B9%A1-%E4%B9%A6%E7%B1%8D.jpg",
    name: "金色梦乡",
    link: "/favorite/golden_slumber.html",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E5%9B%BE%E8%A7%A3HTTP.jpg",
    name: "图解HTTP",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E6%B9%96%E7%95%94.jpg",
    name: "湖畔",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E5%88%80%E9%94%8B.jpg",
    name: "刀锋",
    link: "/books/the_razors_edge.html",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E4%BA%BA%E7%B1%BB%E7%AE%80%E5%8F%B2.jpg",
    name: "人类简史",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E6%81%B6%E6%84%8F.jpg",
    name: "恶意",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E8%A7%A3%E5%BF%A7%E6%9D%82%E8%B4%A7%E5%BA%97.jpg",
    name: "解忧杂货店",
  },
  {
    cover:
      "https://blog-staticfile.diamondyuan.com/2020-04-16-%E4%B8%87%E5%8E%86%E5%8D%81%E4%BA%94%E5%B9%B4.jpg",
    name: "万历十五年",
  },
  {
    cover: 'https://blog-staticfile.diamondyuan.com/2020-04-18-%E5%AE%B6%E5%BA%AD%E3%80%81%E7%A7%81%E6%9C%89%E5%88%B6%E5%92%8C%E5%9B%BD%E5%AE%B6%E7%9A%84%E8%B5%B7%E6%BA%90.jpg',
    name: "家庭、私有制和国家的起源"
  }
];

const Book = () => {
  return books.map((o) => {
    const content = (
      <figure>
        <img
          src="https://via.placeholder.com/250x380.png"
          className="hexo-image-steam-lazy not-gallery-item"
          data-original={`${o.cover}?${imageStyle}`}
        />
        <noscript>
          <img src={`${o.cover}?${imageStyle}`} />
        </noscript>
        <figcaption>
          <center>{o.name}</center>
        </figcaption>
      </figure>
    );
    if (o.link) {
      return <a href={o.link}>{content}</a>;
    }

    return content;
  });
};

export default renderToString(<Book></Book>);
