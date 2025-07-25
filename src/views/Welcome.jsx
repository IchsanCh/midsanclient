import React from "react";
import {
  ArrowRight,
  CreditCard,
  Shield,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react";

function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <header className="navbar bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 lg:px-8">
        <div className="navbar-start">
          <div className="flex items-center gap-3">
            <img
              src="/image/logoLotus.png"
              alt="Logo HyperPay"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-black">PayGasm</span>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                href="/"
                className="btn btn-ghost hover:bg-primary/10 transition-all duration-300">
                Home
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="btn btn-ghost hover:bg-primary/10 transition-all duration-300">
                Login
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </div>
          <a href="/login" className="btn btn-primary hidden lg:flex">
            Get Started
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-6 lg:py-6">
        <div className="hero min-h-[60vh]">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="relative">
                <img
                  src="/image/payment.svg"
                  alt="Payment processing illustration"
                  className="w-full max-w-lg mx-auto h-auto drop-shadow-2xl animate-pulse"
                />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-bounce delay-1000"></div>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Welcome to <span className="text-primary">PayGasm</span>
              </h1>
              <p className="text-lg lg:text-xl text-base-content/80 mb-8 leading-relaxed">
                Your one-stop solution for seamless payment processing.
                Experience lightning-fast transactions with enterprise-grade
                security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="/login" className="btn btn-primary btn-lg group">
                  Start Processing
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="btn btn-outline btn-lg">Watch Demo</button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="badge badge-lg bg-success/90 text-black border-success">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure
                </div>
                <div className="badge badge-lg bg-warning/90 text-black border-warning">
                  <Zap className="w-4 h-4 mr-1" />
                  Fast
                </div>
                <div className="badge badge-lg bg-info/90 text-black border-info">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Reliable
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose PayGasm?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Built for modern businesses that demand speed, security, and
              scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title justify-center">
                  Bank-Grade Security
                </h3>
                <p className="text-base-content/70">
                  End-to-end encryption and compliance with industry standards
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title justify-center">Lightning Fast</h3>
                <p className="text-base-content/70">
                  Process payments in milliseconds with 99.9% uptime
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title justify-center">Global Coverage</h3>
                <p className="text-base-content/70">
                  Accept payments from anywhere in the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Star className="w-8 h-8" />
              </div>
              <div className="stat-title">Transactions Processed</div>
              <div className="stat-value text-primary">1M+</div>
              <div className="stat-desc">↗︎ 40% increase this month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="stat-title">Success Rate</div>
              <div className="stat-value text-secondary">99.9%</div>
              <div className="stat-desc">↗︎ Industry leading</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <Shield className="w-8 h-8" />
              </div>
              <div className="stat-title">Security Score</div>
              <div className="stat-value text-accent">A+</div>
              <div className="stat-desc">↗︎ Verified by third-party</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <aside>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/image/logoLotus.png"
              alt="Logo HyperPay"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">HyperPay</span>
          </div>
          <p className="text-base-content/70">
            &copy; 2025 PayGasm. All rights reserved.
          </p>
          <p className="text-sm text-base-content/50">
            Empowering businesses with seamless payment solutions
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Welcome;
