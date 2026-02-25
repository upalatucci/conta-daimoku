/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { highlight } from "sugar-high";
import React from "react";

function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" className="text-primary" {...props} />;
}

function RoundedImage(props) {
  return <figure className="my-10"><Image alt={props.alt} className="rounded-lg mx-auto" width={500} height={300} {...props} /> <figcaption className="text-sm max-w-2xl mt-4 mx-auto">{props?.title}</figcaption></figure>;
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug, className: 'text-primary text-xl my-4 font-bold' },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const Blockquote = ({children}) => <blockquote className="p-4 my-4 border-s-4 border-primary">{children}</blockquote>


const List = ({children}) => <ul className="list-inside list-disc my-4">{children}</ul>

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  blockquote: Blockquote,
  ul: List,
};

export async function CustomMDX(props) {
  const { default: MDXContent } = await evaluate(props.source, {
    ...runtime,
  });

  return <MDXContent components={{ ...components, ...(props.components || {}) }} />;
}
