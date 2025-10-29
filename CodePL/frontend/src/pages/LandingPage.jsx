import heroImageBackground from '../assets/bacground2.png';
import heroImage from '../assets/secondlayer.png';
import heroImageText from '../assets/layer2.png';
import Spline from '@splinetool/react-spline';
import styled from 'styled-components';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AnimatedButton } from "@/components/ui/animated-button";
import 'atropos/css'
import Atropos from 'atropos/react'
import { Link } from "react-router";
import {
  Code, Brain, Zap, Users, Trophy, MessageSquare,
  ArrowRight, Sparkles, BookOpen, TrendingUp, Rocket,
  Star, Quote, Menu, X, ChevronDown, Github, Twitter,
  Linkedin, Mail, Terminal, Play
} from "lucide-react";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] relative text-white overflow-hidden">
      {/* Cosmic Aurora */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
          `,
        }}
      />
      
      <div className="relative z-10">
        <Navigation 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />

        <HeroSection isVisible={isVisible} />
        <IntroductionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PartnersSection />
        <CallToActionSection />
        <FooterSection />
      </div>
    </div>
  );
};
// Improved Navigation Component with AnimatedButton
const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-12">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-linear-to-r from-[#2b5876] to-[#4e4376] rounded-lg flex items-center justify-center shadow-lg shadow-[#2b5876]/25">
            <Code className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-[#2b5876] to-[#4e4376] bg-clip-text text-transparent">
            CodEVerse
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm hover:bg-white/5 rounded-lg"
          >
            Login
          </Link>
          
          <AnimatedButton
            variant="gradient"
            size="sm"
            glow={true}
            textEffect="shimmer"
            uppercase={true}
            rounded="custom"
            asChild={true}
            hideAnimations={false}
            shimmerColor="#ffffff"
            shimmerSize="0.1em"
            shimmerDuration="2s"
            borderRadius="10px"
            background="linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)"
            className="font-medium text-sm btn-grad"
          >
            <Link to="/signup">
              Sign Up Free
            </Link>
          </AnimatedButton>
        </div>

        <button
          className="md:hidden p-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-3 border-t border-gray-800/50">
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm hover:bg-white/5 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            
            <AnimatedButton
              variant="gradient"
              size="default"
              glow={true}
              textEffect="shimmer"
              uppercase={true}
              rounded="custom"
              asChild={true}
              hideAnimations={false}
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              shimmerDuration="2s"
              borderRadius="10px"
              background="linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)"
              className="font-medium w-full btn-grad"
            >
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                Sign Up Free
              </Link>
            </AnimatedButton>
          </div>
        </div>
      )}
    </div>
  </nav>
);
// Hero Section with Floating Code Elements
const HeroSection = ({ isVisible }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto w-full pt-16 pb-16">
        <div className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>

          <Atropos
            className="w-full atropos-hero"
            activeOffset={50}
            shadowScale={1.1}
            shadowOffset={60}
            rotateXMax={10}
            rotateYMax={10}
            rotateTouch="scroll-y"
            highlight={true}
            duration={400}
          >
            <div className="atropos-scale">
              <div className="atropos-rotate">
                <div className="atropos-inner rounded-3xl overflow-hidden">
                  
                  <img
                    src={heroImageBackground}
                    alt="CodeVerse Background"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    data-atropos-offset="-6"
                  />
                  
                  <img
                    src={heroImage}
                    alt="CodeVerse Platform"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    data-atropos-offset="0"
                  />
                  
                  <img
                    src={heroImageText}
                    alt="CodeVerse Text"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    data-atropos-offset="8"
                  />
                  
                  <div 
                    className="absolute top-6 left-6 bg-black/80 backdrop-blur-lg p-4 rounded-2xl border border-gray-700 shadow-2xl"
                    data-atropos-offset="12"
                  >
                    <div className="flex space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <code className="text-sm text-cyan-300 font-mono">
                      <span className="text-purple-300">const</span> innovation = <span className="text-green-300">"limitless"</span>;
                    </code>
                  </div>
                  
                  <div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
                    data-atropos-offset="15"
                  >
                    <Link
                      to="/signup"
                      className="group inline-flex items-center px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/30"
                    >
                      <Rocket className="w-5 h-5 mr-3" />
                      Start Coding Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </Atropos>

        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce mt-8">
          <ChevronDown className="w-6 h-6 text-purple-400" />
        </div>

      </div>

      <style jsx>{`
        .atropos-hero {
          height: 600px;
          perspective: 1200px;
        }

        .atropos-inner {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 768px) {
          .atropos-hero {
            height: 500px;
          }
        }

        @media (max-width: 480px) {
          .atropos-hero {
            height: 400px;
          }
          
          .atropos-inner {
            border-radius: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

// Introduction Section
const IntroductionSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Code className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-purple-300 text-sm">Welcome to CodeVerse</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-white">
            Master Coding with{' '}
            <span className="text-purple-400">AI-Powered Guidance</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            CodeVerse is a comprehensive coding platform with thousands of problems, 
            an integrated terminal, AI chatbot assistance, and video tutorials to master programming.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <div className="text-white font-semibold">Extensive Problem Library</div>
                <div className="text-gray-400 text-sm">Thousands of coding questions from beginner to advanced levels</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <div className="text-white font-semibold">Built-in Code Editor & Terminal</div>
                <div className="text-gray-400 text-sm">Run and test your code instantly with our integrated development environment</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-cyan-400 mt-1" />
              <div>
                <div className="text-white font-semibold">Instant Code Execution</div>
                <div className="text-gray-400 text-sm">Run code and see results immediately in our online compiler</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Start Free Today
            </Link>
          </div>
        </div>
        
        <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 bg-black/50 backdrop-blur-sm">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Spline
            scene="https://prod.spline.design/BUsaC-tVdUt-lzkf/scene.splinecode"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => (
  <StyledWrapper>
    <section className="features-section">
      <div className="container">
        <div className="header">
          <div className="badge">
            <Code className="badge-icon" />
            <span className="badge-text">Features</span>
          </div>
          <h2 className="title">Everything You Need to Master Coding</h2>
          <p className="subtitle">Complete coding platform with AI-powered tools</p>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="icon-wrapper">
              <Brain className="card-icon" />
            </div>
            <p className="heading">Problem Library</p>
            <p className="description">Thousands of coding questions from beginner to expert level</p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <Terminal className="card-icon" />
            </div>
            <p className="heading">Code Editor & Terminal</p>
            <p className="description">Run code and get solutions instantly in built-in terminal</p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <MessageSquare className="card-icon" />
            </div>
            <p className="heading">AI Chat Assistant</p>
            <p className="description">Get instant help and explanations from AI chatbot</p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <Play className="card-icon" />
            </div>
            <p className="heading">Video Tutorials</p>
            <p className="description">Step-by-step video explanations for all concepts</p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <Zap className="card-icon" />
            </div>
            <p className="heading">Instant Feedback</p>
            <p className="description">Real-time code analysis and error detection</p>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <TrendingUp className="card-icon" />
            </div>
            <p className="heading">Progress Tracking</p>
            <p className="description">Monitor your growth with detailed analytics</p>
          </div>
        </div>
      </div>
    </section>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .features-section {
    padding: 5rem 1rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.2);
    border-radius: 9999px;
    margin-bottom: 1rem;
  }

  .badge-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    color: rgb(192, 132, 252);
  }

  .badge-text {
    font-size: 0.875rem;
    color: rgb(216, 180, 254);
  }

  .title {
    font-size: 2.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.125rem;
    color: rgb(156, 163, 175);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    justify-content: center;
  }

  .card {
    position: relative;
    width: 100%;
    height: 220px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem;
    gap: 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }

  .card-icon {
    width: 24px;
    height: 24px;
    color: #e81cff;
  }

  .heading {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: white;
  }

  .description {
    font-size: 0.9rem;
    color: #ccc;
    line-height: 1.4;
    margin: 0;
  }

  .card:hover::after {
    filter: blur(30px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .card {
      height: 200px;
      padding: 1.25rem;
    }
  }
`;

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      description: "CodeVerse has completely transformed how I learn programming. The AI assistant is incredibly helpful and the problem library is massive!",
      image: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Isabelle Carlos",
      handle: "@isabellecarlos",
    },
    {
      description: "I love how CodeVerse makes coding practice so engaging. The built-in terminal and instant feedback helped me improve rapidly.",
      image: "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Lana Akash",
      handle: "@lanaakash",
    },
    {
      description: "The smooth coding experience and intuitive interface in CodeVerse save me hours of setup time!",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Liam O'Connor",
      handle: "@liamoc",
    },
    {
      description: "Using CodeVerse feels like magic — it's so easy to practice coding and get instant help when I'm stuck.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Isabella Mendes",
      handle: "@isamendes",
    },
    {
      description: "CodeVerse's AI-powered guidance means I can learn at my own pace and get personalized help exactly when I need it.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Meera Patel",
      handle: "@meerapatel",
    },
    {
      description: "I recommend CodeVerse to everyone looking for a comprehensive coding platform with amazing AI support.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      name: "Emily Chen",
      handle: "@emchen",
    },
  ];

  return (
    <section className="py-20 px-4 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={<Quote className="w-4 h-4 mr-2 text-purple-400" />}
          badge="Testimonials"
          title="What Developers Say"
          description="Join thousands of developers who have transformed their coding skills with CodeVerse"
        />
        <AnimatedTestimonials data={testimonials} />
      </div>
    </section>
  );
};

// Partners Section
const PartnersSection = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        icon={<Users className="w-4 h-4 mr-2 text-purple-400" />}
        badge="Our Partners"
        title="Trusted By Industry Leaders"
        description="In the past few years, our users have landed jobs at top companies around the world"
      />

      <div className="relative">
        <div className="carousel carousel-end rounded-box">
          {[
            "https://cdn.dribbble.com/userupload/44994208/file/002c7c2ccc8f0ffd6e292d111ad2c2fd.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/45274393/file/26f864e257e18cba3f8fa28b0628dd87.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/44823506/file/228d4b4c3c86fc69b0bfcfaafef22e15.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/34238687/file/original-dd7bf995f92a4b61db0455554df43806.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/44384026/file/cdb3a9a1dadf1654f93dd0ec272bafb1.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/45158835/file/424013be1d8e3495190c7a1170cdf9f2.jpg?crop=0x0-6667x5000&format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/15420990/file/original-cb960bf8acfb61a237ce66688adb5a49.jpg?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/16797763/file/original-36647fbb373783791f9d3c8cf81951bc.png?crop=0x0-1600x1200&format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/43588907/file/original-8ca2dc55e1770da32e433f0f9abfbe74.png?format=webp&resize=400x300&vertical=center",
            "https://cdn.dribbble.com/userupload/5829460/file/original-1c2ec08c3bf14e2df451695ebec3d2e7.png?format=webp&resize=400x300&vertical=center"
          ].map((src, index) => (
            <div key={index} className="carousel-item">
              <img
                src={src}
                alt="Company"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>

        <button
          className="btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 bg-purple-500 text-white border-none hover:bg-purple-600"
          onClick={() => {
            document.querySelector(".carousel").scrollBy({ left: -300, behavior: "smooth" });
          }}
        >
          ❮
        </button>
        <button
          className="btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 bg-purple-500 text-white border-none hover:bg-purple-600"
          onClick={() => {
            document.querySelector(".carousel").scrollBy({ left: 300, behavior: "smooth" });
          }}
        >
          ❯
        </button>
      </div>
    </div>
  </section>
); 

// Call to Action Section
const CallToActionSection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-black/80 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
          <Rocket className="w-4 h-4 mr-2 text-purple-400" />
          <span className="text-purple-300 font-medium text-sm">Ready to Start?</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
          Join <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CodEVerse</span> Today
        </h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Start your coding journey with AI-powered guidance and join thousands of developers 
          mastering programming with our comprehensive platform.
        </p>
      </div>
      <Link
        to="/signup"
        className="group inline-flex items-center px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/25"
      >
        <Sparkles className="w-5 h-5 mr-3" />
        Start Coding Now
        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  </section>
);

// Footer Section
const FooterSection = () => (
  <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800/30 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CodEVerse
            </span>
          </div>
          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
            Your gateway to mastering coding with AI-powered tools and comprehensive learning resources.
          </p>
          <div className="flex space-x-3">
            <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <div className="space-y-2">
            <FooterLink href="/features" text="Features" />
            <FooterLink href="/pricing" text="Pricing" />
            <FooterLink href="/docs" text="Documentation" />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <div className="space-y-2">
            <FooterLink href="/about" text="About" />
            <FooterLink href="/blog" text="Blog" />
            <FooterLink href="/contact" text="Contact" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/30 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CodEVerse. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Reusable Components
const SectionHeader = ({ icon, badge, title, description }) => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center px-3 py-1 bg-black/80 border border-purple-500/30 rounded-full mb-4">
      {icon}
      <span className="text-purple-300 font-medium text-sm ml-2">{badge}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
      {title}
    </h2>
    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
      {description}
    </p>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, text }) => (
  <Link
    to={href}
    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block py-1"
  >
    {text}
  </Link>
);

export default LandingPage;