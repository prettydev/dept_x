import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-c137.css";
import { withNavigationContext } from "react-awesome-slider/dist/navigation";
import Lettering from "../lettering/lettering";
import Content from "../content/content";
import Mouse from "../mouse/mouse";
import Section from "../section/section";
import Page from "../page/page";
import "./fullpage.module.css";

export const media = [
  {
    slug: "HHHHHHHHHHHHHHHi",
    className: "slide page-one",
    children: (
      <Section wrapper={false} backgroundColor="#292c35">
        <Content
          main={
            <Lettering
              title="INDEX"
              text={[
                "This is a single full page fixed screen.",
                "Use the button bellow to navigate to the next page",
              ]}
            />
          }
        />
      </Section>
    ),
  },
  {
    slug: "page-two",
    className: "sectioned page-two",
    children: (
      <Page>
        <Section wrapper={false} backgroundColor="#4158b4">
          <Content
            main={
              <Lettering
                title="PAGE-TWO"
                text={[
                  "This is multiple section page, scroll down to view more content.",
                ]}
              />
            }
          />
        </Section>
      </Page>
    ),
  },
];
