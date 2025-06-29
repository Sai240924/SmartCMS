import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title slide-in-up">Smart Complaint Management System</h1>
          <p class="hero-subtitle slide-in-up">Efficiently manage and resolve customer complaints with our intuitive platform</p>
          <div class="hero-buttons slide-in-up">
            <!-- Removed Go to Dashboard and Submit Complaint buttons as requested -->
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose Our Platform?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3 class="feature-title">Centralized Dashboard</h3>
            <p class="feature-description">Monitor all complaints from a single, intuitive dashboard with real-time updates.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3 class="feature-title">Advanced Tracking</h3>
            <p class="feature-description">Track the status of complaints throughout their lifecycle with detailed history.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⏱️</div>
            <h3 class="feature-title">Quick Resolution</h3>
            <p class="feature-description">Prioritize and categorize complaints to ensure timely and efficient resolution.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3 class="feature-title">Mobile Friendly</h3>
            <p class="feature-description">Access the system from anywhere, on any device with our responsive design.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3 class="step-title">Submit a Complaint</h3>
            <p class="step-description">Fill out the complaint form with all relevant details and submit it through our platform.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3 class="step-title">Track Progress</h3>
            <p class="step-description">Follow the status of your complaint in real-time with email notifications on updates.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3 class="step-title">Get Resolution</h3>
            <p class="step-description">Receive timely resolution and provide feedback on the handling of your complaint.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to streamline your complaint management?</h2>
          <p class="cta-description">Join thousands of satisfied customers who have improved their customer service experience.</p>
          <a routerLink="/register" class="btn btn-primary cta-button">Get Started Today</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #3F51B5 0%, #303F9F 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px;
      z-index: 2;
      position: relative;
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
      animation-delay: 0.1s;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 32px;
      opacity: 0.9;
      animation-delay: 0.2s;
    }
    
    .hero-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      animation-delay: 0.3s;
    }
    
    .hero-btn {
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 4px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .btn-primary {
      background-color: #FFC107;
      color: #333;
      border: none;
    }
    
    .btn-primary:hover {
      background-color: #FFA000;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .btn-secondary {
      background-color: transparent;
      color: white;
      border: 2px solid white;
    }
    
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .section-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 48px;
      position: relative;
      padding-bottom: 16px;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: #FFC107;
    }
    
    .features {
      padding: 80px 0;
      background-color: white;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }
    
    .feature-card {
      background-color: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }
    
    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }
    
    .feature-description {
      color: #666;
      line-height: 1.6;
    }
    
    .how-it-works {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .steps {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px;
    }
    
    .step {
      flex: 1;
      min-width: 250px;
      max-width: 350px;
      text-align: center;
      padding: 32px 24px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      position: relative;
    }
    
    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #3F51B5;
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 auto 16px;
    }
    
    .step-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }
    
    .step-description {
      color: #666;
      line-height: 1.6;
    }
    
    .cta {
      padding: 80px 0;
      background: linear-gradient(135deg, #3F51B5 0%, #303F9F 100%);
      color: white;
      text-align: center;
    }
    
    .cta-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px;
    }
    
    .cta-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 16px;
    }
    
    .cta-description {
      font-size: 1.25rem;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    
    .cta-button {
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 500;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        gap: 12px;
      }
      
      .steps {
        flex-direction: column;
        align-items: center;
      }
      
      .step {
        width: 100%;
      }
      
      .cta-title {
        font-size: 1.75rem;
      }
      
      .cta-description {
        font-size: 1.1rem;
      }
    }
  `]
})
export class HomeComponent {
  isLoggedIn = !!localStorage.getItem('token');
  
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}