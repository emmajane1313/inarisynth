<<<<<<< HEAD
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
=======
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
>>>>>>> newer/main

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
<<<<<<< HEAD
            <meta property="og:url" content="https://inarisynth.xyz/" />
            <meta property="og:title" content="Inari Synth" />
            <meta
            property="og:description"
            content="An image synth social network that can't be stopped"
            />
            <meta property="og:image" content="" />
            <meta property="twitter:card" content="summary" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
            />
            <style
            dangerouslySetInnerHTML={{
                __html: `
=======
          <meta property="og:url" content="https://inarisynth.xyz/" />
          <meta property="og:title" content="Inari Synth" />
          <meta
            property="og:description"
            content="An image synth social network that can't be stopped"
          />
          <meta property="og:image" content="" />
          <meta property="twitter:card" content="summary" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
>>>>>>> newer/main
                @font-face {
                    font-family: "Distro Mix";
                    font-weight: 400;
                    src: url("./fonts/DISTROM_.ttf");
                }

                @font-face {
                  font-family: "Space Grotesk";
                  font-weight: 400;
                  src: url("./fonts/SpaceGrotesk-VariableFont_wght.ttf");
              }
<<<<<<< HEAD
            `,
            }}
            ></style>
=======

              @font-face {
                font-family: "Source Code Pro";
                font-weight: 400;
                src: url("./fonts/SourceCodePro-Regular.ttf");
            }
            `,
            }}
          ></style>
>>>>>>> newer/main
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
<<<<<<< HEAD
    )
  }
}

export default Document
=======
    );
  }
}

export default Document;
>>>>>>> newer/main
