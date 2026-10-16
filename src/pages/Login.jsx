import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login
    alert('Login successful!');
    navigate('/');
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-12 sm:py-20">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-12 max-w-md mx-auto shadow-md">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-3">Login</h1>
            <p className="text-sm text-text-secondary">Login to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="example@example.com"
              />
              {errors.email && <p className="text-primary text-xs mt-2">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="******"
              />
              {errors.password && <p className="text-primary text-xs mt-2">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 mt-8 shadow-sm hover:shadow-md"
            >
              Login
            </button>

            <p className="text-center text-sm text-text-secondary pt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
