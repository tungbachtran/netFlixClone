import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Layout/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { FaChevronRight, FaPlay } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { Collapse } from 'antd';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate('/login', { state: { email } });
  };

  const faqItems = [
    {
      key: '1',
      label: 'What is Netflix?',
      children: (
        <div className="faq-content">
          <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices.</p>
          <p>You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!</p>
        </div>
      ),
    },
    {
      key: '2',
      label: 'How much does Netflix cost?',
      children: (
        <div className="faq-content">
          <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month. No extra costs, no contracts.</p>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Where can I watch?',
      children: (
        <div className="faq-content">
          <p>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.</p>
          <p>You can also download your favorite shows with the iOS, Android, or Windows 10 app.</p>
        </div>
      ),
    },
    {
      key: '4',
      label: 'How do I cancel?',
      children: (
        <div className="faq-content">
          <p>Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
        </div>
      ),
    },
    {
      key: '5',
      label: 'What can I watch on Netflix?',
      children: (
        <div className="faq-content">
          <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <img src="/images/Hero_Image.png" alt="Hero Background" />
          <div className="hero__gradient" />
        </div>
        
        <div className="hero__content">
          <h1 className="hero__title">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="hero__subtitle">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="hero__description">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form className="hero__form" onSubmit={handleGetStarted}>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="hero__email-input"
            />
            <Button type="submit" size="large" className="hero__cta-btn">
            Click here to enter Home page
              <FaChevronRight />
            </Button>
          </form>
        </div>
      </section>

      {/* Features Sections */}
      <section className="features">
        <div className="feature">
          <div className="feature__content">
            <h2>Enjoy on your TV</h2>
            <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className="feature__media">
            <div className=''>
            <img src="/images/tv.png" alt="TV" />
            <img src="/images/screenshot2.png" alt="TV" className='feature__media--relative'/>
            </div>
            <video autoPlay muted loop>
              <source src="/videos/video-tv.m4v" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="feature feature--reverse">
          <div className="feature__media">
            <img src="/images/mobile.png" alt="Mobile" />
            <div className="download-animation">
              <img src="/images/boxshot.png" alt="Stranger Things" />
              <div className="download-info">
                <div>
                  <h4>Stranger Things</h4>
                  <p>Downloading...</p>
                </div>
                <div className="download-icon">
                  <IoMdDownload />
                </div>
              </div>
            </div>
          </div>
          <div className="feature__content">
            <h2>Download your shows to watch offline</h2>
            <p>Save your favorites easily and always have something to watch.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature__content">
            <h2>Watch everywhere</h2>
            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <div className="feature__media">
            <div>
            <img src="/images/device-pile.png" alt="Devices" className='feature__media--device'/>
            <img src="/images/screenshot.png" alt="TV" className='feature__media--relative2'/>
            </div>
          </div>
        </div>

        <div className="feature feature--reverse">
          <div className="feature__media">
            <img src="/images/kids.png" alt="Kids Profile" />
          </div>
          <div className="feature__content">
            <h2>Create profiles for kids</h2>
            <p>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <div className="faq__list">
            <Collapse 
              items={faqItems}
              className="custom-collapse"
              expandIconPosition="end"
            />
          </div>
          <div className="faq__cta">
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <form className="faq__form" onSubmit={handleGetStarted}>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="large">
              Click here to enter Home page
                <FaChevronRight />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer__contact">Questions? Call 1-844-505-2993</p>
          <div className="footer__links">
            <div className="footer__column">
              <a href="#">FAQ</a>
              <a href="#">Investor Relations</a>
              <a href="#">Privacy</a>
              <a href="#">Speed Test</a>
            </div>
            <div className="footer__column">
              <a href="#">Help Center</a>
              <a href="#">Jobs</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">Legal Notices</a>
            </div>
            <div className="footer__column">
              <a href="#">Account</a>
              <a href="#">Ways to Watch</a>
              <a href="#">Corporate Information</a>
              <a href="#">Only on Netflix</a>
            </div>
            <div className="footer__column">
              <a href="#">Media Center</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <p className="footer__country">Netflix Vietnam</p>
        </div>
      </footer>
    </div>
  );
};
