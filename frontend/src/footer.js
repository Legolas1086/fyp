import React from 'react'
import './css/footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faGoogle
  } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (

        <footer className="bg-dark footer">

            <div className='social-container'>
                <div className='social-container-row'>
                    <a href="https://www.instagram.com/sumukh_6"
                        className="instagram social">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="mailto:giveethcare@gmail.com"
                        className="gmail social">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </a>
                </div>
                <div className='website-rights'>
                    <small>© Copyright 2022 Pustak Bandaar. All rights reserved.</small>
                </div>
            </div>

        </footer>

    )
}