import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

<HashLink smooth to="/#feature" className="hover:text-blue-600">
  Features
</HashLink>
const Landing = () => {
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-5 bg-white shadow-sm">
        <h1 
          onClick={() =>
              document.getElementById("hero")?.scrollIntoView({
                behavior: "smooth",
              })
            }
        className="text-2xl font-bold text-blue-600 cursor-pointer">
          ExpenseTracker
        </h1>

        <div className="flex items-center gap-10">
          <button
            onClick={() =>
              document.getElementById("feature")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="hover:text-blue-600"
          >
            Features
          </button>

          <div className="flex gap-4">
            <button
              onClick={() =>{
                nav("/login")
              }}
            className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Login
            </button>

            <button
              onClick={() =>{
                nav("/signup")
              }}
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="flex items-center justify-between px-20 py-20 bg-linear-to-r from-blue-50 to-purple-100">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold leading-tight">
            Take Control of
            <span className="text-blue-600"> Your Finances</span>
            <br />
            Without the Stress.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Track expenses, manage budgets, analyze spending habits,
            and save money with beautiful reports and powerful analytics.
          </p>

          <div className="mt-8 flex gap-5">
            <button
              onClick={() =>{
                nav("/login")
              }}
            className="px-7 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="px-7 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-105">
          <h2 className="text-2xl font-bold mb-6">
            Dashboard Preview
          </h2>

          <div className="space-y-4">
            <div className="bg-green-100 rounded-xl p-4">
              💰 Balance Card
            </div>

            <div className="bg-blue-100 rounded-xl p-4">
              📊 Expense Chart
            </div>

            <div className="bg-purple-100 rounded-xl p-4">
              📈 Income Graph
            </div>

            <div className="bg-yellow-100 rounded-xl p-4">
              🧾 Recent Transactions
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="feature" className="py-20 px-20">
        <h1 className="text-4xl font-bold text-center mb-14">
          Features
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "💸 Expense Tracking",
              desc: "Record every expense in seconds.",
            },
            {
              title: "📊 Analytics",
              desc: "Beautiful charts and spending reports.",
            },
            {
              title: "💰 Budget Planning",
              desc: "Stay within your monthly budget.",
            },
            {
              title: "📅 Monthly Reports",
              desc: "Download reports anytime.",
            },
            {
              title: "🔒 Secure Login",
              desc: "JWT Authentication & Data Protection.",
            },
            {
              title: "📱 Responsive Design",
              desc: "Works perfectly on every device.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {item.title}
              </h2>

              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">
          Ready to Take Control of Your Money?
        </h1>

        <p className="mt-5 text-xl text-blue-100">
          Join thousands of users managing their finances smarter.
        </p>

        <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Start Tracking Today
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-20 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              ExpenseTracker
            </h2>

            <p className="text-gray-400">
              Manage your income, expenses, and budgets with ease.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Dashboard
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Help Center</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@expensetracker.com</p>
            <p>Phone: +91 7678679487</p>

            <div className="flex gap-4 mt-4 text-2xl">
              <span>🌐</span>
              <span>🐦</span>
              <span>💼</span>
              <span>📷</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © 2026 ExpenseTracker. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;