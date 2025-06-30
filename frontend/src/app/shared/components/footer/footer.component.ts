import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Smart Complaint Management System</h3>
            <p class="footer-description">
              Streamline your complaint handling process with our intuitive and efficient management system.
            </p>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/complaints">Complaints</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Contact Us</h3>
            <p>
              <strong>Email:</strong> support&#64;smartcms.com<br>
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ currentYear }} Smart Complaint Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #303F9F;
      color: white;
      padding: 40px 0 20px;
      margin-top: 40px;
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 32px;
    }
    
    .footer-section {
      flex: 1;
      min-width: 250px;
      margin-bottom: 24px;
      padding-right: 24px;
    }
    
    .footer-title {
      font-size: 1.2rem;
      margin-bottom: 16px;
      position: relative;
      padding-bottom: 10px;
    }
    
    .footer-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #FFC107;
    }
    
    .footer-description {
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
    }
    
    .footer-links li {
      margin-bottom: 8px;
    }
    
    .footer-links a {
      color: #E0E0E0;
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .footer-links a:hover {
      color: #FFC107;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
      text-align: center;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
      }
      
      .footer-section {
        width: 100%;
        padding-right: 0;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
