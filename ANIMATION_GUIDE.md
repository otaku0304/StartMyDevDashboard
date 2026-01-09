# 🎬 Animation & Effects Quick Reference

## How to Use Animations in Your Components

### 1. **Utility Classes** (Add to any element)

```jsx
// Fade In Up (most common for sections)
<div className="fade-in-up">Content</div>

// Simple Fade In
<div className="fade-in">Content</div>

// Scale In (great for modals/cards)
<div className="scale-in">Content</div>

// Slide In from Left
<div className="slide-in-left">Content</div>

// Slide In from Right
<div className="slide-in-right">Content</div>

// Continuous Float (for images)
<img className="float" src="..." />

// Pulse Glow (for CTAs)
<button className="btn btn-primary pulse-glow">Click Me</button>

// Hover Effects
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
<div className="hover-glow">Glows on hover</div>
```

---

### 2. **Gradient Text**

```jsx
// Primary Gradient (Purple)
<h1 className="text-gradient">Amazing Title</h1>

// Secondary Gradient (Pink)
<h2 className="text-gradient-secondary">Exciting Feature</h2>

// Accent Gradient (Cyan)
<h3 className="text-gradient-accent">Cool Detail</h3>
```

---

### 3. **Glassmorphism Cards**

```jsx
// Basic Glass Card
<div className="glass-card p-4">
  <h3>Title</h3>
  <p>Content with frosted glass effect</p>
</div>

// Glass Card with Hover
<div className="glass-card p-4 hover-lift">
  Lifts on hover
</div>
```

---

### 4. **Scroll-Triggered Animations**

```jsx
import { useEffect, useRef, useState } from "react";

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section
      ref={addToRefs}
      data-section="hero"
      className={isVisible.hero ? "fade-in-up" : "scroll-reveal"}
    >
      Content appears when scrolled into view
    </section>
  );
};
```

---

### 5. **Button Styles**

```jsx
// Primary Gradient Button
<button className="btn btn-primary btn-lg">
  <FaRocket className="me-2" />
  Get Started
</button>

// Secondary Gradient Button
<button className="btn btn-secondary btn-lg">
  <FaCode className="me-2" />
  Learn More
</button>

// Accent Gradient Button
<button className="btn btn-accent btn-lg">
  <FaBolt className="me-2" />
  Try Now
</button>

// With Pulse Glow
<button className="btn btn-primary btn-lg pulse-glow">
  Special CTA
</button>
```

---

### 6. **Custom Animations in Components**

```jsx
// Example: Rotating Logo
<style>{`
  .logo-img {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .logo-container:hover .logo-img {
    transform: rotate(360deg) scale(1.1);
    filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4));
  }
`}</style>
```

---

### 7. **Floating Shapes Background**

```jsx
<div className="hero-image-container">
  <div className="floating-shape shape-1"></div>
  <div className="floating-shape shape-2"></div>
  <div className="floating-shape shape-3"></div>
  <img src={heroImg} className="img-fluid float" />
</div>

<style>{`
  .floating-shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
  }

  .shape-1 {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    top: 10%;
    left: 10%;
    animation: float 6s ease-in-out infinite;
  }
`}</style>
```

---

### 8. **Icon Animations**

```jsx
// Rotating Icon on Theme Toggle
<FaSun className="theme-icon sun-icon" />

<style>{`
  .theme-icon {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .sun-icon {
    animation: rotateIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes rotateIn {
    from {
      transform: rotate(-180deg) scale(0);
      opacity: 0;
    }
    to {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }
`}</style>
```

---

### 9. **Feature Cards with Icons**

```jsx
<div className="feature-card glass-card p-4 h-100">
  <div className="feature-icon-wrapper mb-3">
    <FaLayerGroup className="feature-icon" />
  </div>
  <h4 className="fw-bold mb-3">Feature Title</h4>
  <p className="text-muted">Feature description</p>
</div>

<style>{`
  .feature-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feature-card:hover .feature-icon-wrapper {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
  }
`}</style>
```

---

### 10. **Step Cards with Numbers**

```jsx
<div className="step-card glass-card p-4 text-center h-100">
  <div className="step-number">01</div>
  <h5 className="fw-bold mt-3 mb-2">Step Title</h5>
  <p className="text-muted small">Step description</p>
</div>

<style>{`
  .step-number {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .step-card:hover {
    transform: translateY(-10px) scale(1.05);
  }
`}</style>
```

---

## 🎨 Color Variables Reference

Use these CSS variables anywhere:

```css
/* Brand Colors */
var(--color-primary)        /* #6366f1 - Indigo */
var(--color-secondary)      /* #ec4899 - Pink */
var(--color-accent)         /* #06b6d4 - Cyan */
var(--color-success)        /* #10b981 - Green */
var(--color-warning)        /* #f59e0b - Amber */
var(--color-error)          /* #ef4444 - Red */

/* Gradients */
var(--gradient-primary)     /* Purple gradient */
var(--gradient-secondary)   /* Pink gradient */
var(--gradient-accent)      /* Cyan gradient */
var(--gradient-cosmic)      /* Multi-color gradient */

/* Shadows */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-xl)
var(--shadow-2xl)
var(--shadow-glow)

/* Spacing */
var(--spacing-xs)   /* 0.25rem */
var(--spacing-sm)   /* 0.5rem */
var(--spacing-md)   /* 1rem */
var(--spacing-lg)   /* 1.5rem */
var(--spacing-xl)   /* 2rem */

/* Border Radius */
var(--radius-sm)    /* 0.375rem */
var(--radius-md)    /* 0.5rem */
var(--radius-lg)    /* 0.75rem */
var(--radius-xl)    /* 1rem */
var(--radius-2xl)   /* 1.5rem */

/* Transitions */
var(--transition-fast)    /* 150ms */
var(--transition-base)    /* 300ms */
var(--transition-slow)    /* 500ms */
var(--transition-bounce)  /* 600ms with bounce */
```

---

## 🚀 Performance Tips

1. **Use `transform` and `opacity`** for animations (GPU accelerated)
2. **Avoid animating** `width`, `height`, `top`, `left` (causes reflow)
3. **Use `will-change`** sparingly for complex animations
4. **Debounce scroll events** when using custom scroll listeners
5. **Use Intersection Observer** instead of scroll events when possible

---

## 📱 Responsive Considerations

```css
/* Mobile adjustments */
@media (max-width: 768px) {
  .display-custom {
    font-size: 2rem; /* Smaller on mobile */
  }
  
  .floating-shape {
    display: none; /* Hide decorative elements */
  }
  
  .btn-lg {
    padding: 0.75rem 1.5rem; /* Smaller buttons */
  }
}
```

---

## 🎯 Best Practices

1. **Stagger animations** for multiple elements (use delays)
2. **Keep animations under 500ms** for UI interactions
3. **Use easing functions** for natural motion
4. **Test on low-end devices** to ensure performance
5. **Provide reduced motion** option for accessibility

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎊 Quick Start Checklist

- [ ] Import React Icons for icon components
- [ ] Add animation classes to sections
- [ ] Use gradient text for headlines
- [ ] Apply glassmorphism to cards
- [ ] Add hover effects to interactive elements
- [ ] Implement scroll-triggered animations
- [ ] Use CSS variables for consistency
- [ ] Test dark mode appearance
- [ ] Verify mobile responsiveness
- [ ] Check animation performance

---

**Happy Animating! 🎨✨**
