import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-12 sm:py-20">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-12 max-w-md mx-auto shadow-md">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-3">Register</h1>
            <p className="text-sm text-text-secondary">Create an account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
                className="input-field"
                placeholder="johndoe" />
              {errors.username && <p className="text-primary text-xs mt-2">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                className="input-field"
                placeholder="example@example.com" />
              {errors.email && <p className="text-primary text-xs mt-2">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                className="input-field"
                placeholder="******" />
              {errors.password && <p className="text-primary text-xs mt-2">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-text-primary mb-2 uppercase tracking-wide">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                className="input-field"
                placeholder="******" />
              {errors.confirmPassword && <p className="text-primary text-xs mt-2">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 mt-8 shadow-sm hover:shadow-md">
              Register
            </button>
            <p className="text-center text-sm text-text-secondary pt-4">
              Already have an account? <Link to="/login" className="text-primary hover:text-primary-dark font-medium">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;
