import React from "react";
import {Link } from 'react-router-dom'
import {Footer,FooterCopyright,FooterDivider,FooterIcon,FooterLink,FooterLinkGroup,FooterTitle,} from "flowbite-react";
import {BsDribbble,BsFacebook,BsGithub,BsInstagram,BsTwitter,} from "react-icons/bs";

function FooterBar() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Link
              className="font-semibold whitespace-nowrap sm:text-xl dark:text-white text-sm self-center"
            >
              <span className="bg-gradient-to-r from-[#283E51]  to-[#4B79A1]  text-white px-3 py-2 rounded-lg font-sans">
                Pavan's
              </span>
              Insights
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mt-5">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">Flowbite</FooterLink>
                <FooterLink href="#">Tailwind CSS</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Pavan's Insights" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="https://github.com/BhandothPavan99" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterBar;
